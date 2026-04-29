import "./globals.css";

export const metadata = {
  title: "GatherGenius by LMH Enterprise LLC",
  description: "Calm premium event operating system with AI, RSVP, ticketing, vendors, analytics, and payments."
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
