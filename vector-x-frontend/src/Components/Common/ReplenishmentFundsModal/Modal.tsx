//React Import
import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

//MyComponents Import
import ReplenishmentFundsModalContent from './ModalContent';
import { PayNowModalContent } from './ModalContent';
import ReplenishmentFunds from './ReplenishmentFunds';

interface MoneyIconProps {
    IconSx?: React.CSSProperties; // Стили иконки
    BoxSx?: React.CSSProperties; // Стили Box'а
    onClick?: () => void; // Функция onClick
}

interface PayNowModalProps {
    open: boolean; // Prop to receive and control modal visibility
    setOpen: React.Dispatch<React.SetStateAction<boolean>>; // Function to update modal state
  }

const getStyleModal = (isDesktop: boolean) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isDesktop ? 540 : '95%',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: '8px',
        boxShadow: 24,
        p: 4,
    };

    return style;
}

export const PaymentMethodModal: React.FC<MoneyIconProps> = ({ IconSx: iconSx, BoxSx: boxSx, onClick }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isDesktop = useMediaQuery({ minWidth: 600 });

    return (
        <>
            <ReplenishmentFunds 
                onClick = {handleOpen} 
                IconSx = {iconSx}
                BoxSx = {boxSx}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={getStyleModal(isDesktop)}>
                    <ReplenishmentFundsModalContent setOpen = {setOpen}/>
                </Box>
            </Modal>
        </>
    );
}

export const PayNowModal: React.FC<PayNowModalProps> = ({ open, setOpen }) => {
    const handleClose = () => setOpen(false);
    const isDesktop = useMediaQuery({ minWidth: 600 });

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={getStyleModal(isDesktop)}>
                    <PayNowModalContent setOpen = {setOpen}/>
                </Box>
            </Modal>
        </>
    );
}

export default PaymentMethodModal;