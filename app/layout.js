// Borra esta primera línea si no tienes un archivo globals.css
import './globals.css';
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-slate-950">{children}</body>
    </html>
  )
}