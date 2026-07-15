import { create } from 'zustand';
import { getWorlds, createWorld as createWorldInDb, updateWorldTheme } from '../db/entities';
import type { World, ThemeId } from '../types/entities';

interface WorldStore {
  worlds: World[];
  currentWorldId: string | null;
  loadWorlds: () => Promise<void>;
  createWorld: (name: string, themeId: ThemeId, genre: string, tagline?: string) => Promise<World>;
  setCurrentWorldId: (id: string) => void;
  setWorldTheme: (worldId: string, themeId: ThemeId) => Promise<void>;
}

export const useWorldStore = create<WorldStore>((set, get) => ({
  worlds: [],
  currentWorldId: null,

  loadWorlds: async () => {
    let worlds = await getWorlds();
    if (worlds.length === 0) {
      const first = await createWorldInDb('My First World', 'dark-fantasy', 'Dark Fantasy', 'A world shrouded in mystery and magic.');
      worlds = [first];
    }
    const current = get().currentWorldId;
    set({
      worlds,
      currentWorldId: current && worlds.some((w) => w.id === current) ? current : worlds[0].id,
    });
  },

  createWorld: async (name, themeId, genre, tagline) => {
    const world = await createWorldInDb(name, themeId, genre, tagline);
    set((state) => ({ worlds: [...state.worlds, world], currentWorldId: world.id }));
    return world
  },

  setCurrentWorldId: (id: string) => set({ currentWorldId: id }),

  setWorldTheme: async (worldId, themeId) => {
    await updateWorldTheme(worldId, themeId);
    set((state) => ({
      worlds: state.worlds.map((w) => (w.id === worldId ? { ...w, themeId } : w)),
    }));
  },
}));