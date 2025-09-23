"use client";

import { useState } from "react";
import Parse from "../lib/parseConfig";
import { saveReview } from "../utils/parseHelpers";

export default function ReviewForm({ anime }) {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !score) { alert("Preencha nome e nota"); return; }
    setLoading(true);
    try {
      const Review = Parse.Object.extend("Review");
      const review = new Review();

      review.set("anime_id", anime.mal_id);
      review.set("anime_title", anime.title);
      review.set("username", username);
      review.set("score", Number(score));
      review.set("comment", comment);

      await review.save();
      alert("Avaliação salva com sucesso!");
      setUsername(""); setScore(""); setComment("");
      // opcional: emitir evento ou chamar callback para atualizar lista
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar avaliação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} 
    style={{ 
      marginTop: 20, 
      border: "1px solid #eee", 
      padding: 12, 
      borderRadius: 6 
      }}>
      <h3>Avaliar: {anime.title}</h3>
      <input placeholder="Seu nome" value={username} onChange={(e)=>setUsername(e.target.value)} 
      style={{ 
        display: "block", 
        width: "100%", 
        padding: 8, 
        marginBottom: 8 
        }} 
        />
      <label>
        Nota:
        <select
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
          style={{ 
            display: "block", 
            width: "100%", 
            padding: 8, 
            marginBottom: 8 
          }}
        >
          <option value="">Selecione</option>
          {[...Array(11).keys()].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <textarea placeholder="Comentário" value={comment} onChange={(e)=>setComment(e.target.value)} rows="3" 
      style={{ 
      display: "block", 
      width: "100%", 
      padding: 8, 
      marginBottom: 8 
      }} />
      <button type="submit" disabled={loading} 
      style={{ 
        padding: "8px 12px", 
        background: "#16a34a", 
        color: "white", 
        border: "none", 
        borderRadius: 6 
        }}>
        {loading ? "Salvando..." : "Salvar Avaliação"}
      </button>
    </form>
  );
}
