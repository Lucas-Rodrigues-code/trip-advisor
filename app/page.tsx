import Header from "@/components/header";
import Search from "@/components/search";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <Search />
      </main>
    </div>
  );
}
