//React Import
import { useNavigate } from 'react-router-dom';

//MUI Import
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';

//MyComponents Import
import { useUserContext } from '../../../Context/UserContext';

export default function Settings() {
    const navigate = useNavigate();

    //Работа с контекстом
    const { logoutUser } = useUserContext();

    const handleClick = () => {
        logoutUser();
        navigate('/auth');
    };

    return (
        <>
            <ListItem
                disablePadding
                onClick={handleClick}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Log out'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}