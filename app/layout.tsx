import { montserrat } from "./ui/fonts";
import "./ui/global.css"
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

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
    <html lang="es" suppressHydrationWarning>
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
      <body className={`${montserrat.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          
        </ThemeProvider>
      </body>
    </html>
  );
}
