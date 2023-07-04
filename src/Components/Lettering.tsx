import { useEffect, useState } from "react";
import styled from "styled-components";
import { Typed } from "typed.ts";

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
    const [text, setText] = useState('');

    const line1 = 'Hello, World!';
    const line2 = 'slow';
    const line3 = 'this is typed really fast, but errors are slow';
    const line4 = 'this line is fast forwarded. No errors will be made';

        const typed = new Typed({
            callback: text => {
                setText(text)
                console.log(text)
            }
        });

        async () => {
            typed
                .type(line1)
                .backspace(line1.length)
                .type(line2, { perLetterDelay: { min: 200, max: 400 } })
                .backspace(line2.length)
                .type(line3, { eraseDelay: { min: 40, max: 80 }, perLetterDelay: { min: 200, max: 400 } })
                .backspace(line3.length);

            typed.fastForward();
            await typed.run();
            await typed.reset(true);
            typed.type(line4);
            await typed.run();
        }

    return (
        <Container>
            <div style={{ display: "inline-flex" }}>
                <h1>Hi there!</h1><p>👋</p>
            </div>
            <h2>My name is João, im {text}</h2>
        </Container>
    );
}