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
        const date = new Date();
        let age;
        date.getMonth() < 10 ? age = new Date().getFullYear() - 2003 : age = new Date().getFullYear() - 2002;

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
                        `My name is João, im ${handleAge()} years old!`,
                        1000,
                        'My name is João, im muay thai fighter!',
                        1000,
                        'My name is João, im brazilian jiu jitsu fighter!',
                        1000,
                        'My name is João, im guitarist!',
                        1000,
                        'My name is João, im dog person!',
                        1000,
                        'My name is João, im e-sports enthusiast!',
                        1000,
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