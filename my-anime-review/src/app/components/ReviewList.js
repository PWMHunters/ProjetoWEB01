// components/ReviewList.js
"use client";

import { useEffect, useState } from "react";
import Parse from "../lib/parseConfig";

export default function ReviewList({ animeId }) {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editScore, setEditScore] = useState("");
  const [editComment, setEditComment] = useState("");

  const fetchReviews = async () => {
    const Review = Parse.Object.extend("Review");
    const query = new Parse.Query(Review);
    query.equalTo("anime_id", animeId);
    query.descending("createdAt"); // mais recentes primeiro
    try {
      const results = await query.find();
      setReviews(results);
    } catch (err) {
      console.error("Erro ao buscar reviews:", err);
      setReviews([]);
    }
  };

  useEffect(() => { if (animeId) fetchReviews(); }, [animeId]);

  const handleDelete = async (id) => {
    if (!confirm("Deseja mesmo excluir esta avaliação?")) return;
    try {
      const Review = Parse.Object.extend("Review");
      const q = new Parse.Query(Review);
      const obj = await q.get(id);
      await obj.destroy();
      fetchReviews();
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir");
    }
  };

  const startEdit = (r) => {
    setEditingId(r.id);
    setEditUsername(r.get("username"));
    setEditScore(r.get("score"));
    setEditComment(r.get("comment"));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const Review = Parse.Object.extend("Review");
      const q = new Parse.Query(Review);
      const obj = await q.get(editingId);
      obj.set("username", editUsername);
      obj.set("score", Number(editScore));
      obj.set("comment", editComment);
      await obj.save();
      setEditingId(null);
      fetchReviews();
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      alert("Erro ao atualizar");
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Avaliações</h3>
      {reviews.length === 0 && <p>Sem avaliações ainda.</p>}
      {reviews.map((r) => (
        <div key={r.id} style={{ border: "1px solid #ddd", padding: 10, marginTop: 8, borderRadius: 6 }}>
          {editingId === r.id ? (
            <form onSubmit={handleUpdate}>
              <input value={editUsername} onChange={e=>setEditUsername(e.target.value)} style={{ display:"block", width:"100%", padding:8, marginBottom:8 }} />
              <label>
    Nota:
    <select
      value={editScore}
      onChange={(e) => setEditScore(Number(e.target.value))}
      style={{ display: "block", width: "100%", padding: 8, marginBottom: 8 }}
      required
    >
      <option value="">Selecione</option>
      {[...Array(11).keys()].map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  </label>
              <textarea value={editComment} onChange={e=>setEditComment(e.target.value)} rows="3" style={{ display:"block", width:"100%", padding:8, marginBottom:8 }} />
              <button type="submit" style={{ marginRight:8 }}>Salvar</button>
              <button type="button" onClick={()=>setEditingId(null)}>Cancelar</button>
            </form>
          ) : (
            <>
              <p><b>{r.get("username")}</b> — Nota: {r.get("score")}</p>
              <p>{r.get("comment")}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => startEdit(r)}>Editar</button>
                <button onClick={() => handleDelete(r.id)}>Excluir</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
