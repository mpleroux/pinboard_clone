const ShelfIO = {
  // ── Export ─────────────────────────────────────────────────────────────────

  exportJSON(bookmarks) {
    const payload = {
      _format: "shelf-bookmarks-v1",
      exported: new Date().toISOString(),
      bookmarks,
    };
    this._download(
      "shelf-bookmarks.json",
      "application/json",
      JSON.stringify(payload, null, 2),
    );
    return `Exported ${bookmarks.length} bookmarks as JSON`;
  },

  exportNetscape(bookmarks) {
    const esc = (s) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    const lines = [
      "<!DOCTYPE NETSCAPE-Bookmark-file-1>",
      "<!-- This is an automatically generated file. -->",
      '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
      "<TITLE>Bookmarks</TITLE>",
      "<H1>Bookmarks</H1>",
      "<DL><p>",
    ];
    const sorted = [...bookmarks].sort(
      (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    );
    for (const bm of sorted) {
      const ts = Math.floor(new Date(bm.updatedAt).getTime() / 1000);
      const tags = bm.tags.join(",");
      lines.push(
        `    <DT><A HREF="${esc(bm.url)}" ADD_DATE="${ts}" LAST_MODIFIED="${ts}" TAGS="${esc(tags)}">${esc(bm.title || bm.url)}</A>`,
      );
    }
    lines.push("</DL><p>");
    this._download("shelf-bookmarks.html", "text/html", lines.join("\n"));
    return `Exported ${bookmarks.length} bookmarks as Netscape HTML`;
  },

  _download(filename, mime, content) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([content], { type: mime }));
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  },

  // ── Import ─────────────────────────────────────────────────────────────────

  parseJSON(text, uid) {
    const data = JSON.parse(text);
    const arr = Array.isArray(data) ? data : data.bookmarks || [];
    return arr
      .map((b) => ({
        id: b.id || uid(),
        title: b.title || "",
        url: b.url || "",
        tags: Array.isArray(b.tags) ? b.tags : [],
        updatedAt: b.updatedAt || new Date().toISOString(),
      }))
      .filter((b) => b.url);
  },

  parseNetscape(text, uid) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const anchors = [...doc.querySelectorAll("a")];
    return anchors
      .map((a) => {
        const href = a.getAttribute("href") || "";
        if (!href || href.startsWith("javascript:")) return null;
        const tagsAttr =
          a.getAttribute("tags") || a.getAttribute("shortcuturl") || "";
        const tags = tagsAttr
          ? tagsAttr
              .split(",")
              .map((t) => t.trim().toLowerCase())
              .filter(Boolean)
          : [];
        const ts = parseInt(
          a.getAttribute("last_modified") || a.getAttribute("add_date") || "0",
          10,
        );
        const updatedAt = ts
          ? new Date(ts * 1000).toISOString()
          : new Date().toISOString();
        return { id: uid(), title: a.textContent.trim() || href, url: href, tags, updatedAt };
      })
      .filter(Boolean);
  },
};
