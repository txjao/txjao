import styled from "styled-components";
import { Toggle } from "./Toggle";
import { Dropdown } from "./Dropdown";
import { DropdownResume } from "./DropdownResume";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Hamburger from 'hamburger-react'
import { motion } from "framer-motion"
import resume from '../assets/Curriculo.pdf';

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

    .menu-container{
        display: flex;
        flex-direction: column;
    }

    .menu{
        display: flex;
        flex-direction: column;
        position: relative;
        top: 10px;
    }
    .menu-content{
        display: flex;
        flex-direction: column;
        text-align: right;
        position: absolute;
        right: 0;
        background-color: #FAFAFA;
        border: 1px solid #000;
        border-top: none;
        padding: 12px;
    }
    .menu-content-closed{
        position: absolute;
        right: 0;
    }

`
const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
}

export function Header() {
    const [isOpen, setOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const breakpoint = 768;

    useEffect(() => {
        function updateSize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
    }, []);

    const notify = () => toast('This feature is not available yet', {
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
                    <DropdownResume />
                    <a id="language-button" onClick={() => {
                        notify()
                    }}>PT</a>
                </ContainerDesktop >
            )}
            {windowWidth < breakpoint && (
                <ContainerMobile>
                    <img src="/favicon.png" />

                    <div className="menu-container">
                        <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
                        <div className="menu">
                            <motion.nav
                                animate={isOpen ? "open" : "closed"}
                                variants={variants}
                                className={isOpen ? "menu-content" : "menu-content-closed"}
                            >
                                {isOpen && (
                                    <>
                                        <a href="mailto: contatojoaovteixeira@gmail.com">Email</a>
                                        <a href="https://github.com/txjao">Github</a>
                                        <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/">Linkedin</a>
                                        <a href={resume} target="_blank" rel="noopener">Resume</a>
                                        <a onClick={() => notify()}>Certificates</a>
                                    </>
                                )}
                            </motion.nav>
                        </div>
                    </div>
                </ContainerMobile >
            )}
        </>
    );
}