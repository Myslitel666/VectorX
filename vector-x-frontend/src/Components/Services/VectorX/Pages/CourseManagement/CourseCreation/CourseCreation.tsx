//React Import
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//MyComponents Import
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
import { useUserContext } from '../../../../../../Context/UserContext';
import Header from '../../../../../Common/Header/Header';
import CourseImageUploading from './CourseImageUploading';
import MyInputBase from '../../../../../Common/User Interface/MyInputBase';
import MyButton from '../../../../../Common/User Interface/MyButton';
import Stepper from './Stepper';
import SubjectAutocomplete from './SubjectAutocomplete';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateCourseAvatar, updateCourseId } from '../../../../../../Store/slices/courseCreationSlice';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store

//fetch import
import { getSubjects, createCourse, getCourseById, redactCourse } from './fetch/courseManagementFetch';

//interfaces import
import { Course, SubjectDirectory } from '../../../Interfaces/interfaces';
import { FeedbackMessage } from '../../../../../../Classes/FeedbackMessage';

//Utils Import
import { addImagePrefix } from '../../../../../../Utils/ImageUtils';

const CourseCreation: React.FC = () => {

    //Context
    const { getColorFromLabel } = useColorLabel('red');
    const navigate = useNavigate();
    const location = useLocation();
    const { getUser, isLogged } = useUserContext();
    const user = getUser();
    const managementCoursesRolesAccess = ['admin', 'teacher', 'moderator']

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const courseId = useSelector((state: RootState) => state.createdCourse.courseId);
    const avatar = useSelector((state: RootState) => state.createdCourse.avatar);

    //Course
    const [draft, setDraft] = useState<Course>();
    const [subjects, setSubjects] = useState<SubjectDirectory[]>([]);
    const [courseName, setCourseName] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage>(new FeedbackMessage('', true));

    const isDesktop = useMediaQuery({ minWidth:900 });

    const handleSubjectChange = (selectedValue: string) => {
        setSelectedSubject(selectedValue); // обновляем значение выбранного поля
    };

    const handleNextClick = () => {
        if (courseName === '') {
            setFeedbackMessage(new FeedbackMessage('✗Enter the "Course Name"', true));
        }
        else if (!selectedSubject) {
            setFeedbackMessage(new FeedbackMessage('✗Enter the "Subject"', true));
        }
        else if (description === '') {
            setFeedbackMessage(new FeedbackMessage('✗Enter the "Description"', true));
        }
        else if (price === '') {
            setFeedbackMessage(new FeedbackMessage('✗Enter the "Price"', true));
        }
        else if (avatar === '') {
            setFeedbackMessage(new FeedbackMessage('✗Upload the course avatar', true));
        }
        else {
            const subject = subjects.find(subject => subject.subjectName === selectedSubject)
            const subjectId = (subject) ? subject.subjectId : -1
    
            const course: Course = {
                courseId: courseId,
                authorId: user.userId,
                subjectId: subjectId,
                title: courseName,
                courseAvatar: avatar,
                description: description,
                price: parseInt(price)
            }
            
            if (courseId === -1) {
                createCourse(course);
            }
            else { 
                redactCourse(course);
            }
        }
    }
    
    const CourseCreationTypography = (typography: string) => {
        return(
            <Typography
                sx={{
                    fontSize: '2rem',
                    float: 'left',
                    marginLeft: isDesktop ? '2rem' : '0.25rem',
                    marginRight: '0.5rem',
                    whiteSpace: 'nowrap', // Запрещает перенос текста
                    minWidth: '14rem',
                    '@media screen and (max-width:1200px)': {
                        fontSize: '1.75rem',
                        minWidth: '12.25rem',
                    },
                    '@media screen and (max-width:1000px)': {
                        fontSize: '1.5rem',
                        minWidth: '10.5rem',
                    },
                }}
            >
                {typography}
            </Typography>
        )
    }

    //Блокировка доступа к управлению курсами для непривилегированных пользователей
    useEffect(() => {
        if (!managementCoursesRolesAccess.includes(user.userRole)) {
            navigate('/profile');
        }
        if (!isLogged()) {
            navigate('/auth');
        }
    }, [location.pathname, user.isBlocked]);

    useEffect(() => {
        const fetchSubjects = async () => {
            const subjects = await getSubjects();
            setSubjects(subjects);
        };

        fetchSubjects();

        if (courseId != -1) {
            getCourseById(courseId)
                .then(draft => {
                    setDraft(draft);
                });
        }
    }, []);

    useEffect(() => {
        if (draft) {
            setCourseName(draft?.title);
            setSelectedSubject(subjects.find(subject => subject.subjectId === draft?.subjectId)?.subjectName || '');
            setDescription(draft?.description);
            setPrice(draft?.price.toString() || '');
            dispatch(updateCourseAvatar(addImagePrefix(draft?.courseAvatar || '')));
        }
    }, [draft, subjects]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFeedbackMessage(new FeedbackMessage('', true));
        }, 1750);

        return () => clearTimeout(timer);
    }, [feedbackMessage]);


    return (
        <>
            <Header />
            <Box 
                padding = '4.75rem 4.75rem 0rem 4.75rem'
                sx = {{
                    '@media screen and (max-width:1100px)': {
                        padding: '4.75rem 0.5rem 0rem 0.5rem'
                    },
                }}
            >
                <Typography 
                    fontSize='2.25rem'
                    marginBottom='0.25rem'
                    marginLeft = {isDesktop ? '0rem' : '0.25rem'}
                >
                    Course Creation
                </Typography>
                <Box
                    display={isDesktop ? 'flex' : 'flow'}
                >
                    <Box>
                        <Box 
                            sx={{ 
                                marginTop: '0.5rem',
                            }}
                        >
                            <CourseImageUploading />
                        </Box>
                    </Box>
                    <Box width = '100%'>
                        <Typography 
                            sx={{
                                position: 'absolute',
                                top: isDesktop ? '5.8rem' : '63.4rem',
                                left: isDesktop ? '24.8rem' : '0.5rem',
                                fontSize: isDesktop ? '1.25rem' : '0.9rem',
                                color: feedbackMessage.isError ? getColorFromLabel('red') : getColorFromLabel('green'),
                            }}
                        >
                            {feedbackMessage.feedbackMessage}
                        </Typography>
                        <Box 
                            display = 'flex'
                            marginTop = {isDesktop ? '0.75rem' : '9.45rem'}
                        >
                            {isDesktop && 
                                CourseCreationTypography('Course Name:')
                            }
                            <TextField
                                id="outlined-basic"
                                label={isDesktop ? 'Course' : 'Course Name'}
                                variant="outlined"
                                onChange={(e) => setCourseName(e.target.value)}
                                value={courseName}
                                sx={{
                                    width: '100%'
                                }}
                            />
                        </Box>
                        <Box 
                            display = 'flex'
                            marginTop = '0.75rem'
                        >
                            {isDesktop && 
                                CourseCreationTypography('Subject:')
                            }
                            <SubjectAutocomplete
                                dropList={subjects}
                                size='medium'
                                label='Subject'
                                onFieldSelectionChange={handleSubjectChange} // передаем обновленный обработчик
                                onInputChange={(event, newInputValue) => {
                                    if (newInputValue === '') {
                                      handleSubjectChange('');
                                    }
                                  }}
                                defaultValue={subjects?.find(option => option.subjectName === selectedSubject) || null}
                                sx={{
                                    width: '100%'
                                }}
                            />
                        </Box>
                        <Box 
                            display = 'flex'
                            marginTop = '0.75rem'
                        >
                            {isDesktop && 
                                CourseCreationTypography('Description:')
                            }
                            <MyInputBase
                                multiline
                                rows={8.5}
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={5000}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem'
                                }}
                            />
                        </Box>
                        <Box 
                            display = 'flex'
                            marginTop = '0.75rem'
                            marginBottom = '0.75rem'
                        >
                            {isDesktop && 
                                CourseCreationTypography('Price:')
                            }
                            <TextField
                                id="outlined-basic"
                                label='Price'
                                variant="outlined"
                                value={price}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const symbolsFilter = /^[0-9]*$/; // Регулярное выражение, которое разрешает только цифры
                                    if (symbolsFilter.test(value)) {
                                        setPrice(value);
                                    }
                                }}
                                sx={{
                                    width: '49%',
                                    marginRight: '0.5rem'
                                }}
                            />
                            <MyButton
                                variant='contained'
                                sx = {{
                                    width: '49%'
                                }}
                                onClick = {handleNextClick}
                            >
                                Next Step
                            </MyButton>
                        </Box>
                    </Box>
                </Box>
                <Box marginTop='1.75rem'>
                    <Stepper step={0}/>
                </Box>
            </Box>
        </>
    );
};

export default CourseCreation;