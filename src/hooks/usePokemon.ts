import { useQuery } from "@tanstack/react-query";
import { fetchAbility, fetchAllPokemon, fetchPokemon, fetchPokemonList } from "../api/pokemon";

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