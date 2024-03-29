import styled from "styled-components"
import moon from '../assets/Moon.svg'
import sun from '../assets/sun.svg'
import { ReactSVG } from 'react-svg'
import { useState } from "react";
import toast from 'react-hot-toast'

const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #FAFAFA;
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
    const [darkMode, setDarkMode] = useState(false)

    function handleDarkMode() {
        if (darkMode) {
            return sun
        } else {
            return moon
        }
    }

    const notify = () => toast('Dark mode is not available yet', {
        icon: '🚧',
        duration: 3000,
        position: "top-right",
        style: {
            fontFamily: 'Poppins',
        }
    })

    return (
        <Container
            onClick={() => {
                setDarkMode(darkMode)
                notify()
            }}>
            <ReactSVG src={handleDarkMode()} />

        </Container>
    );
}