//React Import
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//MUI Import
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import ShieldIcon from '@mui/icons-material/Shield';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import SchoolIcon from '@mui/icons-material/School';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ForumIcon from '@mui/icons-material/Forum';

import BarChartIcon from '@mui/icons-material/BarChart';
import { useTheme } from '@mui/material/styles';

//MyComponents Import
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';
import { useUserContext } from '../../../Context/UserContext';
import AvatarUserMenu from '../Header/AvatarUserMenu';

export default function UserMenu() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { iconColor }: ColorModeContextProps = useColorMode();
    const { getUser } = useUserContext();

    const handleClick = () => {
        setOpen(!open);
    };

    const navigateToPage = (link: string) => {
        navigate(link);
        setOpen(!open);
    }

    const theme = useTheme();
    const user = getUser();

    return (
        <List
            sx={{
                position: 'fixed',
                width: '15rem',
                top: '-0.1rem',
                left: 'auto',
                bgcolor: `${theme.palette.action.disabledBackground}`,
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton
                onClick={handleClick}
                sx={{
                    height: '3.15rem',
                    color: theme.palette.text.primary
                }}
            >
                <ListItemIcon>
                    <AvatarUserMenu />
                </ListItemIcon>
                <ListItemText
                    primary = { user.username }
                    sx={{
                        marginLeft: '-1rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: theme.palette.text.primary
                    }}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                >
                    <ListItemButton
                        onClick={() => navigateToPage('/profile')}
                    >
                        <ListItemIcon >
                            <ConstructionOutlinedIcon sx={{
                                fontSize: '2.1rem',
                                color: iconColor,
                            }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Profile"
                            sx={{
                                color: theme.palette.text.primary
                            }}
                        />
                    </ListItemButton>
                    {
                        (user.userRole === 'admin') && 
                            <ListItemButton
                                onClick={() => navigateToPage('/admin-panel')}
                            >
                                <ListItemIcon >
                                    <ShieldIcon sx={{
                                        fontSize: '2.1rem',
                                        color: iconColor,
                                    }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Admin Panel"
                                    sx={{
                                        color: theme.palette.text.primary
                                    }}
                                />
                            </ListItemButton> 
                    }
                    {
                        (user.userRole === 'author' || user.userRole === 'admin' || user.userRole === 'teacher' || user.userRole === 'moderator') && 
                            <ListItemButton
                            onClick={() => navigateToPage('/course-management')}
                            >
                                <ListItemIcon >
                                    <SchoolIcon sx={{
                                        fontSize: '2.1rem',
                                        color: iconColor,
                                    }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Course Management"
                                    sx={{
                                        color: theme.palette.text.primary
                                    }}
                                />
                            </ListItemButton> 
                    }
                    <ListItemButton
                        onClick={() => navigateToPage('/taking-courses')}
                    >
                        <ListItemIcon >
                            <PlayCircleIcon sx={{
                                fontSize: '2.1rem',
                                color: iconColor,
                            }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Taking Courses"
                            sx={{
                                color: theme.palette.text.primary
                            }}
                        />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => navigateToPage('/educational-programs')}
                    >
                        <ListItemIcon >
                            <EditCalendarIcon sx={{
                                fontSize: '2.1rem',
                                color: iconColor,
                            }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Educational Programs"
                            sx={{
                                color: theme.palette.text.primary
                            }}
                        />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => navigateToPage('/chat-forum')}
                    >
                        <ListItemIcon >
                            <ForumIcon sx={{
                                fontSize: '2.1rem',
                                color: iconColor,
                            }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Chat Forum"
                            sx={{
                                color: theme.palette.text.primary
                            }}
                        />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => navigateToPage('/learning-analytics')}
                    >
                        <ListItemIcon>
                            <BarChartIcon sx={{
                                fontSize: '2.1rem',
                                color: iconColor,
                            }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Learning Analytics"
                            sx={{
                                color: theme.palette.text.primary
                            }}
                        />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => navigateToPage('/auth')}
                    >
                        <ListItemIcon >
                            <LogoutIcon sx={{
                                fontSize: '2.1rem',
                                color: iconColor,
                            }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Log Out"
                            sx={{
                                color: theme.palette.text.primary
                            }}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}