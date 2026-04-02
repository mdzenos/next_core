type PublicTemplateProps = {
  children: React.ReactNode;
};

export default function PublicTemplate({ children }: PublicTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-10">
        {children}
      </main>
    </div>
  );
}
