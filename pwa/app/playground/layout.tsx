import "styles/common.css";
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
    <html lang="en" className="h-screen w-full light">
      <body className="bg-white dark:bg-blue-black">{children}</body>
    </html>
  );
}
