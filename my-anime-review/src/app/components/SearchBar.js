// components/SearchBar.js
"use client";

import { useState } from "react";
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
        `https://api.myanimelist.net/v2/anime?q=${query}&limit=5`,
        {
          headers: {
            "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID,
          },
        }
      );
      
      setResults(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <input
        type="text"
        placeholder="Buscar anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "6px", width: "250px", marginRight: "10px" }}
      />
      <button
        onClick={searchAnime}
        style={{
          padding: "6px 10px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Buscar
      </button>

      <div>
        {results.map((anime) => (
          <div
            key={anime.node.id}
            style={{
              cursor: "pointer",
              marginTop: "5px",
              padding: "5px",
              border: "1px solid #eee",
              borderRadius: "4px",
            }}
            onClick={() => router.push(`/anime/${anime.node.id}`)}
          >
            {anime.node.title}
          </div>
        ))}
      </div>
    </div>
  );
}
