import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#18181B] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About TripAdvisor</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">Sobre nós</Link>
              </li>
              <li>
                <Link href="/">Imprensa</Link>
              </li>
              <li>
                <Link href="/">Políticas</Link>
              </li>
              <li>
                <Link href="/">Carreiras</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Explorar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">Escreva uma avaliação</Link>
              </li>
              <li>
                <Link href="/">Adicionar um lugar</Link>
              </li>
              <li>
                <Link href="/">Fórum de viagens</Link>
              </li>
              <li>
                <Link href="/">Artigos de viagem</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Faça negócios conosco</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">Equipe</Link>
              </li>
              <li>
                <Link href="/">Empresa</Link>
              </li>
              <li>
                <Link href="/">
                  Colocações patrocinadas
                </Link>
              </li>
              <li>
                <Link href="/advertise">Anuncie conosco</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-gray-400">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-gray-400"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com" className="hover:text-gray-400">
                <Youtube size={24} />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="https://linkedin.com" className="hover:text-gray-400">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} TripAdvisor LLC All rights
            reserved.
          </p>
          <p className="mt-2">
            <Link href="/" className="hover:underline">
              Termos de Uso
            </Link>{" "}
            |
            <Link href="/" className="hover:underline ml-2">
              Declaração de Privacidade e Cookies
            </Link>{" "}
            |
            <Link href="/" className="hover:underline ml-2">
              Consentimento de cookies
            </Link>{" "}
            |
            <Link href="/" className="hover:underline ml-2">
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
