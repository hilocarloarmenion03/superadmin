export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
        <header className="flex h-16 items-center border-b px-6">
          <div className="text-sm font-semibold">admin</div>
        </header>

        <section className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-5xl">
            <div className="min-h-[60vh] rounded-xl border border-dashed bg-card" />
          </div>
        </section>
      </div>
    </main>
  );
}
