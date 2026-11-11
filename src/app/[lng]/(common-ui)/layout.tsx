import { ConfirmProvider } from "@/components/site/Confirm";
import FloatingContact from "@/components/site/FloatingContact";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      {children}
      <Footer lng={lng} />
      <ConfirmProvider />
      <FloatingContact />
    </main>
  );
}
