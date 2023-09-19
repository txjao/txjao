import styled from "styled-components";
import { Lettering } from "./Lettering";
import { ReactSVG } from 'react-svg'
import linkedin from '../assets/linkedin.svg'
import github from '../assets/github.svg'
import instagram from '../assets/instagram.svg'
import spotify from '../assets/spotify.svg'
import twitter from '../assets/twitter.svg'
import discord from '../assets/discord.svg'

function handleWidth(){
    if (window.innerWidth > 1366) {
        return 'auto'
    } else if(window.innerWidth >= 1024 && window.innerWidth <= 1366){
        return '80%' 
    } else if(window.innerWidth >= 768 && window.innerWidth < 1024){
        return '80%'
    }
}

function handleHeight(){
    if (window.innerHeight > 1366) {
        return 'auto'
    } else if(window.innerHeight >= 768 && window.innerHeight <= 1366){
        return '120px' 
    } else if(window.innerHeight >= 768 && window.innerHeight < 1024){
        return '120px'
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 80px;
    width: ${handleWidth()};
    padding: 16px;
    height: ${handleHeight()};

    img{
        max-width: 100px;
        border-radius: 50%;
        margin-right: 16px;
    }

    p{
        font-family: 'Poppins', sans-serif;
        color: #000;
        font-size: 24px;
    }

    .icons{
        display: flex;
        gap: 24px;
        a{
            height: 24px;
        }
        a:hover{
            position: relative;
            top: -2px;
        }
    }
`

export function Info() {
    return (
        <>
            <Container>
                <div style={{ display: "flex", height: handleHeight()}}>
                    <img src="/eu.jpg" />
                    <Lettering />
                </div>
                <p>Im a software engineer learning full-stack development, currently working as a Front-end Developer.</p>
                <div className="icons">
                    <a target="_blank" href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/"> <ReactSVG src={linkedin} /></a>
                    <a target="_blank" href="https://github.com/txjao"> <ReactSVG src={github} /></a>
                    <a target="_blank" href="https://www.instagram.com/tx.jsx/"> <ReactSVG src={instagram} /></a>
                    <a target="_blank" href="https://open.spotify.com/user/lzx7pb5mnpd5dd47m99carpk9?si=664bbc8ce7c74a69"> <ReactSVG src={spotify} /></a>
                    <a target="_blank" href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/"> <ReactSVG src={discord} /></a>
                </div>
            </Container>
        </>
    );
}