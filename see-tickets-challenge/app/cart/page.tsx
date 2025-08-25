import Nav from "@/ui/components/nav";

export default function Page() {
  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Nav />
      <h1>Shopping Cart</h1>
    </div>
  );
}