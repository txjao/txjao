import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";

const Container = styled.div`
    .display {
        display: flex;
        flex-direction: column;
    }

    h1,h2 {
        background: -webkit-linear-gradient(180deg, rgba(255, 240, 0, 1) 0%, rgba(0, 181, 255, 1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 40px;
    }

    .wrapper-lettering {
        height: auto;
        width: auto;
    }

    .index-module_type__E-SaG {
        font-size: 40px;
        display: inline-block;
        background: -webkit-linear-gradient(180deg, rgba(255, 240, 0, 1) 0%, rgba(0, 181, 255, 1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Inter;
        font-weight: 700;
    }

    @media (max-width: 1440px) {
        .index-module_type__E-SaG {
            font-size: 32px;
        }
        h1,h2 {
            font-size: 32px;
        }
    }

    @media (max-width: 768px) {
        .index-module_type__E-SaG {
            font-size: 24px;
        }
        h1,h2 {
            font-size: 24px;
        }
        .wrapper-lettering {
            height: 48px;
        }
    }

    @media (max-width: 450px) {
        .wrapper-lettering {
            height: 110px;
            width: 220px;
        }
        .index-module_type__E-SaG {
            font-size: 20px;
        }
        h1,h2 {
            font-size: 20px;
        }
    }
    @media (max-width: 375px) {
        .wrapper-lettering {
            height: 110px;
            width: 200px;
        }
    }
    @media (max-width: 325px) {
        .wrapper-lettering {
            height: 110px;
            width: 128px;
        }
    }
`;

export function Lettering() {
    function handleAge() {
        const date = new Date();

        return date.getDate() >= 9 && date.getUTCMonth() + 1 >= 10 && date.getHours() >= 8 ? 
        date.getFullYear() - 2002 :
        date.getFullYear() - 2003
    }

    return (
        <Container>
            <div style={{ display: "inline-flex" }}>
                <h1>Hi there!</h1><p>👋</p>
            </div>
            <div className="wrapper-lettering">
                <TypeAnimation
                    sequence={[
                        `My name is João, I'm ${handleAge()} years old.`,
                        1000,
                        "My name is João, I'm a muay thai fighter.",
                        1000,
                        "My name is João, I'm a brazilian jiu jitsu fighter.",
                        1000,
                        "My name is João, I'm a guitarist.",
                        1000,
                        "My name is João, I'm a dog person.",
                        1000,
                        "My name is João, I'm an e-sports enthusiast.",
                        1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                />
            </div>
        </Container>
    );
}