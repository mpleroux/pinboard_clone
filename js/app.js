function bookmarkApp() {
  return {
    bookmarks: [],
    search: "",
    activeTag: "",
    isDark: false,
    showFormModal: false,
    showDeleteModal: false,
    showImportModal: false,
    editingId: null,
    deletingBm: null,
    form: { title: "", url: "", tagsRaw: "" },
    importFile: null,
    importMode: "merge",
    importDragOver: false,
    toast: null,
    _toastTimer: null,

    init() {
      // ── Theme ──
      this.isDark = document.documentElement.classList.contains("dark");
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("shelf_theme")) {
            this.applyTheme(e.matches);
          }
        });

      // ── Bookmarks ──
      const saved = ShelfStorage.load();
      if (saved) {
        this.bookmarks = saved;
      } else {
        this.bookmarks = [
          {
            id: this.uid(),
            title: "Pinboard — Social Bookmarking",
            url: "https://pinboard.in",
            tags: ["tools", "bookmarks"],
            updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
          {
            id: this.uid(),
            title: "Hacker News",
            url: "https://news.ycombinator.com",
            tags: ["news", "tech"],
            updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          },
          {
            id: this.uid(),
            title: "Tailwind CSS Documentation",
            url: "https://tailwindcss.com/docs",
            tags: ["css", "tools", "reference"],
            updatedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
          },
        ];
        this.persist();
      }
    },

    // ── Theme ──────────────────────────────────────────────────────────────

    toggleTheme() {
      this.applyTheme(!this.isDark);
      localStorage.setItem("shelf_theme", this.isDark ? "dark" : "light");
    },

    applyTheme(dark) {
      this.isDark = dark;
      document.documentElement.classList.toggle("dark", dark);
    },

    // ── Computed ───────────────────────────────────────────────────────────

    get filteredBookmarks() {
      let bms = [...this.bookmarks].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
      );
      if (this.activeTag)
        bms = bms.filter((b) => b.tags.includes(this.activeTag));
      if (this.search.trim()) {
        const q = this.search.toLowerCase();
        bms = bms.filter(
          (b) =>
            b.title.toLowerCase().includes(q) ||
            b.url.toLowerCase().includes(q) ||
            b.tags.some((t) => t.toLowerCase().includes(q)),
        );
      }
      return bms;
    },

    get allTags() {
      const counts = {};
      this.bookmarks.forEach((b) =>
        b.tags.forEach((t) => {
          counts[t] = (counts[t] || 0) + 1;
        }),
      );
      return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name));
    },

    // ── Add / Edit ─────────────────────────────────────────────────────────

    openAdd() {
      this.editingId = null;
      this.form = { title: "", url: "", tagsRaw: "" };
      this.showFormModal = true;
    },

    openEdit(bm) {
      this.editingId = bm.id;
      this.form = { title: bm.title, url: bm.url, tagsRaw: bm.tags.join(", ") };
      this.showFormModal = true;
    },

    saveForm() {
      if (!this.form.url.trim()) return;
      const tags = this.form.tagsRaw
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      const now = new Date().toISOString();
      if (this.editingId) {
        const idx = this.bookmarks.findIndex((b) => b.id === this.editingId);
        if (idx >= 0)
          this.bookmarks[idx] = {
            ...this.bookmarks[idx],
            title: this.form.title.trim(),
            url: this.form.url.trim(),
            tags,
            updatedAt: now,
          };
      } else {
        this.bookmarks.unshift({
          id: this.uid(),
          title: this.form.title.trim(),
          url: this.form.url.trim(),
          tags,
          updatedAt: now,
        });
      }
      this.persist();
      this.showFormModal = false;
    },

    // ── Delete ─────────────────────────────────────────────────────────────

    openDelete(bm) {
      this.deletingBm = bm;
      this.showDeleteModal = true;
    },

    confirmDelete() {
      this.bookmarks = this.bookmarks.filter(
        (b) => b.id !== this.deletingBm.id,
      );
      this.persist();
      this.showDeleteModal = false;
      this.deletingBm = null;
    },

    // ── Export ─────────────────────────────────────────────────────────────

    exportJSON() {
      this.showToast(ShelfIO.exportJSON(this.bookmarks));
    },

    exportNetscape() {
      this.showToast(ShelfIO.exportNetscape(this.bookmarks));
    },

    // ── Import ─────────────────────────────────────────────────────────────

    openImport() {
      this.importFile = null;
      this.importMode = "merge";
      this.importDragOver = false;
      this.showImportModal = true;
    },

    handleFileSelect(e) {
      this.importFile = e.target.files[0] || null;
    },

    handleFileDrop(e) {
      this.importDragOver = false;
      this.importFile = e.dataTransfer.files[0] || null;
    },

    async runImport() {
      if (!this.importFile) return;
      try {
        const text = await this.importFile.text();
        const name = this.importFile.name.toLowerCase();
        let incoming = [];
        const uid = () => this.uid();

        if (name.endsWith(".json")) {
          incoming = ShelfIO.parseJSON(text, uid);
        } else if (name.endsWith(".html") || name.endsWith(".htm")) {
          incoming = ShelfIO.parseNetscape(text, uid);
        } else {
          this.showToast("Unrecognised file type. Use .json or .html", "error");
          return;
        }

        if (!incoming.length) {
          this.showToast("No bookmarks found in that file", "error");
          return;
        }

        if (this.importMode === "replace") {
          this.bookmarks = incoming;
        } else {
          const existingUrls = new Set(this.bookmarks.map((b) => b.url));
          const fresh = incoming.filter((b) => !existingUrls.has(b.url));
          this.bookmarks = [...this.bookmarks, ...fresh];
          const skipped = incoming.length - fresh.length;
          const msg = skipped
            ? `Imported ${fresh.length} bookmarks (${skipped} duplicate${skipped > 1 ? "s" : ""} skipped)`
            : `Imported ${fresh.length} bookmarks`;
          this.persist();
          this.showImportModal = false;
          this.importFile = null;
          this.showToast(msg);
          return;
        }

        this.persist();
        this.showImportModal = false;
        this.importFile = null;
        this.showToast(`Imported ${incoming.length} bookmarks`);
      } catch (err) {
        this.showToast("Failed to parse file: " + err.message, "error");
      }
    },

    // ── Utilities ──────────────────────────────────────────────────────────

    persist() {
      ShelfStorage.save(this.bookmarks);
    },

    uid() {
      return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    },

    formatDate(iso) {
      return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    showToast(msg, type = "ok") {
      clearTimeout(this._toastTimer);
      this.toast = null;
      this.$nextTick(() => {
        this.toast = { msg, type };
        this._toastTimer = setTimeout(() => {
          this.toast = null;
        }, 2900);
      });
    },
  };
}
