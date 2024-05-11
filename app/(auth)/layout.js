import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "@components/ToasterContext";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatKaro!",
  description: "Build in Nextjs 14.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Background color of the body */}
      <body className={`${inter.className} bg-purple-1`}>
        <Provider>
          <ToasterContext />
          {children}
        </Provider>
      </body>
    </html>
  );
}
