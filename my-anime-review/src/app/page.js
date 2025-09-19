"use client";
import { useState, useEffect } from "react"; // <-- useState e useEffect
import { useRouter } from "next/navigation";  // <-- useRouter


export default function Home() {
  
  return (
    <div>
      <h2>Bem-vindo ao Avaliador de Animes!</h2>
      <p>Use a barra de busca acima para encontrar um anime.</p>
    </div>
  );
}

