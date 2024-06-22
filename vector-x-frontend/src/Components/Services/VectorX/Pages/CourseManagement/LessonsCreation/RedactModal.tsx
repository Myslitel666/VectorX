//React Import
import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//MyComponents Import
import MyButton from '../../../../../Common/User Interface/MyButton';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateIsOpen, updateLesson, updateLessonId } from '../../../../../../Store/slices/lessonsSlice';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store

//fetch import
import { redactLesson } from './fetch/lessonsCreationFetch';

//interfaces import
import { Lesson } from '../../../Interfaces/interfaces';

export default function BasicModal() {
    const isDesktop = useMediaQuery({ minWidth: 600 });

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const lessonId = useSelector((state: RootState) => state.lesson.lessonId);
    const lesson = useSelector((state: RootState) => state.lesson.lesson);
    const isOpen = useSelector((state: RootState) => state.lesson.isOpen);

    const handleClose = () => dispatch(updateIsOpen(false));

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
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography 
                        style={{ 
                            fontWeight: 'bold'
                        }}
                    >
                        Course Section Editor Form
                    </Typography>
                    <Box 
                        display = {isDesktop ? 'flex' : 'flow'}
                        marginTop='1rem'
                    >
                        <Typography
                            sx = {isDesktop ? {} : {marginBottom: '0.5rem'}}
                        >
                            Enter a new section name:
                        </Typography>
                        <TextField 
                            sx = {{width: '100%'}}
                            label='Course section name'
                            onChange={(e) => dispatch(updateLesson(e.target.value))}
                            value={lesson}
                        />
                    </Box>
                    <MyButton
                        variant = 'contained'
                        onClick={
                            () => {
                                redactLesson(lessonId, lesson.toString());
                                dispatch(updateIsOpen(false))
                            }
                        }
                        disabled={lesson === ''}
                        sx={{
                            marginTop: '1rem',
                            width: '100%',
                            height: '3.4rem'
                        }}
                    >
                        Save
                    </MyButton>
                </Box>
            </Modal>
        </>
    );
}