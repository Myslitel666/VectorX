//React Import
import { useNavigate } from 'react-router-dom';

//MUI Import
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';

//MyComponents Import
import { useUserContext } from '../../../Context/UserContext';

export default function Settings() {
    const navigate = useNavigate();

    //Работа с контекстом
    const { logoutUser } = useUserContext();

    const handleClickSignUp = () => {
        logoutUser();
        navigate('/reg');
    };

    const handleClickSignIn = () => {
        logoutUser();
        navigate('/auth');
    };

    return (
        <>
            <ListItem
                disablePadding
                onClick={handleClickSignIn}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <LockOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Sign in'} />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                onClick={handleClickSignUp}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <VpnKeyIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Sign up'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}