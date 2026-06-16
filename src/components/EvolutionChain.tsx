import { useEvolutionChain } from '../hooks/usePokemon';
import { flattenChain, getArtworkUrl } from '../utils/pokemon';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

type EvolutionChainProps = {
    name: string
}
const EvolutionChain = ({name}: EvolutionChainProps) => {
    const { data, isLoading, isError } = useEvolutionChain(name)

    if (isLoading) {
        return (
            <p className="italic text-sm text-zinc-500 dark:text-zinc-400">
                Loading evolutions...
            </p>
        )
    }
    
    if (isError || !data || !data.chain) return null
    
    const chain = flattenChain(data?.chain!)
    if (chain.length <= 1) return null

    return (
        <div className="flex flex-col gap-3 w-full">
        <span className="text-xl text-zinc-700 dark:text-zinc-300">Evolutions:</span>
        <div className="flex items-center flex-wrap gap-2">
            {chain.map((pokemon, i) => (
            <Fragment key={pokemon.name}>
                <Link
                to={`/pokemon/${pokemon.name}`}
                className="flex flex-col items-center gap-1 hover:opacity-75 transition-opacity"
                >
                <img
                    src={getArtworkUrl(pokemon.id)}
                    alt={pokemon.name}
                    className="w-20 h-20 object-contain"
                />
                <span className="capitalize text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {pokemon.name}
                </span>
                </Link>
                {i !== chain.length - 1 && (
                <span className="text-2xl text-zinc-400 dark:text-zinc-500">→</span>
                )}
            </Fragment>
            ))}
        </div>
    </div>
  )
}

export default EvolutionChain