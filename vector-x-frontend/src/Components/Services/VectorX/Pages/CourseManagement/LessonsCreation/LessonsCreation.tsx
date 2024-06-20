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
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
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
import { CourseSection } from '../../../Interfaces/interfaces';

//fetch import
import { getCourseSections } from '../CourseSectionsCreation/fetch/courseSectionsCreationFetch';

const LessonsCreation: React.FC = () => {

    //Context
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { getColorFromLabel } = useColorLabel('red');
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

    const isDesktop = useMediaQuery({ minWidth:700 });

    const handleSubjectChange = (selectedValue: string) => {
        setSelectedSection(selectedValue); // обновляем значение выбранного поля
    };

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
        const fetchCourseSections = async () => {
            const courseSections = await getCourseSections(courseId);
            setCourseSections(courseSections);
        };

        fetchCourseSections();
    }, []);

    useEffect(() => {
        setSelectedSection(courseSections[0]?.sectionName)
    }, [courseSections]);

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
                            label='Subject'
                            onFieldSelectionChange={handleSubjectChange} // передаем обновленный обработчик
                            onInputChange={(event, newInputValue) => {
                                if (newInputValue === '') {
                                    handleSubjectChange('');
                                }
                            }}
                            defaultValue={courseSections?.find(option => option.sectionName === selectedSection) || null}
                            sx={{
                                width: '100%'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default LessonsCreation;