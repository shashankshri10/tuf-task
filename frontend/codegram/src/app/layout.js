import { Inter } from "next/font/google";
import "./globals.css";
import "dotenv/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeGram",
  description: "Code and have fun",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
