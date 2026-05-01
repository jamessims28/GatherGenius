import "./globals.css";

export const metadata = {
  title: "GatherGenius",
  description: "Layer 4 Stripe and Supabase by LMH Enterprise LLC"
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
