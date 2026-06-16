import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchAbility, fetchAllPokemon, fetchPokemon, fetchPokemonEvolutionChain, fetchPokemonList, fetchPokemonSpecies } from "../api/pokemon";
import { getIdFromUrl } from "../utils/pokemon";

export const usePokemonInfinite = () => {
    return useInfiniteQuery({
        queryKey: ['pokemon-infinite'],
        queryFn: ({ pageParam }) => fetchPokemonList(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
          if (!lastPage.next) return undefined // no more pages
          const url = new URL(lastPage.next)
          return Number(url.searchParams.get('offset'))
        },
        staleTime: 1000 * 60 * 5,
    })
}

export const usePokemonList = (offset: number) => {
    return useQuery({
        queryKey: ['pokemon-list', offset],
        queryFn: () => fetchPokemonList(offset),
        staleTime: 1000 * 60 * 5,
    })
}

export const useAllPokemon = () => {
    return useQuery({
        queryKey: ["pokemon-all"],
        queryFn: fetchAllPokemon,
        staleTime: Infinity,
    });
};

export const usePokemon = (name: string) => { 
    return useQuery({
        queryKey: ['pokemon', name],
        queryFn: () => fetchPokemon(name),
        enabled: !!name,
        staleTime: 1000 * 60 * 5,
    })
}

export const useAbility = (name: string) => {
    return useQuery({
        queryKey: ['ability', name],
        queryFn: () => fetchAbility(name),
        enabled: !!name,
        staleTime: 1000 * 60 * 5,
    })
}

const usePokemonSpecies = (name: string) => {
    return useQuery({
        queryKey: ['pokemon-species', name],
        queryFn: () => fetchPokemonSpecies(name),
        enabled: !!name,
        staleTime: 1000 * 60 * 5,
    })
}

const usePokemonEvolutionChain = (id: number) => {
    return useQuery({
        queryKey: ['evolution-chain', id],
        queryFn: () => fetchPokemonEvolutionChain(id),
        enabled: id > 0,
        staleTime: 1000 * 60 * 5,
    })
}

export const useEvolutionChain = (name: string) => {
    const { data: species } = usePokemonSpecies(name)

    const chainId = species?.evolution_chain.url
        ? getIdFromUrl(species.evolution_chain.url)
        : 0

    const chainQuery = usePokemonEvolutionChain(chainId)

    return chainQuery
}