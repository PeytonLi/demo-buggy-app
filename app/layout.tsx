import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Buggy App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 40, background: "#111", color: "#eee" }}>
        {children}
      </body>
    </html>
  );
}
