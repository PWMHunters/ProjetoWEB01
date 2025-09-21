// components/SearchBar.js
"use client";

import { useState ,useEffect} from "react";
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
        `https://api.jikan.moe/v4/anime?q=${query}&limit=5`,

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
    <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <input
        type="text"
        placeholder="Buscar anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "6px", width: "250px", marginRight: "10px" }}
      />
       {/* Resultados */}
      {results.length > 0 && (
        <div
          style={{
            position: "absolute",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginTop: "5px",
            width: "300px",
            maxHeight: "250px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {results.map((anime) => (
            <div
              key={anime.mal_id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => {
                setQuery(""); // limpa a busca
                setResults([]); // limpa os resultados
                router.push(`/anime/${anime.mal_id}`);
              }}
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                style={{
                  width: "40px",
                  height: "55px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              />
              <span>{anime.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}