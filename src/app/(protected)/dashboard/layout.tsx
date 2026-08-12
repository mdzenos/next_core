export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <header>Dashboard Header</header>
      <main>{children}</main>
    </div>
  );
}
