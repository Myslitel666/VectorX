//React Import
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArticleIcon from '@mui/icons-material/Article';
import GavelIcon from '@mui/icons-material/Gavel';

//MyComponents Import
import { ColorModeContextProps, useColorMode } from '../../../../../../Context/ColorModeContext';
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
import { useUserContext } from '../../../../../../Context/UserContext';
import Header from '../../../../../Common/Header/Header';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store

//fetch import
import { getSubjects, getCourseById } from '../CourseCreation/fetch/courseManagementFetch';

//interfaces import
import { 
    Course, 
    SubjectDirectory, 
    CourseSection 
} from '../../../Interfaces/interfaces';

//Utils Import
import { addImagePrefix } from '../../../../../../Utils/ImageUtils';
import { getCourseSections } from './fetch/courseSectionsCreationFetch';

const CourseSectionsCreation: React.FC = () => {

    //Context
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { getColorFromLabel } = useColorLabel('red');
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

    const [course, setCourse] = useState<Course>();

    const isDesktop = useMediaQuery({ minWidth:700 });

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

        const fetchSubjects = async () => {
            const subjects = await getSubjects();
            setSubjects(subjects);
        };

        const fetchЫSections = async () => {
            const sections = await getCourseSections(courseId);
            setSections(sections);
        };

        fetchSubjects();
        fetchЫSections();
    }, [courseId]);

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
                    <Box>
                        {sections.map((section, index) => (
                            <Typography 
                                key={section.courseSectionId} 
                                fontSize={isDesktop ? '1.38rem' : '1.05rem'}
                            >
                                <strong>Section {index + 1}. </strong> {section.sectionName}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default CourseSectionsCreation;