import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Search() {
  return (
    <section className="bg-primary pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
            Encontre sua próxima aventura
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Pesquise hotéis, restaurantes e coisas para fazer.
          </p>
          <form className="flex items-center gap-2 bg-primary-foreground rounded-md p-2">
            <Input
              type="search"
              placeholder="Onde você está indo?"
              className="flex-1 bg-transparent border-none focus:ring-0"
            />
            <Button className="px-4 py-2 text-sm">Pesquisar</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
