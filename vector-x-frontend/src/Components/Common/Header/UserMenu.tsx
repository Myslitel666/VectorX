//React Import
import * as React from 'react';
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
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import { useTheme } from '@mui/material/styles';

//MyComponents Import
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';
import { useUserContext } from '../../../Context/UserContext';
import AvatarUserMenu from '../Header/AvatarUserMenu';

export default function NestedList() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { iconColor }: ColorModeContextProps = useColorMode();
    const { getUser } = useUserContext();

    const handleClick = () => {
        setOpen(!open);
    };

    const logoutClick = () => {
        navigate('/auth');
        setOpen(!open);
    };

    const profileClick = () => {
        navigate('/profile');
        setOpen(!open);
    };

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
                        onClick={profileClick}
                    >
                        <ListItemIcon >
                            <ConstructionOutlinedIcon sx={{
                                fontSize: '2.1rem',
                                color: iconColor,
                            }}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                    <ListItemButton
                        onClick={logoutClick}
                    >
                            <ListItemIcon >
                            <LogoutIcon sx={{
                                fontSize: '2.1rem',
                                color: iconColor,
                            }}
                            />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}