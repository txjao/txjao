import { ReactNode, useState } from "react"
import { IThemeContext, Theme, ThemeContext } from "./ThemeContext"

interface ProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ProviderProps) {
  const [theme, setTheme] = useState<Theme>('light')

  function toggleTheme() {
    setTheme(prevState => prevState === 'light' ? 'dark' : "light")
  }

  const ThemeContextValue: IThemeContext = {
    theme: theme,
    toggleTheme: toggleTheme
  }

  return (
    <ThemeContext.Provider value={ThemeContextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
