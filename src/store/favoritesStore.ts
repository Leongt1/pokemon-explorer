import { create } from "zustand";
import type { Pokemon } from "../types/pokemon";
import { persist } from "zustand/middleware";

export type FavoritePokemon = Pick<Pokemon, "id" | "name">;

type FavoriteStore = {
  favorites: FavoritePokemon[];
  add: (fav: FavoritePokemon | Pokemon) => void;
  remove: (id: number) => void;
  isFavourite: (id: number) => boolean;
};

const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      add: (fav) =>
        set((s) => {
          if (s.favorites.some((i) => i.id === fav.id)) return s;
          return {
            favorites: [...s.favorites, { id: fav.id, name: fav.name }],
          };
        }),

      remove: (id) =>
        set((s) => ({
          favorites: s.favorites.filter((i) => i.id !== id),
        })),

      isFavourite: (id) => get().favorites.some((i) => i.id === id),
    }),
    { name: "pokemon-favourites" }
  )
);

export default useFavoriteStore;
