import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//MyComponents Import
import ReplenishmentFunds from '../ReplenishmentFundsModal/ReplenishmentFunds';
import ReplenishmentFundsModalContent from '../ReplenishmentFundsModal/ModalContent';

export default function ReplenishmentFundsModal() {
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
            <ListItem
                disablePadding
                onClick={handleOpen}
            > 
                <ListItemButton sx = {{
                    marginTop: '-0.25rem',
                }}>
                    <ListItemIcon>
                        <ReplenishmentFunds IconSx={{height: '2.25rem', width: '2.2rem'}} />
                    </ListItemIcon>
                    <ListItemText />
                </ListItemButton>
            </ListItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ReplenishmentFundsModalContent setOpen={setOpen}/>
                </Box>
            </Modal>
        </>
    );
}