import { Link, useParams } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import StatBar from "../components/StatBar";
import { FaHeart } from "react-icons/fa";
import useFavoriteStore from "../store/favoritesStore";
import Layout from "../components/Layout";

const DetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: pokemon, isLoading, isError } = usePokemon(name!);
  const { isFavourite, add, remove } = useFavoriteStore();

  if (isLoading) {
    return (
      <Layout>
        <p className="italic font-semibold">Loading...</p>
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
            className="border rounded-md px-4 py-1 bg-black text-white hover:bg-gray-800"
          >
            Back
          </Link>
        </div>

        <div className="flex gap-5 items-center justify-center mb-6">
          <h1 className="font-semibold capitalize text-center text-xl md:text-4xl">
            {pokemon.name}
          </h1>
          <FaHeart
            className={`w-10 h-10 cursor-pointer ${
              favourited ? "text-red-600" : "text-gray-400 hover:text-red-400"
            }`}
            onClick={handleToggleFav}
          />
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-6 px-4 py-5">
          <div className="flex flex-col items-start gap-2">
            <p className="text-xl">
              Height:{" "}
              <span className="font-semibold">
                {(pokemon.height / 10).toFixed(1)} m
              </span>
            </p>
            <p className="text-xl">
              Weight:{" "}
              <span className="font-semibold">
                {(pokemon.weight / 10).toFixed(1)} kg
              </span>
            </p>
            <p className="text-xl">
              Base Experience:{" "}
              <span className="font-semibold">{pokemon.base_experience}</span>{" "}
              <span className="text-sm italic font-semibold">exp</span>
            </p>
            <ul className="flex gap-2 items-center flex-wrap">
              <span className="text-xl capitalize">Types:</span>
              {pokemon.types.map((t, i) => (
                <li key={t.type.name} className="text-xl font-semibold capitalize">
                  {t.type.name}
                  {i !== pokemon.types.length - 1 && (
                    <span className="font-light"> | </span>
                  )}
                </li>
              ))}
            </ul>
            <ul className="flex gap-2 items-center flex-wrap">
              <span className="text-xl capitalize">Abilities:</span>
              {pokemon.abilities.map((a, i) => (
                <li
                  key={a.ability.name}
                  className="text-xl font-semibold capitalize"
                >
                  {a.ability.name}
                  {a.is_hidden && (
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      (hidden)
                    </span>
                  )}
                  {i !== pokemon.abilities.length - 1 && (
                    <span className="font-light"> | </span>
                  )}
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2 items-start">
              <span className="text-xl capitalize">Stats:</span>
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
