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

        position: absolute;
        top: 100px;
        transition: ease-in 0.5s;
    }

    :hover{
        .icon{
            transform: rotate(90deg);
        }
        .dropdown-content{
            transform: ease-in 0.5s;
        }
    }
`

export function Dropdown() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    return (
        <Container className="dropdown" 
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
        >
            <div className="dropdown-label">
                Social Medias
                <ChevronRightIcon className="icon" />
            </div>
            {isDropdownOpen == true && (
                <div className="dropdown-content">
                    <a href="#">Facebook</a>
                </div>
            )}
        </Container>
    );
}