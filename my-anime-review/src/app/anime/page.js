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
          `https://api.myanimelist.net/v2/anime/${id}?fields=rank,mean,alternative_titles`,
          {
            headers: {
              "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID,
            },
          }
        );
        setAnime(res.data);
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
      {anime.main_picture && (
        <img
          src={anime.main_picture.medium}
          alt={anime.title}
          style={{ width: "200px", borderRadius: "6px" }}
        />
      )}
      <p>Rank: {anime.rank || "N/A"}</p>
      <p>Média: {anime.mean || "N/A"}</p>
      {anime.alternative_titles && (
        <p>
          Títulos alternativos:{" "}
          {anime.alternative_titles.en || anime.alternative_titles.jp}
        </p>
      )}
    </div>
  );
}
