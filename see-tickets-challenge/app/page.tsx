import Nav from "../ui/components/nav";

export default function Home() {
  return (
    <div className="font-sans min-h-screen gap-16">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Nav />
      </main>
    </div>
  );
}
