import { Header } from "./Components/Header"
import { Info } from "./Components/Info"
import { GlobalStyle } from "./Styles/global"

function App() {
  return (
    <>
    <GlobalStyle/>
    <Header/>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", }}>
    <Info/>
    </div>
    </>
  )
}

export default App
