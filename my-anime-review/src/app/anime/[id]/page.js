"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function AnimePage() {
  const params = useParams();
  const { id } = params;
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}`,
        )

        setAnime(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnime();
  }, [id]);

  if (!anime) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{anime.title}</h1>
      {anime.images?.jpg?.large_image_url && (
        <img
          src={anime.images?.jpg?.large_image_url}
          alt={anime.title}
          style={{ width: "200px", borderRadius: "6px" }}
        />
      )}
      <p><b>Rank:</b> {anime.rank || "N/A"}</p>
      <p><b>Média:</b> {anime.score || "N/A"}</p>
      <p><b>Títulos alternativos:</b>{" "}
        {anime.title_english || anime.title_japanese || "N/A"}</p>
       <p><b>Episódios:</b> {anime.episodes || "?"}</p>
    </div>
  );
}
