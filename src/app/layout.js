
'use client';
import "./globals.css";
import { Inter } from "next/font/google";
import TopMenu from "@/components/topMenu";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>lumon app</title>
      </head>      
      <body className={inter.className}>
        <Provider store={store}>
        <TopMenu />
        <div className="pt-[80px] bg-[#0f2e5a]">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
