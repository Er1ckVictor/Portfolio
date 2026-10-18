import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.description,
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.description,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* esconde o conteúdo do main antes do primeiro quadro para a entrada não "piscar" */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('anim')}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
