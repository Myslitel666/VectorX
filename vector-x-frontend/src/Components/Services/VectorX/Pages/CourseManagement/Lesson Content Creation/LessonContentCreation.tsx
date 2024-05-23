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

const LessonContentCreation: React.FC = () => {

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
        },
        {
            courseManagementMenuId: 2,
            menuOptionTitle: 'My Drafts',
            menuOptionDescription: 'The place for your creative ideas',
            icon: <ArticleIcon />,
        },
        {
            courseManagementMenuId: 3,
            menuOptionTitle: 'Edit Course',
            menuOptionDescription: 'Change and improve your courses',
            icon: <EditIcon />,
        },
        {
            courseManagementMenu: 4,
            menuOptionTitle: 'Checking Tasks',
            menuOptionDescription: 'Check the completed tasks of the learners',
            icon: <CheckCircleIcon />,
        },
        {
            courseManagementMenu: 5,
            menuOptionTitle: 'Course Appeals & Blocks',
            menuOptionDescription: 'Appeal the decision to block the course',
            icon: <GavelIcon />,
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
            <Typography 
                marginTop='4.75rem' 
                fontSize='5rem'
            >
                Lesson Content Creation
            </Typography>
        </>
    );
};

export default LessonContentCreation;