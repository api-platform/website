import "styles/common.css";
import { Poppins } from "next/font/google";
import Layout from "components/layout/Layout";

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} w-full light`}>
      <body className="bg-white dark:bg-blue-black">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

export default RootLayout;
