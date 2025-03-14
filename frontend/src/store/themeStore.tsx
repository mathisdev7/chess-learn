import { create } from "zustand";

export interface ThemeState {
  darkColor: string;
  lightColor: string;
  setDarkColor: (color: string) => void;
  setLightColor: (color: string) => void;
}

interface ThemeStore extends ThemeState {
  set: (fn: (state: ThemeState) => ThemeState) => void;
}

const getDarkColor = () => localStorage.getItem("darkColor") || "#353935";
const getLightColor = () => localStorage.getItem("lightColor") || "#FF6347";

export const useThemeStore = create<ThemeStore>((set) => ({
  darkColor: getDarkColor(),
  lightColor: getLightColor(),
  set: set,
  setDarkColor: (color) => {
    localStorage.setItem("darkColor", color);
    set({ darkColor: color });
  },

  setLightColor: (color) => {
    localStorage.setItem("lightColor", color);
    set({ lightColor: color });
  },
}));
