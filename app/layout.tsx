import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Translate-app",
  description: "AI 기반 번역 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Translate-app
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                서비스 소개
              </Link>
              <Link href="/email" className="text-gray-600 hover:text-gray-900">
                이메일 인증
              </Link>
              <Link href="/upload" className="text-gray-600 hover:text-gray-900">
                파일 업로드
              </Link>
            </div>
          </div>
        </nav>
        <main className="pt-16">
          {children}
        </main>
        <footer className="bg-gray-100 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>© 2024 Translate-app. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 