import styled from "styled-components"
import moon from '../assets/Moon.svg'
import sun from '../assets/sun.svg'
import { ReactSVG } from 'react-svg'
import { useTheme } from "../contexts/ThemeContext";

const Container = styled.button<{ theme: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: ${props => props.theme === 'light' ? '#FAFAFA' : '#060606'};
    border: none;
    cursor: pointer;
    color: #000;

    &:hover{
        animation: hover 0.8s alternate;
    }

    @keyframes hover{
        25%{
            transform: rotate(10deg);
            transition: transform 0.5s;
        }
        50%{
            transform: rotate(20deg);
            transition: transform 0.5s;
        }
        75%{
            transform: rotate(-10deg);
            transition: transform 0.5s;
        }
        100%{
            transform: rotate(0deg);
            transition: transform 0.5s;
        }
    }

`

export function Toggle() {
  const { theme, toggleTheme } = useTheme();

  function handleThemeIcon() {
    return theme === "light" ? moon : sun
  }

  return (
    <Container onClick={toggleTheme} theme={theme}>
      <ReactSVG src={handleThemeIcon()} />
    </Container>
  );
}
