import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skill Atlas｜我的技能地图",
  description: "集中展示我的个人技能与 Codex 当前可用的专业能力。",
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
