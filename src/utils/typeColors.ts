export const TYPE_COLOURS: Record<string, { bg: string; text: string }> = {
    normal:   { bg: 'bg-gray-400',    text: 'text-white' },
    fire:     { bg: 'bg-orange-400',  text: 'text-white' },
    water:    { bg: 'bg-blue-400',    text: 'text-white' },
    electric: { bg: 'bg-yellow-300',  text: 'text-black' },
    grass:    { bg: 'bg-green-400',   text: 'text-white' },
    ice:      { bg: 'bg-cyan-300',    text: 'text-black' },
    fighting: { bg: 'bg-red-600',     text: 'text-white' },
    poison:   { bg: 'bg-purple-400',  text: 'text-white' },
    ground:   { bg: 'bg-yellow-600',  text: 'text-white' },
    flying:   { bg: 'bg-indigo-300',  text: 'text-white' },
    psychic:  { bg: 'bg-pink-400',    text: 'text-white' },
    bug:      { bg: 'bg-lime-400',    text: 'text-black' },
    rock:     { bg: 'bg-yellow-700',  text: 'text-white' },
    ghost:    { bg: 'bg-purple-700',  text: 'text-white' },
    dragon:   { bg: 'bg-violet-600',  text: 'text-white' },
    dark:     { bg: 'bg-neutral-700', text: 'text-white' },
    steel:    { bg: 'bg-slate-400',   text: 'text-white' },
    fairy:    { bg: 'bg-pink-300',    text: 'text-black' },
  }
  
export const getTypeColour = (type: string) =>
    TYPE_COLOURS[type] ?? { bg: 'bg-gray-300', text: 'text-black' }