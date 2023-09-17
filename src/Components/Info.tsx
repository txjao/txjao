import styled from "styled-components";
import { Lettering } from "./Lettering";
import { ReactSVG } from 'react-svg'
import linkedin from '../assets/linkedin.svg'
import github from '../assets/github.svg'
import instagram from '../assets/instagram.svg'
import spotify from '../assets/spotify.svg'
import discord from '../assets/discord.svg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 80px;

    img{
        width: 100px;
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
                <div style={{ display: "flex" }}>
                    <img src="/eu.jpg" />
                    <Lettering />
                </div>
                <p>Im a software engineer learning full-stack development, currently working as a Front-end Developer.</p>
                <div className="icons">
                    <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/"> <ReactSVG src={linkedin} /></a>
                    <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/"> <ReactSVG src={github} /></a>
                    <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/"> <ReactSVG src={instagram} /></a>
                    <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/"> <ReactSVG src={spotify} /></a>
                    <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/"> <ReactSVG src={discord} /></a>
                </div>
            </Container>
        </>
    );
}