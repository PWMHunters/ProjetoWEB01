"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { addFavorite } from "../../services/favorites"; 

export default function AnimePage() {
  const params = useParams();
  const { id } = params;
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}`
        );

        setAnime(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnime();
  }, [id]);

  const handleAddFavorite = async () => {
    try {
      await addFavorite({
        title: anime.title,
        mal_id: anime.mal_id,
        image_url: anime.images?.jpg?.large_image_url,
        score: anime.score,
        episodes: anime.episodes
      });
      alert("Anime adicionado aos favoritos!");
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar favorito");
    }
  };

  if (!anime) return <p>Carregando...</p>;

  return (
    <div style={{ /* centralizar os animes */
      padding: "20px",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
      }}>
      <h1>{anime.title}</h1>

      {anime.images?.jpg?.large_image_url && (
        <img
          src={anime.images?.jpg?.large_image_url}
          alt={anime.title}
          style={{ width: "200px", borderRadius: "6px", margin: '15px 0' }}
        />
      )}

      <p><b>Rank:</b> {anime.rank || "N/A"}</p>
      <p><b>Média:</b> {anime.score || "N/A"}</p>
      <p>
        <b>Títulos alternativos:</b>{" "}
        {anime.title_english || anime.title_japanese || "N/A"}
      </p>
      <p><b>Episódios:</b> {anime.episodes || "?"}</p>

      {/* Botão de Favoritos */}
      <button
        onClick={handleAddFavorite}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          borderRadius: "6px",
          background: "#0070f3",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Adicionar aos Favoritos
      </button>
    </div>
  );
}
