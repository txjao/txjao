import styled from "styled-components";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";

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
        height: 36px;    
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

export function Dropdown() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

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
        >
            <div className="dropdown-label">
                Contact Me
                <ChevronRightIcon className="icon" />
            </div>
            <div className={isDropdownOpen ? "dropdown-content-open" : "dropdown-content"}>
                <div className={isDropdownOpen ? "labels-when-open" : "labels"}>
                    <a href="mailto: contatojoaovteixeira@gmail.com">E-mail</a>
                    <a onClick={() => handleOpen()}>Discord</a>
                </div>
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
        </Container >
    );
}