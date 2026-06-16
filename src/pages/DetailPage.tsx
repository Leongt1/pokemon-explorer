import { Link, useParams } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import StatBar from "../components/StatBar";
import { FaHeart } from "react-icons/fa";
import useFavoriteStore from "../store/favoritesStore";
import Layout from "../components/Layout";
import TypeBadge from "../components/TypeBadge";

const DetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: pokemon, isLoading, isError } = usePokemon(name!);
  const { isFavourite, add, remove } = useFavoriteStore();

  if (isLoading) {
    return (
      <Layout>
        <p className="italic font-semibold text-zinc-600 dark:text-zinc-400">Loading...</p>
      </Layout>
    );
  }

  if (isError || !pokemon) {
    return (
      <Layout>
        <p className="text-red-600 font-semibold">Something went wrong!</p>
        <Link to="/" className="text-red-600 underline mt-2">
          Back to home
        </Link>
      </Layout>
    );
  }

  const favourited = isFavourite(pokemon.id);

  const handleToggleFav = () => {
    if (favourited) {
      remove(pokemon.id);
    } else {
      add(pokemon);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="border border-zinc-300 dark:border-zinc-600 rounded-md px-4 py-1 bg-black dark:bg-zinc-700 text-white hover:bg-zinc-800 dark:hover:bg-zinc-600"
          >
            Back
          </Link>
        </div>

        <div className="flex gap-5 items-center justify-center mb-6">
          <h1 className="font-semibold capitalize text-center text-xl md:text-4xl text-zinc-800 dark:text-zinc-100">
            {pokemon.name}
          </h1>
          <FaHeart
            className={`w-10 h-10 cursor-pointer ${
              favourited ? "text-red-500" : "text-zinc-300 dark:text-zinc-600 hover:text-red-400"
            }`}
            onClick={handleToggleFav}
          />
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-6 px-4 py-5">
          <div className="flex flex-col items-start gap-2">
            <p className="text-xl text-zinc-700 dark:text-zinc-300">
              Height:{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {(pokemon.height / 10).toFixed(1)} m
              </span>
            </p>
            <p className="text-xl text-zinc-700 dark:text-zinc-300">
              Weight:{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {(pokemon.weight / 10).toFixed(1)} kg
              </span>
            </p>
            <p className="text-xl text-zinc-700 dark:text-zinc-300">
              Base Experience:{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {pokemon.base_experience}
              </span>{" "}
              <span className="text-sm italic font-semibold">exp</span>
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-xl capitalize text-zinc-700 dark:text-zinc-300">Types:</span>
              {pokemon.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} />
              ))}
            </div>
            <ul className="flex gap-2 items-center flex-wrap">
              <span className="text-xl capitalize text-zinc-700 dark:text-zinc-300">Abilities:</span>
              {pokemon.abilities.map((a, i) => (
                <li
                  key={a.ability.name}
                  className="text-xl font-semibold capitalize text-zinc-800 dark:text-zinc-200"
                >
                  {a.ability.name}
                  {a.is_hidden && (
                    <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                      {" "}(hidden)
                    </span>
                  )}
                  {i !== pokemon.abilities.length - 1 && (
                    <span className="font-light text-zinc-400 dark:text-zinc-600"> | </span>
                  )}
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2 items-start">
              <span className="text-xl capitalize text-zinc-700 dark:text-zinc-300">Stats:</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-5">
                {pokemon.stats.map((s) => (
                  <StatBar
                    key={s.stat.name}
                    name={s.stat.name}
                    value={s.base_stat}
                  />
                ))}
              </div>
            </ul>
          </div>
          <img
            className="w-50 h-50 md:w-100 md:h-100"
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DetailPage;