//React Import
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
import CustomizationModalContent from '../CustomizationModal/CustomizationModalContent'
import CustomizationIcon from '../CustomizationModal/CustomizationIcon';

export default function Customization() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isDesktop = useMediaQuery({ minWidth: 600 });

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isDesktop ? 540 : 335,
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
                    marginBottom: '-0.25rem',
                    marginTop: '-1.2rem',
                }}>
                    <ListItemIcon>
                        <CustomizationIcon sx={{ fontSize: '1.5rem' }} />
                    </ListItemIcon>
                    <ListItemText primary={'Customization'} />
                </ListItemButton>
            </ListItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CustomizationModalContent />
                </Box>
            </Modal>
        </>
    );
}