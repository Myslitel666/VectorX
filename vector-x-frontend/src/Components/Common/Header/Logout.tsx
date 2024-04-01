//React Import
import { useNavigate } from 'react-router-dom';

//MUI Import
import LogoutIcon from '@mui/icons-material/Logout';

//MyComponents Import
import Button from '@mui/material/Button';
import MyTypography from '../MyTypography';
import { useUserContext } from '../../../Context/UserContext';

const Logout = () => {
    const navigate = useNavigate();

    //Работа с контекстом
    const { logoutUser } = useUserContext();

    const handleClick = () => {
        logoutUser();
        navigate('/auth');
    };

    return (
        <div>
            <Button onClick={ handleClick }>
                <LogoutIcon sx={{
                    color: 'primary.main',
                    transition: 'background-color 1s ease, color 1s ease, border-color 1s ease',
                }} />
                <MyTypography>
                    Log out
                </MyTypography>
            </Button>
        </div>
    );
};

export default Logout;
