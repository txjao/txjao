import { styled } from "styled-components";
import { Dropdown } from "./Dropdown";
import { Toggle } from "./Toggle";
import { slide as Menu } from 'react-burger-menu'

const Container = styled.div`

    .menu{
    }

`

export function MenuMobile() {
    return (
        <Container>
            <Menu className="menu">
                <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/">Linkedin</a>
                <a href="https://github.com/txjao">Github</a>
                <Dropdown />
                <a href="/">Resume</a>
                <Toggle />
                <a href="/" id="language-button">PT</a>
            </Menu >
        </Container>
    );
}
