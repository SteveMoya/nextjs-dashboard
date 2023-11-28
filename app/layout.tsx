import { montserrat } from "./ui/fonts";
import "./ui/global.css"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>Next.js Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        {children}
        <footer className="py-10 flex justify-center items">
          Hecho por Steve Moya Cepeda 
        </footer>
      </body>
    </html>
  );
}
