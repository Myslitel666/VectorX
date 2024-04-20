//React Import
import { useNavigate } from 'react-router-dom';

//MUI Import
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';

//MyComponents Import
import { useUserContext } from '../../../Context/UserContext';

export default function Profile() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/profile');
    };

    return (
        <>
            <ListItem
                disablePadding
                onClick={handleClick}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ConstructionOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Profile'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}