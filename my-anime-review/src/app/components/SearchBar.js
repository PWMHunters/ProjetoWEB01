"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  const searchAnime = async () => {
    if (!query) return;

    try {
      const res = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${query}&limit=5`
      );

      setResults(res.data.data || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchAnime(query);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Resultados */}
      {results.length > 0 && (
        <div className="results">
          {results.map((anime) => (
            <div
              key={anime.mal_id}
              className="card"
              onClick={() => {
                setQuery("");
                setResults([]);
                router.push(`/anime/${anime.mal_id}`);
              }}
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
              />
              <div className="card-content">
                <h3>{anime.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && query && (
        <p className="empty">Nenhum anime encontrado 😢</p>
      )}
    </div>
  );
}
