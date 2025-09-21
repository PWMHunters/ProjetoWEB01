import SearchBar from "./components/SearchBar";
import "../styles/styles.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Navbar fixa */}
        <header className="navbar">
          <h1>My Anime Review</h1>
        </header>

        {/* Container principal */}
        <div className="container">
          {/* Barra de pesquisa */}
          <div className="search-bar">
            <SearchBar />
          </div>

          {/* Conteúdo principal da página */}
          {children}
        </div>
      </body>
    </html>
  );
}
