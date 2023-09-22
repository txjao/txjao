import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";

let flexAlign;
function handleFontSize() {
    if (window.innerWidth > 1366) {
        flexAlign = 'center'
        return '40px'
    } else if ( window.innerWidth > 1024 && window.innerWidth < 1366) {
        flexAlign = 'flex-start'
        return '32px'
    } else if ( window.innerWidth > 450 && window.innerWidth < 1024) {
        return '24px'
    } else{
        return '20px'
    }
}

function handleWidth() {
    if (window.innerWidth > 450) {
        return 'auto'
    } else{
        return '220px'
    }
}

function handleHeight() {
    if (window.innerWidth > 450) {
        return 'auto'
    } else{
        return '110px'
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${flexAlign};

   h1, h2{
    background: -webkit-linear-gradient(180deg, rgba(255,240,0,1) 0%, rgba(0,181,255,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: ${handleFontSize()};
   }

   .wrapper-lettering{
        height: ${handleHeight()};
        width: ${handleWidth()};
   }
`

export function Lettering() {

    function handleAge() {
        const date = new Date();
        let age;
        if (date.getDate() >= 9 && date.getUTCMonth() + 1 >= 10 && date.getHours() >= 8) {
            age = date.getFullYear() - 2002
        } else {
            age = date.getFullYear() - 2003
        }
        return age;
    }

    return (
        <Container>
            <div style={{ display: "inline-flex" }}>
                <h1>Hi there!</h1><p>👋</p>
            </div>
            <div className="wrapper-lettering">
                <TypeAnimation
                    sequence={[
                        `My name is João, i'm ${handleAge()} years old.`,
                        1000,
                        "My name is João, i'm muay thai fighter.",
                        1000,
                        "My name is João, i'm brazilian jiu jitsu fighter.",
                        1000,
                        "My name is João, i'm guitarist.",
                        1000,
                        "My name is João, i'm dog person.",
                        1000,
                        "My name is João, i'm e-sports enthusiast.",
                        1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: handleFontSize(), display: 'inline-block', background: '-webkit-linear-gradient(180deg, rgba(255,240,0,1) 0%, rgba(0,181,255,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Inter', fontWeight: 700 }}
                    repeat={Infinity}
                />
            </div>
        </Container>
    );
}