import type { EvolutionChain, EvolutionNode } from "../types/pokemon";

export const getIdFromUrl = (url: string): number => {
    const parts = url.split('/').filter(Boolean)
    return Number(parts[parts.length - 1])
  }
  

export const getArtworkUrl = (id: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export const flattenChain  = (node: EvolutionNode): {name: string, id: number}[] => {
  return [
    {name: node.species.name, id: getIdFromUrl(node.species.url)},
    ...node.evolves_to.flatMap((n) => flattenChain (n))
  ]
}