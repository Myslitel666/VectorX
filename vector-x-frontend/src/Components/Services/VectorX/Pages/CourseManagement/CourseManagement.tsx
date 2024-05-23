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
import { ColorModeContextProps, useColorMode } from '../../../../../Context/ColorModeContext';
import { useColorLabel } from '../../../../../Context/UseColorLabel';
import { useUserContext } from '../../../../../Context/UserContext';
import Header from '../../../../Common/Header/Header';

const CourseManagement: React.FC = () => {

    //Context
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { getColorFromLabel } = useColorLabel('red');
    const navigate = useNavigate();
    const location = useLocation();
    const { getUser, isLogged } = useUserContext();
    const user = getUser();
    const managementCoursesRolesAccess = ['admin', 'teacher', 'moderator']

    const isDesktop = useMediaQuery({ minWidth:700 });

    const courseManagementMenu = [
        {
            courseManagementMenuId: 1,
            menuOptionTitle: 'Create Course',
            menuOptionDescription: 'Start creating your course today!',
            icon: <AddBoxIcon />,
            page: '/course-management/course-creation'
        },
        {
            courseManagementMenuId: 2,
            menuOptionTitle: 'My Drafts',
            menuOptionDescription: 'The place for your creative ideas',
            icon: <ArticleIcon />,
            page: '/course-management/course-creation'
        },
        {
            courseManagementMenuId: 3,
            menuOptionTitle: 'Edit Course',
            menuOptionDescription: 'Change and improve your courses',
            icon: <EditIcon />,
            page: '/course-management/course-creation'
        },
        {
            courseManagementMenu: 4,
            menuOptionTitle: 'Checking Tasks',
            menuOptionDescription: 'Check the completed tasks of the learners',
            icon: <CheckCircleIcon />,
            page: '/course-management/course-creation'
        },
        {
            courseManagementMenu: 5,
            menuOptionTitle: 'Course Appeals & Blocks',
            menuOptionDescription: 'Appeal the decision to block the course',
            icon: <GavelIcon />,
            page: '/course-management/course-creation'
        },
    ]

        // Создаем массив состояний для каждого Box'а
        const [, setIsHoveredBox] = useState(Array(courseManagementMenu.length).fill(false));

    //Блокировка доступа к управлению курсами для непривилегированных пользователей
    useEffect(() => {
        if (!managementCoursesRolesAccess.includes(user.userRole)) {
            navigate('/profile');
        }
        if (!isLogged()) {
            navigate('/auth');
        }
    }, [location.pathname, user.isBlocked]);

    return (
        <>
            <Header />
            <Box 
                padding = {isDesktop ? '4.75rem 4.75rem 0rem 4.75rem' : '4.75rem 1.25rem 0rem 1.5rem'}
            >
                <Typography 
                    fontSize='2.25rem'
                    marginBottom='0.25rem'
                >
                    Course Management
                </Typography>
                <Typography 
                    fontSize='1rem'
                    sx = {{
                        textIndent: '1.5rem' //Абзац
                    }}
                >
                    Вы можете легко создавать, редактировать и публиковать свои курсы, а также — 
                    выставлять оценки своим ученикам. Если у Вас возникнут сомнения по поводу 
                    блокировки курсов, Вы всегда имеете возможность обжаловать данное решение. 
                    Давайте создадим обучающие курсы вместе!
                </Typography>
                <Box
                    display="flex"
                    flexWrap="wrap"
                >
                    {courseManagementMenu.map((menuOption, index) => (
                        <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            width= {isDesktop ? "calc(50% - 0.5rem)" : '100%'}
                            height="7.5rem"
                            marginRight = {isDesktop ? (index % 2 === 1) ? '0' : '0.88rem' : '0rem'}
                            marginTop='0.88rem'
                            border="1px solid"
                            borderColor={themeMode === 'light' ? '#cecece' : '#4d4d4d'}
                            borderRadius="0.6rem"
                            padding="1.25rem"
                            sx={{
                                cursor: 'pointer',
                                position: 'relative',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                            onMouseEnter={() => {
                                setIsHoveredBox(prevState =>
                                    prevState.map((value, i) => (i === index ? true : value))
                                );
                            }}
                            onMouseLeave={() => {
                                setIsHoveredBox(prevState =>
                                    prevState.map((value, i) => (i === index ? false : value))
                                );
                            }}
                            onClick={() => {
                                navigate(menuOption.page);
                            }}
                        >
                            {React.cloneElement(menuOption.icon, {
                                style: {
                                    width: '3rem',
                                    height: '3rem',
                                    color: theme.palette.primary.main, // Пример использования темы
                                    transition: 'color 1s ease'
                                },
                            })}
                            <Box
                                sx={{
                                    marginLeft: '1.25rem',
                                }}
                            >
                                <Typography style={{ fontWeight: 'bold' }}>
                                    {menuOption.menuOptionTitle}
                                </Typography>
                                <Typography>
                                    {menuOption.menuOptionDescription}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default CourseManagement;