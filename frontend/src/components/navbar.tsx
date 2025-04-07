import ThemeToggle from "@/components/ThemeToggle";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <span className="text-lg font-semibold">URL Request App</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/settings"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Settings
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
