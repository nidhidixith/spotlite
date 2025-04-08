import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Others/Header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Spotlite Profile",
  description: "Spotlite user profile display",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#f3f4f6" }}>
        <Header />

        <main>{children}</main>
      </body>
    </html>
  );
}
