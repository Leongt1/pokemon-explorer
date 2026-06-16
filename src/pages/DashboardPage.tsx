import { CiSearch } from "react-icons/ci";
import { useAllPokemon, usePokemonInfinite } from "../hooks/usePokemon";
import PokemonCard from "../components/PokemonCard";
import { useState } from "react";
import Layout from "../components/Layout";
import useDebounce from "../hooks/useDebouce";

// const PAGE_SIZE = 20;

const Dashboard = () => {
  // const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonInfinite();
  const { data: allPokemons, isLoading: isLoadingAll } = useAllPokemon();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const pokemons = data?.pages.flatMap((page) => page.results)

  const isSearching = debouncedSearch.trim() !== ""

  const filteredPokemon = 
    allPokemons?.results.filter((pokemon) => 
      pokemon.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    ) ?? [];

  const displayedPokemon = 
    isSearching
      ? filteredPokemon
      : pokemons ?? [];

  return (
    <Layout>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-xl flex flex-col items-center gap-1 mb-2"
      >
        <div className="border-2 border-gray-200 dark:border-zinc-700 flex flex-row items-center gap-4 rounded-full w-full px-4 bg-white dark:bg-zinc-800">
          <CiSearch className="w-8 h-10 shrink-0 text-zinc-500 dark:text-zinc-400" />
          <input
            className="flex-1 h-12 rounded-r-full focus:outline-none bg-transparent text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            placeholder="Search by name (e.g. pikachu)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (searchError) setSearchError("");
            }}
          />
        </div>
        {searchError && (
          <p className="text-red-600 text-sm self-start ml-4">{searchError}</p>
        )}
      </form>

      <div className="flex flex-wrap gap-3 justify-center w-full max-w-6xl">
        {isLoading && (
          <p className="font-semibold italic text-zinc-600 dark:text-zinc-400">
            Loading...
          </p>
        )}
        {isError && (
          <p className="font-semibold text-red-600">
            Something went wrong
          </p>
        )}
        {!isLoading && !isSearching && displayedPokemon.map((p) => (
          <PokemonCard key={p.name} name={p.name} url={p.url} />
        ))}

        {!isLoadingAll && isSearching && displayedPokemon.map((p) => (
          <PokemonCard key={p.name} name={p.name} url={p.url} />
        ))}
      </div>

      {!isLoadingAll && isSearching && (
        <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Showing{" "}
          <span className="font-semibold">{displayedPokemon.length}</span>{" "}
          of{" "}
          <span className="font-semibold">{filteredPokemon.length}</span>{" "}
          matching Pokémon
        </div>
      )}

      {!isLoading && !isSearching && pokemons && (
        <div className="flex items-center gap-4 mt-4">
          <button
            type="button"
            disabled={isFetchingNextPage || !hasNextPage}
            onClick={() => fetchNextPage()}
            className="px-4 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
          >
            {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Load More' : 'All Pokémon loaded'}
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;