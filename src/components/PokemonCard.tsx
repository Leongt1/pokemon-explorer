import { Link } from "react-router-dom";
import { getArtworkUrl, getIdFromUrl } from "../utils/pokemon";
import { FaHeart } from "react-icons/fa";
import useFavoriteStore from "../store/favoritesStore";

type PokemonCardProps = {
  name: string;
  url?: string;
  id?: number;
};

const PokemonCard = ({ name, url = "", id }: PokemonCardProps) => {
  const pokemonId = id ?? (url ? getIdFromUrl(url) : 0);
  const { isFavourite, add, remove } = useFavoriteStore();
  const favourited = isFavourite(pokemonId);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favourited) {
      remove(pokemonId);
    } else {
      add({ id: pokemonId, name });
    }
  };

  return (
    <Link
      to={`/pokemon/${name}`}
      className="relative border-2 border-gray-200 dark:border-zinc-700 h-70 w-50 flex flex-col gap-2 rounded-xl shadow-lg bg-white dark:bg-zinc-800 hover:shadow-xl transition-shadow"
    >
      <FaHeart
        className={`absolute top-2 right-3 w-6 h-6 cursor-pointer z-10 ${
          favourited ? "text-red-500" : "text-gray-300 dark:text-zinc-600 hover:text-red-400"
        }`}
        onClick={handleHeartClick}
      />
      <img
        className="flex-1 object-contain p-2"
        src={getArtworkUrl(pokemonId)}
        alt={name}
      />
      <div className="flex items-center justify-around mb-2">
        <p className="font-semibold capitalize text-zinc-800 dark:text-zinc-100">{name}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
