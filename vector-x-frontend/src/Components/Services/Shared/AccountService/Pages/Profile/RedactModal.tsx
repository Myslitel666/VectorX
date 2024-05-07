//React Import
import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

//MyComponents Import
import RedactModalContent from './RedactModalContent'
import MyButton from '../../../../../Common/User Interface/MyButton';

export default function BasicModal({ selectedField }: { selectedField: string }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isDesktop = useMediaQuery({ minWidth: 600 });

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

    return (
        <>
            <MyButton
                variant='contained'
                onClick={handleOpen}
                sx = {{
                    width: '40%',
                    height: '3.5rem',
                    
                }}
            >
                Redact
            </MyButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <RedactModalContent selectedField = {selectedField}/>
                </Box>
            </Modal>
        </>
    );
}