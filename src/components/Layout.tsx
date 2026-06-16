import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { MdDarkMode, MdLightMode } from "react-icons/md";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation()
  const { isDark, toggle } = useTheme()

  const linkClass = (path: string) =>
    pathname === path
      ? "font-semibold text-red-600 underline"
      : "text-gray-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors">
      <header className="w-full py-4 border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm transition-colors">
        <h1 className="font-bold text-red-600 text-center text-4xl">PokeDex</h1>
        <nav className="flex justify-center gap-6 mt-3 relative">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/favourites" className={linkClass("/favourites")}>Favourites</Link>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={toggle}
            aria-label="Toggle dark mode"
          >
            {isDark
              ? <MdLightMode className="w-6 h-6 text-yellow-400" />
              : <MdDarkMode className="w-6 h-6 text-zinc-600" />
            }
          </button>
        </nav>
      </header>
      <main className="w-full flex flex-col gap-4 items-center p-5">{children}</main>
    </div>
  );
};

export default Layout;