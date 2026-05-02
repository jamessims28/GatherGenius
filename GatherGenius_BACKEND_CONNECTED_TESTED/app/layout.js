import "./globals.css";

export const metadata = {
  title: "GatherGenius Backend Connected",
  description: "Backend-connected event marketplace platform"
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
