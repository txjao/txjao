import { styled } from "styled-components";
import { Dropdown } from "./Dropdown";
import { Toggle } from "./Toggle";

const Container = styled.div`

`

export function MenuMobile() {
    return (
        <Container>
            <Toggle />
            <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/">Linkedin</a>
            <a href="https://github.com/txjao">Github</a>
            <img src="/favicon.png" />
            <Dropdown />
            <a href="/">Resume</a>
            <a href="/" id="language-button">PT</a>
        </Container>
    );
}