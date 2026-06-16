import useFavoriteStore from "../store/favoritesStore";
import PokemonCard from "../components/PokemonCard";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const FavouritesPage = () => {
  const { favorites } = useFavoriteStore();

  return (
    <Layout>
      {favorites.length === 0 ? (
        <div className="text-center py-10 max-w-md">
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">No favourites yet.</p>
          <p className="text-zinc-500 dark:text-zinc-500 mt-2">
            Tap the heart on a Pokémon card or detail page to save it here.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 text-red-600 hover:text-red-700 dark:hover:text-red-400 underline"
          >
            Browse Pokémon
          </Link>
        </div>
      ) : (
        <>
          <p className="text-zinc-600 dark:text-zinc-400">
            {favorites.length} favourite{favorites.length !== 1 ? "s" : ""}
          </p>
          <div className="flex flex-wrap gap-3 justify-center w-full max-w-6xl">
            {favorites.map((p) => (
              <PokemonCard key={p.id} name={p.name} id={p.id} />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default FavouritesPage;