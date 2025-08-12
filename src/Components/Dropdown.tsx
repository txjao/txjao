import styled from "styled-components";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { IHeaderTexts } from "../utils/LanguangeUtil";
import { DiscordModal } from "./DiscordModal";

const Container = styled.div<{ theme: string }>`
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    color: ${props => props.theme === 'light' ? '#000' : '#fff'};

    .dropdown-label{
        display: inline-flex;
        transition: color 0.2s ease-in;
    }

    .icon{
        transition: transform 0.2s;
    }

    .dropdown-content{
        height: 36px;    
        width: 140px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        padding: 10px 0;
        background-color: ${props => props.theme === 'light' ? '#FAFAFA' : '#060606'};
        position: absolute;
        top: 60px;
        border-top: 0px;
        }

    .dropdown-content-open{  
        width: 140px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        padding: 10px 0;
        background-color: ${props => props.theme === 'light' ? '#FAFAFA' : '#060606'};
        position: absolute;
        top: 60px;
        border: 1px solid ${props => props.theme === 'light' ? '#000' : '#fff'};
        border-top: 0px;
        height: 80px;
        transition: height 0.5s ease;
    }

    .labels{
        opacity: 0;
        position: relative;
        top: -20px;
        z-index: -1;
    }

    .labels-when-open{
        opacity: 1;
        position: relative;
        top: 0px;
        transition: top 0.5s;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    &:hover{
        .icon{
            transform: rotate(90deg);
        }
    }
`
interface DropdownResumeProps {
  texts: IHeaderTexts
}

export function Dropdown(props: DropdownResumeProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { theme } = useTheme()

  function handleOpen() {
    setIsModalOpen(true)
  }
  function handleClose() {
    setIsModalOpen(false)
  }

  return (
    <Container className="dropdown"
      onMouseEnter={() => {
        setIsDropdownOpen(true)
      }}
      onMouseLeave={() => {
        setIsDropdownOpen(false)
      }}
      theme={theme}
    >
      <div className="dropdown-label">
        <p>{props.texts.contactMe}</p>
        <ChevronRightIcon className="icon" />
      </div>
      <div className={isDropdownOpen ? "dropdown-content-open" : "dropdown-content"}>
        <div className={isDropdownOpen ? "labels-when-open" : "labels"}>
          <a href="mailto: contatojoaovteixeira@gmail.com">E-mail</a>
          <a onClick={() => handleOpen()}>Discord</a>
        </div>
      </div>

      <DiscordModal isModalOpen={isModalOpen} handleClose={handleClose}/>
    </Container >
  );
}
