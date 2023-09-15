import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";

const Container = styled.div`
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

    function handleAge() {
        const age = new Date();
        if(Date.now() < Date.parse("2002-10-09")){
            return age.getFullYear() - 2002;
        }
        return age;
    }

    return (
        <Container>
            <div style={{ display: "inline-flex" }}>
                <h1>Hi there!</h1><p>👋</p>
            </div>
            <div>
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        `My name is João, ${handleAge()} im years old`,
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'My name is João, im',
                        1000,
                        'My name is João, im mariana is cool',
                        1000,
                        'My name is João, im Chinchillas',
                        1000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '40px', display: 'inline-block', background: '-webkit-linear-gradient(180deg, rgba(255,240,0,1) 0%, rgba(0,181,255,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Inter', fontWeight: 700 }}
                    repeat={Infinity}
                />
            </div>
        </Container>
    );
}