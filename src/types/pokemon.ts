export type PokemonListItem = {
    name: string
    url: string
}

export type PokemonListResponse = {
    count: number
    next: string | null
    previous: string | null
    results: PokemonListItem[]
}

export type Pokemon = {
    id: number
    name: string
    base_experience: number
    height: number   // in decimetres
    weight: number   // in hectograms
    sprites: PokemonSprites
    types: PokemonType[]
    abilities: PokemonAbility[]
    stats: PokemonStat[]
}

export type PokemonSprites = {
    front_default: string
    other: {
        'official-artwork': {
            front_default: string
        }
    }
}

export type PokemonAbility = {
    ability: {
        name: string
        url: string
    }
    is_hidden: boolean
    slot: number
}

export type PokemonType = {
    slot: number
    type: {
        name: string
        url: string
    }
}

export type PokemonStat = {
    base_stat: number
    effort: number
    stat: {
        name: string
        url: string
    }
}

export type PokemonMove = {
    move: {
        name: string
        url: string
    }
}

export type AbilityDetail = {
    id: number
    name: string
    effect_entries: {
        effect: string
        short_effect: string
        language: {
        name: string
        }
    }[]
}

export type PokemonSpecies = {
    evolution_chain: {
        url: string
    }
    evolves_from_species?: {
        name: string
        url: string
    }
}

export type EvolutionNode = {
    species: {
        name: string
        url: string
    }
    evolves_to: EvolutionNode[]
}

export type EvolutionChain = {
    id: number
    chain: EvolutionNode
}