﻿//MUI Import
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

//MyComponents Import
import { useUserContext } from '../../../Context/UserContext';
import Logo from '../Header/Logo';
import ServiceName from '../Header/ServiceName';
import Customization from '../Drawer/Customization';
import ReplenishmentFunds from './ReplenishmentFunds';
import Profile from './ListItemsDrawer';
import { 
    AdminPanel, 
    CourseManagement,
    TakingCourses,
    EducationalPrograms,
    ChatForum,
    LearningAnalytics,
    Logout
} from './ListItemsDrawer';
import Login from '../Drawer/Login';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface ContentProps {
    serviceName?: string;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ serviceName = 'Vector X' }) {
    //Работа с контекстом
    const { isLogged, getUser } = useUserContext();
    const theme = useTheme();
    const user = getUser();

    const [open, setOpen] = React.useState(false);
    const managementCoursesRolesAccess = ['author', 'admin', 'teacher', 'moderator'];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'fixed' }}>
            <CssBaseline />
            <AppBar
                position="absolute"
                open={open}
                elevation={0}
                sx={{
                    backgroundColor: `${theme.palette.action.disabledBackground}`,
                }}
            >
                <Toolbar
                    style={{
                        height: '4.1rem',
                    }}
                >
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 0, ...(open && { display: 'none' }) }}
                        style={{
                            color: `${theme.palette.text.primary}` // Предупреждаем исчезновение иконки
                        }}
                    >
                        <MenuIcon />
                        </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{
                position: 'absolute',
                zIndex: 1100,
                display: 'flex', // Горизонтальное направление flex
                alignItems: 'center', // Выравнивание по центру,
                marginLeft: '56px',
                marginTop: '0.25rem'
            }}>
                <Logo />
                <ServiceName content={serviceName} />
            </Box>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {serviceName === 'Vector X' && <ReplenishmentFunds />}
                </List>
                <List>
                    <Customization />
                </List>
                <Divider />
                <List>
                    {isLogged() ?
                        <>
                            <Profile />
                            {(user.userRole === 'admin') && <AdminPanel />}
                            {managementCoursesRolesAccess.includes(user.userRole) && <CourseManagement />}
                            <TakingCourses />
                            <EducationalPrograms />
                            <ChatForum />
                            <LearningAnalytics />
                            <Logout />
                        </>
                        :
                        <Login />
                    } 
                </List>
            </Drawer>
        </Box>
    );
}