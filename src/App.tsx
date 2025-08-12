import { Toaster } from "react-hot-toast"
import { Header } from "./Components/Header"
import { Info } from "./Components/Info"
import { GlobalStyle } from "./Styles/global"
import { ThemeProvider } from "./contexts/ThemeProvider"
import { useTheme } from "./contexts/ThemeContext"

function AppContent() {
  const { theme } = useTheme()

  return (
    <>
      <GlobalStyle currentTheme={theme} />
      <Header />
      <Toaster />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Info />
      </div>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
