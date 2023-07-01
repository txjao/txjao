import styled from "styled-components";

const Container = styled.div`

    max-width: 700px;

   h1, h2{
    background: -webkit-linear-gradient(180deg, rgba(255,240,0,1) 0%, rgba(0,181,255,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 40px;
   }
   p{
    font-size: 30px;
   }
`


export function Lettering() {
    return (
        <Container>
            <div style={{display: "inline-flex"}}>
            <h1>Hi there!</h1><p>👋</p>
            </div>
            <h2>My name is João, im 20 years old!</h2>
        </Container>
    );
}