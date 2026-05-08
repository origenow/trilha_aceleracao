import type { Metadata } from "next";
import "./globals.css";
import { DevConsole } from "@/components/ui/DevConsole";

export const metadata: Metadata = {
  title: "TikTok Shop",
  description:
    "Siga as fases, complete tarefas e desbloqueie cupons, tráfego e suporte exclusivo para vendedores de moda no TikTok Shop.",
  icons: {
    icon: [
      { url: "/Shoppingbag_icon-03.svg", type: "image/svg+xml" },
      { url: "/assets/favicon_io/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/assets/favicon_io/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/assets/favicon_io/site.webmanifest" />
      </head>
      <body className="min-h-full antialiased">
        <DevConsole />
        {children}
      </body>
    </html>
  );
}
