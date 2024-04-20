import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PaletteIcon from '@mui/icons-material/PaletteOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';

//MyComponents Import
import CustomizationModalContent from '../CustomizationModal/CustomizationModalContent';

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isDesktop = useMediaQuery({ minWidth: 600 });
    const { iconColor }: ColorModeContextProps = useColorMode();

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
        <div>
            <Button
                onClick={handleOpen}
            >
                <PaletteIcon
                    sx={{
                        color: iconColor,
                        fontSize: '1.9rem',
                    }}
                />
                <BrushOutlinedIcon
                    sx={{
                        color: iconColor,
                        fontSize: '1.9rem',
                        marginLeft: '-0.6rem',
                        transform: 'rotate(-18deg)'
                    }}
                />
            </Button>
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
        </div>
    );
}