//React Import
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import Typography from '@mui/material/Typography';

//MyComponents Import
import { useUserContext } from '../../../../../../Context/UserContext';

const AdminPanel: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //работа с контекстом
    const { getUser } = useUserContext();
    const user = getUser();

    useEffect(() => {
        if (user.userRole !== 'admin') {
            navigate('/profile');
        }
    }, [location.pathname]);

    return (
        <>
            <Typography>
                Admin Panel
            </Typography>  
        </>
    )
}

export default AdminPanel