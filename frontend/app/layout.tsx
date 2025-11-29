import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/lib/auth/AuthSessionProvider";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Gestión - Estanco",
  description: "Sistema de gestión para inventario, ventas y control de mesas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthSessionProvider>
          <Providers>{children}</Providers>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
