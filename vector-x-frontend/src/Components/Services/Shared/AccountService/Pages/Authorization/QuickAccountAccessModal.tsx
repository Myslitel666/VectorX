//React Import
import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

//MyComponents Import
import MyLink from '../../../../../Common/User Interface/MyLink';
import QuikAccpuntAccessModalContent from './QuickAccountAccessModalContent';

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isDesktop = useMediaQuery({ minWidth: 600 });

    const style = {
        maxHeight: '32.5rem',
        overflowY: 'auto', // Включение скроллинга при необходимости
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isDesktop ? 540 : 335,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: '8px',
        boxShadow: 24,
        paddingLeft: '1.75rem',
        paddingRight: '1.75rem',
        paddingBottom: '1.75rem',
    };

    return (
        <>
            <MyLink
                fontSize = '0.75rem'
                marginLeft = '0.25rem'
                onClick = {handleOpen}
            >
                Quick account access
            </MyLink>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <QuikAccpuntAccessModalContent setOpen = {setOpen} />
                </Box>
            </Modal>
        </>
    );
}