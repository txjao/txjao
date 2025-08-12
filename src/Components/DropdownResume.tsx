import styled from "styled-components";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react";
import resume from '/src/assets/documents/Curriculo.pdf';
import toast from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";
import { IHeaderTexts } from "../utils/LanguangeUtil";

const Container = styled.div<{ theme: string }>`
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    color: ${props => props.theme === 'light' ? '#000' : '#FAFAFA'};

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

export function DropdownResume(props: DropdownResumeProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { theme } = useTheme()

  const notify = () => toast('Page is not available yet', {
    icon: '🚧',
    duration: 3000,
    position: "top-right",
    style: {
      fontFamily: 'Poppins',
    }
  })

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
        <p>{props.texts.me}</p>
        <ChevronRightIcon className="icon" />
      </div>
      <div className={isDropdownOpen ? "dropdown-content-open" : "dropdown-content"}>
        <div className={isDropdownOpen ? "labels-when-open" : "labels"}>
          <a href={resume} target="_blank" rel="noopener">{props.texts.meItens.resume}</a>
          <a onClick={() => notify()}>{props.texts.meItens.certificates}</a>
        </div>
      </div>
    </Container>
  );
}
