import SearchBar from "./components/SearchBar";
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "Arial, sans-serif" }}>
        {/* Barra de busca global */}
        <SearchBar />
        {/* Conteúdo da página */}
        <div style={{ padding: "20px" }}>{children}</div>
      </body>
    </html>
  );
}