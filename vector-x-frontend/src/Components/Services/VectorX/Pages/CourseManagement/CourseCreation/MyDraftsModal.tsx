//React Import
import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

//MyComponents Import
import MyLink from '../../../../../Common/User Interface/MyLink';
import MyDraftsModalContent from './MyDraftsModalContent';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDrafts } from '../../../../../../Store/slices/courseCreationSlice';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store

export default function MyDraftsModal() {
    const handleOpen = () => dispatch(setOpenDrafts(true));
    const handleClose = () => dispatch(setOpenDrafts(false));
    const isDesktop = useMediaQuery({ minWidth: 600 });

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const openDrafts = useSelector((state: RootState) => state.createdCourse.openDrafts);

    const style = {
        maxHeight: '32.5rem',
        overflowY: 'auto', // Включение скроллинга при необходимости
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isDesktop ? 540 : '95%',
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
            <Modal
                open={openDrafts}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MyDraftsModalContent />
                </Box>
            </Modal>
        </>
    );
}