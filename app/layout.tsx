sed: --: No such file or directory
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "我的衣柜｜记录家的每一件喜欢",
  description: "轻松记录衣柜、厨房和家里的每一件物品。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
