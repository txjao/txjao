import styled from "styled-components";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from "react";

const Container = styled.div`

    display: inline-flex;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;

    .icon{
        transition: transform 0.2s;
    }

    :hover{
        .icon{
            
            transform: rotate(90deg);
        }
    }
`

export function Dropdown() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdown = document.querySelector(".dropdown");

    


    return (
        <Container className="dropdown" >
            Social Medias
            <ChevronRightIcon className="icon" />
            
        </Container>
    );
}