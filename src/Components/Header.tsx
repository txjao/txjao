import styled from "styled-components";
import { Toggle } from "./Toggle";
import { Dropdown } from "./Dropdown";
import { DropdownResume } from "./DropdownResume";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Hamburger from 'hamburger-react'
import { motion } from "framer-motion"
import resume from '../assets/documents/Curriculo.pdf';
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { enHeader, enMobileHeaderMenu, IHeaderTexts, IMobileHeaderMenuTexts, ptHeader, ptMobileHeaderMenu } from "../utils/LanguangeUtil";
import { LanguageToggle } from "./LanguageToggle";

const BaseContainer = styled.header<{ theme: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme === 'light' ? '#FAFAFA' : '#060606'};
  height: 96px;

  a {
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
    color: ${props => props.theme === 'light' ? '#000' : '#fff'};
    cursor: pointer;
    transition: color 0.2s ease-in;
  }

  img {
    max-width: 48px;
  }

  a::after {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background: ${props => props.theme === 'light' ? '#000' : '#fff'};
    transition: width 0.2s ease-in;
  }

  a:hover::after {
    width: 100%;
  }

  .lang-toggle{
    width: 20px
  }
`;

const ContainerDesktop = styled(BaseContainer)`
  padding: 0 60px;
`;

const ContainerMobile = styled(BaseContainer)`
  padding: 0 32px;

  .menu-container {
    display: flex;
    flex-direction: column;
  }

  .menu {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 10px;
  }

  .menu-content {
    width: 144px;
    display: flex;
    flex-direction: column;
    text-align: right;
    position: absolute;
    right: 0;
    background-color: ${props => props.theme === 'light' ? '#FAFAFA' : '#060606'};
    border: 1px solid ${props => props.theme === 'light' ? '#000' : '#fff'};
    border-top: none;
    padding: 12px;
    gap: 8px;
  }

  .menu-content-closed {
    position: absolute;
    right: 0;
  }

  .menu-buttons{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const BREAKPOINT = 768;

export function Header() {
  const [isOpen, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { theme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const notify = () => toast('This feature is not available yet', {
    icon: '🚧',
    duration: 3000,
    position: "top-right",
    style: {
      fontFamily: 'Poppins',
    }
  });

  const isDesktop = windowWidth >= BREAKPOINT;

  const mobileMenuTexts: IMobileHeaderMenuTexts = language === 'EN' ? enMobileHeaderMenu : ptMobileHeaderMenu

  function handleHeadertexts(): IHeaderTexts {
    return language === 'EN' ? enHeader : ptHeader
  }

  return (
    <>
      {isDesktop ? (
        <ContainerDesktop theme={theme}>
          <Toggle />
          <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/"
            target="_blank"
            rel="noopener noreferrer">
            Linkedin
          </a>
          <a href="https://github.com/txjao"
            target="_blank"
            rel="noopener noreferrer">
            Github
          </a>
          <img src="/favicon.png" alt="Logo" />
          <Dropdown texts={handleHeadertexts()} />
          <DropdownResume texts={handleHeadertexts()} />
          <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
        </ContainerDesktop>
      ) : (
        <ContainerMobile theme={theme}>
          <img src="/favicon.png" alt="Logo" />

          <div className="menu-container">
            <Hamburger
              toggled={isOpen}
              size={20}
              toggle={setOpen}
              color={theme === 'light' ? '#000' : '#fff'} />
            <div className="menu">
              <motion.nav
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                className={isOpen ? "menu-content" : "menu-content-closed"}
              >
                {isOpen && (
                  <>
                    <a href="mailto:contatojoaovteixeira@gmail.com">E-mail</a>
                    <a href="https://github.com/txjao"
                      target="_blank"
                      rel="noopener noreferrer">
                      Github
                    </a>
                    <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/"
                      target="_blank"
                      rel="noopener noreferrer">
                      Linkedin
                    </a>
                    <a href={resume}
                      target="_blank"
                      rel="noopener noreferrer">
                      {mobileMenuTexts?.resume}
                    </a>
                    <a onClick={notify}>{mobileMenuTexts?.certificates}</a>
                    <div className="menu-buttons">
                      <Toggle />
                      <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
                    </div>
                  </>
                )}
              </motion.nav>
            </div>
          </div>
        </ContainerMobile>
      )}
    </>
  );
}
