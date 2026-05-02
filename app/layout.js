import "./globals.css";

export const metadata = {
  title: "GatherGenius Premium",
  description: "Complete pre-backend premium event marketplace platform"
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
