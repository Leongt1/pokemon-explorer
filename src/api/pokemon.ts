import axios from "axios";
import type { AbilityDetail, Pokemon, PokemonListResponse } from "../types/pokemon";

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

export const fetchAllPokemon = async (): Promise<PokemonListResponse> => {
    const { data } = await api.get("/pokemon", {
        params: {
            limit: 100000,
            offset: 0,
        },
    })

    return data;
}

export const fetchPokemonList = async (offset: number): Promise<PokemonListResponse> => {
    const { data } = await api.get<PokemonListResponse>("/pokemon", {
        params: { offset, limit: 20 }
    });
    return data;
}

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
    const { data } = await api.get<Pokemon>(`/pokemon/${name}`);
    return data;
}

export const fetchAbility = async (name: string): Promise<AbilityDetail> => {
    const { data } = await api.get<AbilityDetail>(`/ability/${name}`);
    return data;
}