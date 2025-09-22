import SearchBar from "./components/SearchBar";
import "../styles/styles.css"; // nosso CSS

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Cabeçalho */}
        <header style={{ 
          position: "relative", 
          padding: "30px 10px", 
          boxShadow: "0px 4px 6px #000000ff", 
          textAlign: "center",
          backgroundColor: "#554e4eff",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          }}>
          <h1 style={{ 
            margin: 0, 
            position: "absolute", 
            left: "50%",
            top: "50%", 
            transform: "translate(-50%, -50%)",
            color: "#ffffffff", 
            }}>
            Avaliador de Animes
            </h1>
          <div style={{ textAlign: "right" }}>
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
