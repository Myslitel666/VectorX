//React Import
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTheme } from '@mui/material';

//MyComponents Import
import Header from '../../../../../Common/Header/Header';
import { useUserContext } from '../../../../../../Context/UserContext';
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
import AdminPanelIcon from './AdminPanelIcon';
import MyButton from '../../../../../Common/User Interface/MyButton';

const AdminPanel: React.FC = () => {
    //Элементы для навигации
    const navigate = useNavigate();
    const location = useLocation();

    //Работа с контекстом пользователя
    const { getUser } = useUserContext();
    const user = getUser();

    //Работа с контекстом цветовой темы
    const { getColorFromLabel } = useColorLabel('green');
    const theme = useTheme();
    const AdminPanelIconColor = theme.palette.background.default;
    //const borderBoxColor = theme.palette.action.disabled;

    // Состояние для хранения id пользователя
    const [userIds, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const wsUrl = process.env.REACT_APP_WS_URL as string;

    const connectWebSocket = () => {
        const url = `${wsUrl}/admin/update`;
        const newSocket = new WebSocket(url);

        newSocket.onopen = () => {
            console.log('WebSocket connected');
            newSocket.send(userIds.toString());
        };
    };

    const handleButtonClick = () => {
        connectWebSocket();
    };

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
                    width: '63%',
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
                        marginTop: '2rem'
                    }}
                >
                    <TextField
                        size ='small'
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        sx = {{
                            marginLeft: '1rem',
                            marginRight: '1rem'
                        }}
                    />
                    <Button 
                        //variant="contained" 
                        sx = {{
                            fontSize: '2rem',
                            width: '8.5rem',
                            height: '2.5rem',
                            marginRight: '1rem',
                            transition: 'color 1s ease'
                        }}
                    >
                        Filter
                    </Button>
                </Box>
                <Box 
                    display='none' // В любой момент можно отобразить строку для быстрого ввода id'шников в целях тестирования Web Socket Manager'а
                    sx = {{
                        marginTop: '2rem'
                    }}
                >
                    <TextField
                        label="User IDs"
                        variant="outlined"
                        value={userIds}
                        onChange={(e) => setUserId(e.target.value)}
                        fullWidth
                        sx = {{
                            marginLeft: '1rem',
                            marginRight: '1rem'
                        }}
                    />
                    <MyButton 
                        variant="contained" 
                        onClick={handleButtonClick}
                        sx = {{
                            width: '15rem',
                            height: '3.4rem',
                            marginRight: '1rem'
                        }}
                    >
                        Send User IDs
                    </MyButton>
                </Box>
            </Box>
        </>
    )
}

export default AdminPanel