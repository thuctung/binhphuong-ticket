import { ToastContainer } from "react-toastify";
// @ts-ignore: CSS module declarations not found in this environment
import "../globals.css";
import ToastMessage from "@/components/ui/toast-message";
import { LoadingGlobal } from "@/components/ui/loading";
// @ts-ignore: CSS module declarations not found in this environment
import "react-datepicker/dist/react-datepicker.css";
import { Suspense } from "react";
import { Be_Vietnam_Pro, Bricolage_Grotesque } from "next/font/google";
import { dir } from "i18next";
import { languages } from "@/lib/i18n/settings";
import NextTopLoader from "nextjs-toploader";
import SplashRemover from "@/components/ui/SplashRemover";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-display",
  display: "swap",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={dir(lng)} className={`${body.variable} ${display.variable}`}>
      <body className={body.className}>
        <NextTopLoader color="#0ea5e9" showSpinner={false} />
        <SplashRemover />
        <Suspense fallback={<SplashRemover />}>{children}</Suspense>
        <div id="modal-root"></div>
        <ToastMessage />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
