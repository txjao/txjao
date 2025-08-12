import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ theme: string }>`

    *{
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
    }
    body{
        background-color: ${props => props.theme === 'light' ? '#FAFAFA' : '#050505'};
    }
    `
