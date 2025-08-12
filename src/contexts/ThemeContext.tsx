import { createContext, useContext } from "react";

export type Theme = "light" | "dark"

export interface IThemeContext {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  toggleTheme: () => {
    throw new Error('toggleTheme deve ser usado dentro de um ThemeProvider')
  }
})

export function useTheme() {
  return useContext(ThemeContext)
} 
