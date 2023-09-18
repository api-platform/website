import "styles/common.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  title: "API Platform - Playground",
  description: "Try API Platform live in your browser!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-screen w-full light`}>
      <body className="bg-white dark:bg-blue-black">{children}</body>
    </html>
  );
}
