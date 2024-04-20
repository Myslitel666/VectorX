//React Import
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';

//MyComponents Import
import AvatarUserMenu from '../Header/AvatarUserMenu'

export default function NestedList() {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!open);
    };

    const logoutClick = () => {
        navigate('/auth');
    };

    const theme = useTheme();

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
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    onClick = { logoutClick }
                >
                    <ListItemButton >
                            <ListItemIcon >
                                <LogoutIcon sx={{ fontSize: '2.1rem' }} />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}