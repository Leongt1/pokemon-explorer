export const getIdFromUrl = (url: string): number => {
    const parts = url.split('/').filter(Boolean)
    return Number(parts[parts.length - 1])
  }
  

export const getArtworkUrl = (id: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}