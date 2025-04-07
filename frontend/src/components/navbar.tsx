import ThemeToggle from "@/components/ThemeToggle";
import { Globe } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <span className="text-lg font-semibold">URL Request App</span>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Settings
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
