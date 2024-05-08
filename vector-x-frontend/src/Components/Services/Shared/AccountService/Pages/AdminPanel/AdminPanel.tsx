//React Import
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UsersDataGrid from './UsersDataGrid';
import { useTheme } from '@mui/material';

//MyComponents Import
import Header from '../../../../../Common/Header/Header';
import { useUserContext } from '../../../../../../Context/UserContext';
import AdminPanelIcon from './AdminPanelIcon';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store
import { setUsers } from '../../../../../../Store/slices/adminPanelSlice'; // Action Import

const AdminPanel: React.FC = () => {
    //Элементы для навигации
    const navigate = useNavigate();
    const location = useLocation();

    //Работа с контекстом пользователя
    const { getUser } = useUserContext();
    const user = getUser();

    //Работа с контекстом цветовой темы
    const theme = useTheme();
    const AdminPanelIconColor = theme.palette.background.default;

    const [username, setUsername] = useState('');

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const users = useSelector((state: RootState) => state.users.users);
    const backupUsers = useSelector((state: RootState) => state.users.backupUsers);

    const handleFilterClick = () => {
        dispatch(setUsers(backupUsers.filter(user => user.username.toLowerCase().includes(username.toLowerCase()))));
    }

    useEffect(() => {
        if (user.userRole !== 'admin') {
            navigate('/profile');
        }
    }, [location.pathname]);

    return (
        <>
            <Header />
            <Box 
                sx = {{
                    margin: 'auto',
                    marginTop: '6rem',
                    alignItems: 'center',
                    width: '36rem',
                    '@media screen and (max-width: 600px)': {
                        width: '95%',
                    },
                }}
            >
                <Box 
                    display='flex'
                    sx = {{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="4.75rem"
                        height="4.75rem"
                        borderRadius="50%"
                        bgcolor="primary.main"
                        sx={{ transition: 'background-color 1s ease',
                            marginRight: '0.66rem'
                        }}
                    >
                        <AdminPanelIcon
                        style = {{
                            marginTop: '-0.35rem',
                            fill: AdminPanelIconColor,
                            height: '3.5rem',
                            width: '3.5rem',
                        }}
                    />
                    </Box>
                    <Typography 
                        sx = {{
                            fontSize: '2.5rem'
                        }}
                    >
                        Admin Panel
                    </Typography>
                </Box>
                <Box 
                    display='flex'
                    sx = {{
                        marginTop: '2rem',
                        marginBottom: '1rem'
                    }}
                >
                    <TextField
                        size ='small'
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                    <Button
                        onClick = {handleFilterClick} 
                        sx = {{
                            fontSize: '2rem',
                            width: '8.5rem',
                            height: '2.5rem',
                            transition: 'color 1s ease'
                        }}
                    >
                        Filter
                    </Button>
                </Box>
                <UsersDataGrid/>
            </Box>
        </>
    )
}

export default AdminPanel