//React Import
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

//MyComponents Import
import { ColorModeContextProps, useColorMode } from '../../../../../../Context/ColorModeContext';
import { useUserContext } from '../../../../../../Context/UserContext';
import Header from '../../../../../Common/Header/Header';
import MyButton from '../../../../../Common/User Interface/MyButton';
import RedactModal from './RedactModal';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store
import { updateCourseSectionId, updateCourseSection, updateIsOpen } from '../../../../../../Store/slices/courseSectionSlice';

//fetch import
import { 
    getSubjects, 
    getCourseById,
} from '../CourseCreation/fetch/courseManagementFetch';

import { 
    getCourseSections, 
    createCourseSection,
    deleteCourseSection,
    redactCourseSection
} from './fetch/courseSectionsCreationFetch';

//interfaces import
import { 
    Course, 
    SubjectDirectory, 
    CourseSection 
} from '../../../Interfaces/interfaces';

//Utils Import
import { addImagePrefix } from '../../../../../../Utils/ImageUtils';

const CourseSectionsCreation: React.FC = () => {

    //Context
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const navigate = useNavigate();
    const location = useLocation();
    const { getUser, isLogged } = useUserContext();
    const user = getUser();
    const managementCoursesRolesAccess = ['admin', 'teacher', 'moderator']
    const [subjects, setSubjects] = useState<SubjectDirectory[]>([]);
    const [sections, setSections] = useState<CourseSection[]>([]);

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const courseId = useSelector((state: RootState) => state.createdCourse.courseId);
    const isOpen = useSelector((state: RootState) => state.courseSection.isOpen);

    const [course, setCourse] = useState<Course>();

    const isDesktop = useMediaQuery({ minWidth:700 });

    const fetchSubjects = async () => {
        const subjects = await getSubjects();
        setSubjects(subjects);
    };

    const fetchЫSections = async () => {
        const sections = await getCourseSections(courseId);
        setSections(sections);
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
        if (courseId != -1) {
            getCourseById(courseId)
                .then(course => {
                    setCourse(course);
                });
        }

        fetchSubjects();
        fetchЫSections();

        console.log(isOpen)
    }, [courseId, isOpen]);

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
                    Course Sections Creation
                </Typography>
                <Box 
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    marginTop = '0.75rem'
                >
                    <img 
                        src = {addImagePrefix(course?.courseAvatar || '')} 
                        alt="Course Avatar"
                        style = {{
                            width: '10rem',
                            height: '10rem'
                        }}
                    />
                    <Box
                        marginLeft = '1rem'

                    >
                        <Typography fontSize={isDesktop ? '1.38rem' : '1.05rem'} marginBottom='0.25rem'>
                            <strong>Course Name:</strong> {course && course.title.length > 100 ? `${course.title.substring(0, 100)}...` : course?.title}
                        </Typography>
                        <Typography fontSize = {isDesktop ? '1.38rem' : '1.05rem'}>
                            <strong>Subject:</strong> {course && subjects.find(subject => subject.subjectId === course.subjectId)?.subjectName}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display='flex'
                    justifyContent='center'
                    marginTop='1rem'
                >
                    <Box display='flex'>
                        <Box>
                            {sections.map((section, index) => (
                                <Box 
                                    key={section.courseSectionId} 
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
                                        <strong>Section {index + 1}. </strong> {section.sectionName}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Box>
                            {sections.map((section, index) => (
                                <Box 
                                    key={section.courseSectionId} 
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
                                                dispatch(updateCourseSectionId(section.courseSectionId));
                                                dispatch(updateCourseSection(section.sectionName));
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
                                            if (sections.length > 1) {
                                                deleteCourseSection(section.courseSectionId)
                                                    .then(() => {
                                                        fetchЫSections();
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
                                createCourseSection(courseId)        
                                    .then(() => {
                                        fetchЫSections();
                                    })
                            }
                        }
                    >
                        <AddIcon />
                        <Typography>
                            Add Course Section
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
                            navigate('/course-management/course-creation');
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
                    >
                        Next Step
                    </MyButton>
                </Box>
            </Box>
            <RedactModal/>
        </>
    );
};

export default CourseSectionsCreation;