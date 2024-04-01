//React Import
import { useNavigate } from 'react-router-dom';

//MyComponents Import
import MyButton from '../MyButton';
import { useUserContext } from '../../../Context/UserContext';
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';

const Login = () => {
    const { themeMode }: ColorModeContextProps = useColorMode();
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
        <div>
            <MyButton
                variant='contained'
                onClick={handleClickSignUp}
                style={{ width: '6rem' }}
            >
                Sign up
            </MyButton>
            <MyButton
                onClick={handleClickSignIn}
                sx={{
                    marginLeft: '0.35rem',
                    borderColor: themeMode === 'light' ? 'black' : '#555555',
                    ':hover': {
                        borderColor: themeMode === 'light' ? 'black' : '#555555'
                    }
                }}
                style={{
                    width: '6rem',
                }}
            >
                Sign in
            </MyButton>
        </div>
    );
};

export default Login;
