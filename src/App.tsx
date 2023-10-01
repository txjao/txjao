import { Toaster } from "react-hot-toast"
import { Header } from "./Components/Header"
import { Info } from "./Components/Info"
import { GlobalStyle } from "./Styles/global"

function App() {
  return (
    <>
    <GlobalStyle/>
    <Header/>
    <Toaster />
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", }}>
    <Info/>
    </div>
    </>
  )
}

export default App
