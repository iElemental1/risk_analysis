import './global.css';
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-slate-950">{children}</body>
    </html>
  )
}