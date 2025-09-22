import SearchBar from "./components/SearchBar";
import "../styles/styles.css"; // seu CSS

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Cabeçalho */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ddd" }}>
          <h1 style={{ margin: 0 }}>Avaliador de Animes</h1>
          <div>
            <a href="/favorites">
              <button
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: "#0070f3",
                  color: "white",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Meus Favoritos
              </button>
            </a>
          </div>
        </header>

        {/* Barra de busca */}
        <SearchBar />

        {/* Conteúdo das páginas */}
        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
