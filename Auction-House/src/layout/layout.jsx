import { Link } from "react-router-dom";

export function Layout({ children }) {
  return (
    <>
      <header className="flex gap-4 bg-neutral-400 p-4">
        <Link to="/" className="hover:cursor-pointer hover:text-amber-300">
          Home
        </Link>
      </header>
      <main className="grow p-4">{children}</main>
      <footer className="text-center py-4 bg-neutral-300">
        © 2025 FED Oslo
      </footer>
    </>
  );
}
