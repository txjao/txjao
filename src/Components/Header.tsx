import styled from "styled-components";
import { Toggle } from "./Toggle";
import { Dropdown } from "./Dropdown";

const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FAFAFA;
    height: 96px;
    padding: 0 60px;

    a{
        font-family: 'Poppins', sans-serif;
        text-decoration: none;
        color: #000;
    }

    img{
        max-width: 48px;
    }

    a::after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        background: #000;
        transition: width .2s ease-in;
    }

    a:hover::after {
        width: 100%;
    }
`
interface ToggleProps {
    isDarkMode: boolean;
}

export function Header() {

    return (
        <Container>
            <Toggle>Toggle</Toggle>
            <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/">Linkedin</a>
            <a href="https://github.com/txjao">Github</a>
            <img src="/favicon.png" />
            <Dropdown/>
            <a href="/">Resume</a>
            <button>PT</button>
        </Container>
    );
}