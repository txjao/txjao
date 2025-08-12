import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import { useLanguage } from "../contexts/LanguageContext";
import { enModalTexts, IModalTexts, ptModalTexts } from "../utils/LanguangeUtil";

interface ModalProps {
  isModalOpen: boolean,
  handleClose: () => void
}

export function DiscordModal(props: ModalProps) {
  const { language } = useLanguage()

   const modalTexts: IModalTexts = language === "EN" ? enModalTexts : ptModalTexts
  

  return (
    <Dialog
      open={props.isModalOpen}
    >
      <DialogTitle
        style={{
          fontFamily: 'Poppins',
          backgroundColor: '#FAFAFA',
        }}
      >
        {modalTexts.title}
      </DialogTitle>
      <DialogContent
        style={{
          backgroundColor: '#FAFAFA',
        }}>
        <DialogContentText style={{
          fontFamily: 'Poppins',
          color: '#000'
        }}>
          {modalTexts.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        style={{
          backgroundColor: '#FAFAFA',
        }}>
        <Button onClick={() => props.handleClose()}
          style={{
            fontFamily: 'Poppins',
            color: '#000',
            textDecoration: 'none',
          }}>
          {modalTexts.closeButton}
        </Button>
        <Button onClick={() => props.handleClose()}>
          <CopyToClipboard text="jao5626">
            <a href="https://discord.com/channels/@me"
              target="_blank"
              style={{
                fontFamily: 'Poppins',
                color: '#000',
                textDecoration: 'none',
              }}>{modalTexts.addButton}</a>
          </CopyToClipboard>
        </Button>
      </DialogActions>
    </Dialog>
  )
}
