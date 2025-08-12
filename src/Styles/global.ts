import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ currentTheme: string }>`

    *{
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
    }
    body{
        background-color: ${props => props.currentTheme === 'light' ? '#FAFAFA' : '#050505'};
    }
    `
