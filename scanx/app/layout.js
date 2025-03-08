import "./globals.css";
import { Montserrat } from "next/font/google";
import Provider from "./provider";
import { Toaster } from "../components/components/ui/sonner";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weights: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "ScanX",
  description: "Generative Note Taker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserratFont.className}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
