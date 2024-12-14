import { ChartAreaIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" border-b bg-background  sticky top-0">
      <div className="mx-auto max-w-screen-xl flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <nav className="gap-2 text-sm md:text-lg font-medium flex flex-row items-center md:gap-5 lg:gap-6">
          <Link href="/" className="flex items-center gap-1 hover:text-gray-600">
            <ChartAreaIcon /> <span className="text-lg md:text-2xl font-extrabold">CRUD</span>
          </Link>
          <Link href="/" className="hover:text-gray-600 text-sm md:text-lg font-semibold">Product List</Link>
          <Link href="/create" className="hover:text-gray-600 text-sm md:text-lg font-semibold">Create Product</Link>
        </nav>
      </div>
    </header>
  );
}
