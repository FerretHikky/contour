import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contour Design System",
  description:
    "Канонический каталог компонентов, токенов и паттернов Contour.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
