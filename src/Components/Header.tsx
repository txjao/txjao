import styled from "styled-components";
import { Toggle } from "./Toggle";
import { Dropdown } from "./Dropdown";
import { DropdownResume } from "./DropdownResume";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ContainerDesktop = styled.header`
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
        font-weight: 400;
    }

    a:hover::after {
        width: 100%;
    }

    #language-button:hover{
    }
`

const ContainerMobile = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FAFAFA;
    height: 96px;
    padding: 0 32px;

    a{
        font-family: 'Poppins', sans-serif;
        text-decoration: none;
        color: #000;
        cursor: pointer;
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
export function Header() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const breakpoint = 768;

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, [windowWidth])


    const notify = () => toast('Language PT-BR is not available yet', {
        icon: '🚧',
        duration: 3000,
        position: "top-right",
        style: {
            fontFamily: 'Poppins',
        }
    })

    return (
        <>
            {windowWidth >= breakpoint && (
                <ContainerDesktop>
                    <Toggle />
                    <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/">Linkedin</a>
                    <a href="https://github.com/txjao">Github</a>
                    <img src="/favicon.png" />
                    <Dropdown />
                    <DropdownResume/>
                    <a id="language-button" onClick={()=>{
                        notify()
                    }}>PT</a>
                </ContainerDesktop >
            )}
            {windowWidth < breakpoint ? (
                <ContainerMobile>
                    <img src="/favicon.png" />
                </ContainerMobile >
            ) : null}
        </>
    );
}