const ShelfStorage = {
  load() {
    const raw = localStorage.getItem("shelf_bookmarks");
    return raw ? JSON.parse(raw) : null;
  },

  save(bookmarks) {
    localStorage.setItem("shelf_bookmarks", JSON.stringify(bookmarks));
  },
};
