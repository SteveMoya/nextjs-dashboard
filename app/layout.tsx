import { montserrat } from "./ui/fonts";
import "./ui/global.css"

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

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
        <meta name="description" content="A brief description of the page content." />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta property="og:title" content="Title Here" />
        <meta property="og:description" content="Description Here" />
        <meta property="og:image" content="/opengraph-image.png" />
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
