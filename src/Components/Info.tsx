import styled from "styled-components";
import { Lettering } from "./Lettering";
import { ReactSVG } from 'react-svg'
import socialMediaIcons from '../utils/SocialMediaIcons';
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 80px;
    width: auto; 
    height: auto;

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
        cursor: pointer;
        a{
            height: 24px;
            position: relative;
            top: 0px;
            transition: top 0.1s;
        }
        a:hover{
            top: -2px;
        }
    }

    .lettering-box{
        display: flex;
    
    }

    @media (max-width: 1440px) {
        height: 120px;
        width: 80%; 
        p{
            font-size: 20px;
        }
    }
    
    @media (max-width: 1024px) {
        img{
            max-width: 80px;
        }
        p{
            font-size: 16px;
        }
    }

    @media (max-width: 768px) {
        height: 104px;
    }

    @media (max-width: 450px) {
        img{
            border-radius: 3%;
        }
    }

`

export function Info() {
    const [easterEgg, setEasterEgg] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [img, setImg] = useState("")

    function handleEasterEgg() {
        setEasterEgg(easterEgg + 1)
        if (easterEgg === 5) {
            alert("You found me! 🐰")
        }
    }

    function handleOpen() {
        setIsModalOpen(true)
    }
    function handleClose() {
        setIsModalOpen(false)
    }

    useEffect(() => {
        window.innerWidth >= 768 ? setImg("/eu.jpg") : setImg("/selfie.jpg")
    }, [img])

    return (
        <>
            <Container>
                <div className="lettering-box">
                    <img src={img} onClick={handleEasterEgg} />
                    <Lettering />
                </div>
                <p>Im a software engineer learning full-stack development, currently working as a Front-end Developer.</p>
                <div className="icons">
                    <a target="_blank" href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/"> <ReactSVG src={socialMediaIcons.linkedin} /></a>
                    <a target="_blank" href="https://github.com/txjao"> <ReactSVG src={socialMediaIcons.github} /></a>
                    <a target="_blank" href="https://www.instagram.com/tx.jsx/"> <ReactSVG src={socialMediaIcons.instagram} /></a>
                    <a target="_blank" href="https://open.spotify.com/user/lzx7pb5mnpd5dd47m99carpk9?si=664bbc8ce7c74a69"> <ReactSVG src={socialMediaIcons.spotify} /></a>
                    {easterEgg > 10 && (<a target="_blank" href="https://twitter.com/tttexera"> <ReactSVG src={socialMediaIcons.twitter} /></a>)}
                    <a onClick={() => handleOpen()}>
                        <ReactSVG src={socialMediaIcons.discord} />
                    </a>
                </div>
                <Dialog
                    open={isModalOpen}
                >
                    <DialogTitle
                        style={{
                            fontFamily: 'Poppins',
                            backgroundColor: '#FAFAFA',
                        }}
                    >
                        {"Add me!"}
                    </DialogTitle>
                    <DialogContent
                        style={{
                            backgroundColor: '#FAFAFA',
                        }}>
                        <DialogContentText style={{
                            fontFamily: 'Poppins',
                            color: '#000'
                        }}>
                            Click to copy my user!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions
                        style={{
                            backgroundColor: '#FAFAFA',
                        }}>
                        <Button onClick={() => handleClose()}
                            style={{
                                fontFamily: 'Poppins',
                                color: '#000',
                                textDecoration: 'none',
                            }}>
                            close
                        </Button>
                        <Button onClick={() => handleClose()}>
                            <CopyToClipboard text="jao5626">
                                <a href="https://discord.com/channels/@me"
                                    target="_blank"
                                    style={{
                                        fontFamily: 'Poppins',
                                        color: '#000',
                                        textDecoration: 'none',
                                    }}>Copy</a>
                            </CopyToClipboard>
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}