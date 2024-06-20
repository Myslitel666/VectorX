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
import { updateIsOpen, updateCourseSection, updateCourseSectionId } from '../../../../../../Store/slices/courseSectionSlice';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store

//fetch import
import { redactCourseSection } from './fetch/courseSectionsCreationFetch';

//interfaces import
import { CourseSection } from '../../../Interfaces/interfaces';

export default function BasicModal() {
    const isDesktop = useMediaQuery({ minWidth: 600 });

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const courseSectionId = useSelector((state: RootState) => state.courseSection.courseSectionId);
    const courseSection = useSelector((state: RootState) => state.courseSection.courseSection);
    const isOpen = useSelector((state: RootState) => state.courseSection.isOpen);

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
                            onChange={(e) => dispatch(updateCourseSection(e.target.value))}
                            value={courseSection}
                        />
                    </Box>
                    <MyButton
                        variant = 'contained'
                        onClick={
                            () => {
                                redactCourseSection(courseSectionId, courseSection.toString());
                                dispatch(updateIsOpen(false))
                            }
                        }
                        disabled={courseSection === ''}
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