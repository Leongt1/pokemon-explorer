import { Link, useLocation } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    pathname === path
      ? "font-semibold text-red-600 underline"
      : "text-gray-600 hover:text-red-600";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full py-4 border-b bg-white shadow-sm">
        <h1 className="font-bold text-red-600 text-center text-4xl">PokeDex</h1>
        <nav className="flex justify-center gap-6 mt-3">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/favourites" className={linkClass("/favourites")}>
            Favourites
          </Link>
        </nav>
      </header>
      <main className="w-full flex flex-col gap-4 items-center p-5">{children}</main>
    </div>
  );
};

export default Layout;
