//React Import
import { useNavigate } from 'react-router-dom';

//MUI Import
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShieldIcon from '@mui/icons-material/Shield';

export default function AdminPanel() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/admin-panel');
    };

    return (
        <>
            <ListItem
                disablePadding
                onClick={handleClick}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ShieldIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Admin Panel'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}