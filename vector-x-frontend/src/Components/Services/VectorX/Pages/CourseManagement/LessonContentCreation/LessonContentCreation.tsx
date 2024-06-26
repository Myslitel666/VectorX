//React Import
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PublishIcon from '@mui/icons-material/VerifiedUser';

//MyComponents Import
import { useUserContext } from '../../../../../../Context/UserContext';
import Header from '../../../../../Common/Header/Header';
import CourseInfo from '../CourseInfo';
import SectionAutocomplete from '../LessonsCreation/SectionAutocomplete';
import LessonAutocomplete from './LessonAutocomplete';
import MyInputBase from '../../../../../Common/User Interface/MyInputBase';
import Stepper from '../CourseCreation/Stepper';
import MyButton from '../../../../../Common/User Interface/MyButton';

//interfaces import
import { 
    CourseSection,
    Lesson
} from '../../../Interfaces/interfaces';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store

//fetch import
import { getCourseSections } from '../CourseSectionsCreation/fetch/courseSectionsCreationFetch';
import { getLessons } from '../LessonsCreation/fetch/lessonsCreationFetch';
import { addLessonContent, getLessonById } from './fetch/lessonsContentCreationFetch';

const LessonContentCreation: React.FC = () => {

    //Context
    const navigate = useNavigate();
    const location = useLocation();
    const { getUser, isLogged } = useUserContext();
    const user = getUser();
    const managementCoursesRolesAccess = ['admin', 'teacher', 'moderator']

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const courseId = useSelector((state: RootState) => state.createdCourse.courseId);
    const isOpen = useSelector((state: RootState) => state.courseSection.isOpen);

    //Lesson Content
    const [courseSections, setCourseSections] = useState<CourseSection[]>([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [courseSectionId, setCourseSectionId] = useState(-1);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [lessonId, setLessonId] = useState(-1);
    const [lessonContent, setLessonContent] = useState('');
    const [task, setTask] = useState('');
    const [lesson, setLesson] = useState<Lesson>();

    const isDesktop = useMediaQuery({ minWidth:700 });

    const handleSectionChange = (selectedValue: CourseSection | null) => {
        setSelectedSection(selectedValue?.sectionName || ''); // обновляем значение выбранного поля
        setCourseSectionId(selectedValue?.courseSectionId || -1);
    };

    const handleLessonChange = (selectedValue: Lesson | null) => {
        setSelectedLesson(selectedValue?.lessonName || ''); // обновляем значение выбранного поля
        setLessonId(selectedValue?.lessonId || -1);
    };

    const addContentAndClearFields = (lessonId: number, lessonContent: string, task: string) => {
        if (lessonId !== -1 && lessonId !== undefined) {
            addLessonContent(lessonId, lessonContent, task)
                .then(()=> {
                    fetchLesson(lessonId);
                })
        }
    };

    const fetchLesson = async (lessonId: number) => {
        if (lessonId !== -1 && lessonId !== undefined) {
            await getLessonById(lessonId)
                .then((lesson)=> {
                    setLesson(lesson);
                })
        }
    };

    useEffect(() => {
        const fetchCourseSections = async () => {
            const courseSections = await getCourseSections(courseId);
            setCourseSections(courseSections);
        };

        fetchCourseSections();
    }, []);

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
        setSelectedSection(courseSections[0]?.sectionName);
        setCourseSectionId(courseSections[0]?.courseSectionId);
    }, [courseSections]);

    useEffect(() => {
        const fetchLessons = async () => {
            const lessons = await getLessons(courseSectionId);
            setLessons(lessons);
        };

        fetchLessons();
    }, [courseSectionId]);

    useEffect(() => {
        setSelectedLesson(lessons[0]?.lessonName);
        setLessonId(lessons[0]?.lessonId);
    }, [lessons]);

    useEffect(() => {
        fetchLesson(lessonId);
        //addContentAndClearFields(lessonId, lessonContent, task)
    }, [lessonId]);

    useEffect(() => {
        setLessonContent(lesson?.lessonContent || '');
        setTask(lesson?.lessonTask || '')
    }, [lesson]);

    // useEffect(() => {
    //     addContentAndClearFields(lessonId, lessonContent, task);
    // }, [lessonContent, task]);

    const CourseCreationTypography = (typography: string) => {
        return(
            <Typography
                sx={{
                    fontSize: '2rem',
                    float: 'left',
                    marginRight: '2.2rem',
                    whiteSpace: 'nowrap', // Запрещает перенос текста
                    minWidth: '14rem',
                }}
            >
                {typography}
            </Typography>
        )
    }

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
                    Lesson Content Creation
                </Typography>
                <CourseInfo />
                <Box
                    display='flex'
                    //justifyContent = 'center'
                    marginTop='0.5rem'
                >
                    <Box 
                        marginTop='0.5rem'
                        display = 'flex'
                        alignItems ='center'
                        width = '50%'
                    >
                        <Typography
                            sx = {{
                                whiteSpace: 'nowrap', // Запрещает перенос текста
                                marginRight: '1rem',
                                fontSize: '2rem',
                                marginTop: '-0.33rem'
                            }}
                        >
                            Course Section:
                        </Typography>
                        <Box    
                            sx={{
                                width: '100%',
                                marginRight: '1rem'
                            }}
                            onClick = {()=> {
                                //addContentAndClearFields(lessonId, lessonContent, task);
                            }}
                        >
                            <SectionAutocomplete
                                dropList={courseSections}
                                size='medium'
                                label='Course Section'
                                onFieldSelectionChange={handleSectionChange} // передаем обновленный обработчик
                                defaultValue={courseSections?.find(option => option.sectionName === selectedSection) || null}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>
                    <Box 
                        marginTop='0.5rem'
                        display = 'flex'
                        alignItems ='center'
                        width = '50%'
                    >
                        <Typography
                            sx = {{
                                whiteSpace: 'nowrap', // Запрещает перенос текста
                                marginRight: '1rem',
                                fontSize: '2rem',
                                marginTop: '-0.33rem'
                            }}
                        >
                            Lesson:
                        </Typography>
                        <Box    
                            sx={{
                                width: '100%',
                                //backgroundColor: 'red'
                            }}
                            onClick = {()=> {
                                //addContentAndClearFields(lessonId, lessonContent, task);
                                //console.log('Я отработал')
                            }}
                        >
                            <LessonAutocomplete
                                dropList={lessons}
                                size='medium'
                                label='Course Section'
                                onFieldSelectionChange={handleLessonChange} // передаем обновленный обработчик
                                defaultValue={lessons?.find(option => option.lessonName === selectedLesson) || null}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box 
                    display = 'flex'
                    marginTop='1.12rem'
                >
                    {isDesktop && 
                        CourseCreationTypography('Lesson Content:')
                    }
                    <MyInputBase
                        multiline
                        rows={15}
                        placeholder='Lesson Content'
                        value={lessonContent}
                        style={{
                            width: '100%',
                            padding: '0.75rem'
                        }}
                        onChange={(e) => setLessonContent(e.target.value)}
                        maxLength={50000}
                        onBlur={()=> {
                            addContentAndClearFields(lessonId, lessonContent, task);
                        }}
                    />
                </Box>
                <Box 
                    display = 'flex'
                    marginTop='1.12rem'
                    marginBottom='1.05rem'
                >
                    {isDesktop && 
                        CourseCreationTypography('Task:')
                    }
                    <MyInputBase
                        multiline
                        rows={5}
                        placeholder='Task'
                        value={task}
                        style={{
                            width: '100%',
                            padding: '0.75rem'
                        }}
                        onChange={(e) => setTask(e.target.value)}
                        maxLength={5000}
                        onBlur={()=> {
                            addContentAndClearFields(lessonId, lessonContent, task);
                        }}
                    />
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
                        onClick = {() => {
                            addContentAndClearFields(lessonId, lessonContent, task);
                            navigate('/course-management/lessons-creation');
                        }}
                    >
                        <Typography>
                            Last Step
                        </Typography>
                    </MyButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', // Для вертикального центрирования
                        marginTop: '0.5rem'
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
                            }
                        }
                    >
                        <PublishIcon />
                        <Typography>
                            Publish
                        </Typography>
                    </MyButton>
                </Box>
                <Box marginTop='1.75rem'>
                    <Stepper step={3}/>
                </Box>
            </Box>
        </>
    );
};

export default LessonContentCreation;