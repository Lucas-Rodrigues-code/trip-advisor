import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <CompassIcon className="w-6 h-6" />
          <span className="text-2xl font-bold">TripAdvisor</span>
        </Link>
        <div className="md:flex items-center gap-4 hidden">
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Viagens
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Reviews
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Alertas
          </Link>
          <Button variant="outline" className="px-4 py-2 text-sm text-black">
            Sign In
          </Button>
        </div>
        <div className="md:hidden gap-4">
          <Menu />
        </div>
      </div>
    </header>
  );
}

function CompassIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function Menu(props: any) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 100 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="10" rx="5" fill="white" />
      <rect y="30" width="100" height="10" rx="5" fill="white" />
      <rect y="60" width="100" height="10" rx="5" fill="white" />
    </svg>
  );
}
