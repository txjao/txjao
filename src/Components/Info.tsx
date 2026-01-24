import styled from "styled-components";
import { Lettering } from "./Lettering";
import { ReactSVG } from 'react-svg'
import socialMediaIcons from '../utils/SocialMediaIcons';
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { enInfo, ptInfo } from "../consts/Languange";
import { DiscordModal } from "./DiscordModal";

const Container = styled.div<{ theme: string }>`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 80px;
    width: auto; 
    max-width: 80%;
    height: auto;

    img{
      width: 134px;
      height: 144px;
      border-radius: 50%;
      margin-right: 16px;
      object-fit: cover;
    }

    p{
        font-family: 'Poppins', sans-serif;
        color: ${props => props.theme === 'light' ? '#000' : '#fff'};
        font-size: 24px;
        transition: color 0.2s ease-in;
    }

    .icons{
        display: flex;
        gap: 24px;
        cursor: pointer;
        a{
          height: 24px;
          width: 32px;
          position: relative;
          top: 0px;
          transition: top 0.1s;
        }
        a:hover{
          top: -2px;
        }
        .icon{
          width: 100%;     
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
            max-width: 120px;
            border-radius: 5%;
        }
    }

    @media (max-width: 375px) {
        a{
            width: 24px;
        }
        .icons{
            width: 100%;
        }
        img{
            object-fit: cover;
            max-width: 104px;
            border-radius: 5%;
        }
    }
`

const CompanyLink = styled.a<{ theme: string }>`
  color: ${props => props.theme === 'light' ? '#000' : '#fff'};
  text-decoration: none;
  transition: all 0.2s ease-in;

  &:hover {
    color: #ea7100;
  }
`;


export function Info() {
  const [easterEgg, setEasterEgg] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { theme } = useTheme();
  const { language } = useLanguage();

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

  function handleLanguage(): string {
    return language === "EN" ? enInfo : ptInfo
  }

  return (
    <>
      <Container theme={theme}>
        <div className="lettering-box">
          <img src='/eu.jpg' onClick={handleEasterEgg} />
          <Lettering />
        </div>
        <div>
          <p>
            {handleLanguage()}
            {' '}
            <CompanyLink
              theme={theme}
              href="https://inter.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Inter
            </CompanyLink>

          </p>
        </div>
        <div className="icons">

          <a target="_blank" href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/">
            <ReactSVG className="icon"
              src={theme === "light" ? socialMediaIcons.linkedin : socialMediaIcons.linkedinDark} />
          </a>

          <a target="_blank" href="https://github.com/txjao">
            <ReactSVG className="icon"
              src={theme === "light" ? socialMediaIcons.github : socialMediaIcons.githubDark} />
          </a>

          <a target="_blank" href="https://www.instagram.com/tx.jsx/">
            <ReactSVG className="icon"
              src={theme === "light" ? socialMediaIcons.instagram : socialMediaIcons.instagramDark} />
          </a>

          <a target="_blank" href="https://open.spotify.com/user/lzx7pb5mnpd5dd47m99carpk9?si=664bbc8ce7c74a69">
            <ReactSVG className="icon"
              src={theme === "light" ? socialMediaIcons.spotify : socialMediaIcons.spotifyDark} />
          </a>

          {easterEgg > 10 && (<a target="_blank" href="https://twitter.com/tttexera">
            <ReactSVG className="icon"
              src={theme === "light" ? socialMediaIcons.twitter : socialMediaIcons.twitterDark} />
          </a>)}

          <a onClick={() => handleOpen()}>
            <ReactSVG className="icon"
              src={theme === "light" ? socialMediaIcons.discord : socialMediaIcons.discordDark} />
          </a>
        </div>
        <DiscordModal isModalOpen={isModalOpen} handleClose={handleClose} />
      </Container>
    </>
  );
}
