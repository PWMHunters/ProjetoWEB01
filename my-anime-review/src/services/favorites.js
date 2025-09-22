// Gerenciar favoritos usando localStorage

export function getFavorites() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}

export function addFavorite(anime) {
  if (typeof window !== "undefined") {
    const favorites = getFavorites();
    const exists = favorites.some((fav) => fav.id === anime.id);
    if (!exists) {
      favorites.push(anime);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }
}

export function deleteFavorite(animeId) {
  if (typeof window !== "undefined") {
    let favorites = getFavorites();
    favorites = favorites.filter((fav) => fav.id !== animeId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}
