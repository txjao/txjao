import styled from "styled-components";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from "react";

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;

    .dropdown-label{
        display: inline-flex;
    }

    .icon{
        transition: transform 0.2s;
    }

    .dropdown-content{
        height: 40px;    
        width: 140px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        padding: 10px 0;
        background-color: #FAFAFA;
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
        background-color: #FAFAFA;
        position: absolute;
        top: 60px;
        border: solid 1px #000;
        border-top: 0px;
        height: 80px;
        transition: height 0.5s ease;
        transition: border 0.5s ease,;
    }

    .labels{
        opacity: 0;
        position: relative;
        top: -20px;
    }

    .labels-when-open{
        opacity: 1;
        position: relative;
        top: 0px;
        transition: opacity 0.5s;
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

export function Dropdown() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const aux = document.querySelector(".dropdown-content-open")

    return (
        <Container className="dropdown"
            onMouseEnter={() => {
                setIsDropdownOpen(true)
            }}
            onMouseLeave={() => {
                setIsDropdownOpen(false)
            }}
        >
            <div className="dropdown-label">
                Contact Me
                <ChevronRightIcon className="icon" />
            </div>
            <div className={isDropdownOpen ? "dropdown-content-open" : "dropdown-content"}>
                <div className={isDropdownOpen ? "labels-when-open" : "labels"}>
                    <a href="https://wa.me/31995985251" target="_blank" rel="noopener">Whatsapp</a>
                    <a onClick={() => alert("navegar para a página do email")}>Email</a>
                </div>
            </div>
        </Container>
    );
}