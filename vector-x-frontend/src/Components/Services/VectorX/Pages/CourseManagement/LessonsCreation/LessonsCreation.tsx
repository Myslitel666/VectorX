//React Import
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

//MyComponents Import
import { useUserContext } from '../../../../../../Context/UserContext';
import Header from '../../../../../Common/Header/Header';
import CourseInfo from '../CourseInfo';
import MyButton from '../../../../../Common/User Interface/MyButton';
import SectionAutocomplete from './SectionAutocomplete';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store
import { updateCourseSectionId, updateCourseSection, updateIsOpen } from '../../../../../../Store/slices/courseSectionSlice';

//interfaces import
import { Lesson } from '../../../Interfaces/interfaces';
import { CourseSection } from '../../../Interfaces/interfaces';

//fetch import
import { 
    getLessons, 
    createLesson,
    deleteLesson,
} from '../LessonsCreation/fetch/lessonsCreationFetch';

import { getCourseSections } from '../CourseSectionsCreation/fetch/courseSectionsCreationFetch';

const LessonsCreation: React.FC = () => {

    //Context
    const navigate = useNavigate();
    const location = useLocation();
    const { getUser, isLogged } = useUserContext();

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const courseId = useSelector((state: RootState) => state.createdCourse.courseId);
    const isOpen = useSelector((state: RootState) => state.courseSection.isOpen);

    const user = getUser();
    const managementCoursesRolesAccess = ['admin', 'teacher', 'moderator']
    const [courseSections, setCourseSections] = useState<CourseSection[]>([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [courseSectionId, setCourseSectionId] = useState(-1);
    const [lessons, setLessons] = useState<Lesson[]>([]);

    const isDesktop = useMediaQuery({ minWidth:700 });

    const handleSectionChange = (selectedValue: CourseSection | null) => {
        setSelectedSection(selectedValue?.sectionName || ''); // обновляем значение выбранного поля
        setCourseSectionId(selectedValue?.courseSectionId || -1);
    };

    const fetchЫLessons = async () => {
        const lessons = await getLessons(courseSectionId);
        console.log(lessons)
        setLessons(lessons);
    };

    //Блокировка доступа к управлению курсами для непривилегированных пользователей
    useEffect(() => {
        if (!managementCoursesRolesAccess.includes(user.userRole)) {
            navigate('/profile');
        }
        if (!isLogged()) {
            navigate('/auth');
        }
        if (courseId === -1) {
            navigate('/course-management/course-creation');
        }
    }, [location.pathname, user.isBlocked]);

    useEffect(() => {
        const fetchCourseSections = async () => {
            const courseSections = await getCourseSections(courseId);
            setCourseSections(courseSections);
        };

        fetchCourseSections();
    }, []);

    useEffect(() => {
        fetchЫLessons();
    }, [courseSectionId, isOpen]);

    useEffect(() => {
        setSelectedSection(courseSections[0]?.sectionName)
        setCourseSectionId(courseSections[0]?.courseSectionId)
    }, [courseSections]);

    useEffect(() => {
    }, [lessons]);

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
                    marginLeft = {isDesktop ? '0rem' : '0.25rem'}
                >
                    Lessons Creation
                </Typography>
                <CourseInfo />
                <Box
                    display = 'flex'
                    justifyContent = 'center'
                >
                    <Box 
                        marginTop='0.5rem'
                        display = 'flex'
                        alignItems ='center'
                        width = '55%'
                    >
                        <Typography
                            sx = {{
                                whiteSpace: 'nowrap', // Запрещает перенос текста
                                marginRight: '1rem',
                                fontSize: '2rem',
                                marginTop: '-0.33rem'
                            }}
                        >
                            Course Sections:
                        </Typography>
                        <SectionAutocomplete
                            dropList={courseSections}
                            size='medium'
                            label='Course Section'
                            onFieldSelectionChange={handleSectionChange} // передаем обновленный обработчик
                            onInputChange={(event, newInputValue) => {
                            }}
                            defaultValue={courseSections?.find(option => option.sectionName === selectedSection) || null}
                            sx={{
                                width: '100%'
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    display='flex'
                    justifyContent='center'
                    marginTop='1rem'
                >
                    <Box display='flex'>
                        <Box>
                            {lessons.map((lesson, index) => (
                                <Box 
                                    key={lesson.lessonId} 
                                    display = 'flex'
                                    alignItems='center'
                                    marginBottom='0.75rem'
                                    height={isDesktop ? '3.12rem' : '2.6rem'}
                                >
                                    <MyButton 
                                        variant='contained'
                                        sx = {{
                                            minWidth: isDesktop ? '3.25rem' : '2.66rem',
                                            padding: isDesktop ? '0.75rem' : '0.5rem',
                                            marginRight: isDesktop ? '0.75rem' : '0.5rem'
                                        }}
                                    >
                                        <ArrowUpwardIcon/>
                                    </MyButton>
                                    <MyButton 
                                        variant='contained'
                                        sx = {{
                                            minWidth: isDesktop ? '3.25rem' : '2.66rem',
                                            padding: isDesktop ? '0.75rem' : '0.5rem',
                                            marginRight: isDesktop ? '0.75rem' : '0.5rem'
                                        }}
                                    >
                                        <ArrowDownwardIcon/>
                                    </MyButton>
                                    <Typography 
                                        fontSize={isDesktop ? '1.2rem' : '1.05rem'}
                                    >
                                        <strong>Lesson {index + 1}. </strong> {lesson.lessonName}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Box>
                            {lessons.map((lesson, index) => (
                                <Box 
                                    key={lesson.lessonId} 
                                    display = 'flex'
                                    alignItems='center'
                                    marginBottom='0.75rem'
                                >
                                    <MyButton 
                                        variant='contained'
                                        sx = {{
                                            minWidth: isDesktop ? '3.25rem' : '2.66rem',
                                            padding: isDesktop ? '0.75rem' : '0.5rem',
                                            marginLeft: isDesktop ? '0.75rem' : '0.5rem',
                                            marginRight: isDesktop ? '0.75rem' : '0.5rem'
                                        }}
                                        onClick = {
                                            () => {
                                                dispatch(updateCourseSectionId(lesson.courseSectionId));
                                                dispatch(updateCourseSection(lesson.lessonName));
                                                dispatch(updateIsOpen(true));
                                            }
                                        }
                                    >
                                        <EditIcon/>
                                    </MyButton>
                                    <MyButton 
                                        variant = 'contained'
                                        color = 'error'
                                        sx = {{
                                            minWidth: isDesktop ? '3.25rem' : '2.66rem',
                                            padding: isDesktop ? '0.75rem' : '0.5rem',
                                        }}
                                        onClick = {() => {
                                            if (lessons.length > 1) {
                                                deleteLesson(lesson.lessonId)
                                                    .then(() => {
                                                        fetchЫLessons();
                                                    })
                                                }
                                            }
                                        }
                                    >
                                        <CloseIcon/>
                                    </MyButton>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', // Для вертикального центрирования
                    }}
                >
                    <MyButton 
                        variant='contained'
                        sx = {{
                            height: '3rem',
                            width: '25.8rem'
                        }}
                        onClick = {
                            () => {
                                createLesson(courseSectionId)        
                                    .then(() => {
                                        fetchЫLessons();
                                    })
                            }
                        }
                    >
                        <AddIcon />
                        <Typography>
                            Add Lesson
                        </Typography>
                    </MyButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', // Для вертикального центрирования
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem',
                    }}
                >
                    <MyButton 
                        variant='contained'
                        sx = {{
                            height: '3rem',
                            minWidth: '12.5rem',
                            marginRight: '0.75rem',
                        }}
                        onClick = {() => {
                            navigate('/course-management/course-sections-creation');
                        }}
                    >
                        Last Step
                    </MyButton>
                    <MyButton 
                        variant='contained'
                        sx = {{
                            height: '3rem',
                            minWidth: '12.5rem',
                        }}
                        onClick = {() => {
                            //navigate('/course-management/lessons-creation');
                        }}
                    >
                        Next Step
                    </MyButton>
                </Box>
            </Box>
        </>
    );
};

export default LessonsCreation;