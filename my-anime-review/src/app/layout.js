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
          boxShadow: "0px 3px 8px #000000ff", 
          textAlign: "center",
          backgroundColor: "#858080ff",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          }}>
          <img
          src="/images/logo.png.png"
          alt="Avaliador de Animes Logo"
          style={{ 
            margin: 0, 
            position: "absolute", 
            left: "50%",
            top: "50%", 
            transform: "translate(-50%, -50%)",
            height: '70px',
            }}
            />
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
