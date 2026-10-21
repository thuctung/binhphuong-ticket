import { ToastContainer } from "react-toastify";
// @ts-ignore: CSS module declarations not found in this environment
import "./globals.css";
import ToastMessage from "@/components/ui/toast-message";
import { LoadingGlobal } from "@/components/ui/loading";
// @ts-ignore: CSS module declarations not found in this environment
import "react-datepicker/dist/react-datepicker.css";
import { Suspense } from "react";
import { Be_Vietnam_Pro, Bricolage_Grotesque } from "next/font/google";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${body.variable} ${display.variable}`}>
      <body className={body.className}>
        <Suspense fallback={<LoadingGlobal />}>{children}</Suspense>
        <div id="modal-root"></div>
        <ToastMessage />
        <LoadingGlobal />
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
