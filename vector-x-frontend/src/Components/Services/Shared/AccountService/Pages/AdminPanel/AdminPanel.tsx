//React Import
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import UsersDataGrid from './UsersDataGrid';
import { useTheme } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

//MyComponents Import
import Header from '../../../../../Common/Header/Header';
import { useUserContext } from '../../../../../../Context/UserContext';
import AdminPanelIcon from './AdminPanelIcon';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store
import { setUsers, setBackupUsers } from '../../../../../../Store/slices/adminPanelSlice'; // Action Import

//fetch import
import { getUsers } from './fetch/adminPanelFetch';

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
    const [rotation, setRotation] = useState(0);

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const backupUsers = useSelector((state: RootState) => state.users.backupUsers);

    const handleFilterClick = () => {
        dispatch(setUsers(backupUsers.filter(user => user.username.toLowerCase().includes(username.toLowerCase()))));
    }

    const handleClickRefresh = () => {
        getUsers()
        .then(data => {
            dispatch(setUsers(data));
            dispatch(setBackupUsers(data));
        })
        setRotation(rotation + 360);
    }

    //Блокировка доступа к админ. панели для всех, кроме администратора
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
                        marginBottom: '1rem',
                        alignItems: 'center'
                    }}
                >
                    <Tooltip title="Refresh">
                        <RefreshIcon
                            onClick={handleClickRefresh}
                            sx={{
                                marginRight: '0.5rem',
                                fontSize: '1.85rem',
                                color: 'primary.main',
                                transform: `rotate(${rotation}deg)`,
                                transition: 'transform 0.6s ease, color 1s ease',
                                cursor: 'pointer'
                            }}
                        />
                    </Tooltip>
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