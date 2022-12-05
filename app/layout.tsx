import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head />
      <body className=" bg-primary-50 ">{children}</body>
    </html>
  );
}
