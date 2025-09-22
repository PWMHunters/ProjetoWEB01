"use client";

import { useState, useEffect } from "react";
import { getFavorites, deleteFavorite } from "../services/favorites";


export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getFavorites();
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    await deleteFavorite(id);
    setFavorites(favorites.filter(fav => fav.objectId !== id));
  };

  return (
    <div className="results">
      {favorites.length === 0 && <p className="empty">Nenhum favorito ainda</p>}
      {favorites.map(fav => (
        <div key={fav.objectId} className="card">
          <img src={fav.image_url} alt={fav.title} />
          <div className="card-content">
            <h3>{fav.title}</h3>
            <p><b>Score:</b> {fav.score}</p>
            <p><b>Episódios:</b> {fav.episodes}</p>
            <button
              onClick={() => handleDelete(fav.objectId)}
              style={{
                marginTop: "10px",
                padding: "6px 10px",
                borderRadius: "6px",
                background: "#f00",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}