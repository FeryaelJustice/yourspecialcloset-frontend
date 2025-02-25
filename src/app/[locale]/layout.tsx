import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NavbarWrapper from "@/components/NavbarWrapper";

export const generateMetadata = ({ params }: { params: { locale: string } }): Metadata => {
  const title = params.locale === "es" ? "Tu Closet Especial" : "Your Special Closet";
  const description = params.locale === "es" ? "Tu ropa, tu esencia" : "Your clothes, your essence";

  return {
    title,
    description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavbarWrapper locale={locale}>
            {children}
          </NavbarWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
