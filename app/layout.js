import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata = {
  title: "GatherGenius Premium",
  description: "Pixel-perfect premium event marketplace and AI planning platform"
};

export default function RootLayout({ children }) {
  return <html lang="en" className={`${inter.variable} ${playfair.variable}`}><body>{children}</body></html>;
}
