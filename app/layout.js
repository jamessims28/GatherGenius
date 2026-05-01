import "./globals.css";

export const metadata = {
  title: "GatherGenius",
  description: "Layer 2 AI event builder by LMH Enterprise LLC"
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
