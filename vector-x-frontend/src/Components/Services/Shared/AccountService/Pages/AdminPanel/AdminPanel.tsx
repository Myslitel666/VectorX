//React Import
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//MyComponents Import
import { useUserContext } from '../../../../../../Context/UserContext';

const AdminPanel: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //Работа с контекстом пользователя
    const { getUser } = useUserContext();
    const user = getUser();

    // Состояние для хранения id пользователя
    const [userIds, setUserId] = useState('');
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
            <Box 
                sx = {{
                    margin: 'auto',
                    marginTop: '1rem',
                    alignItems: 'center',
                    width: '50%',
                }}
            >
                <Typography variant="h5"
                    sx = {{
                        margin: 'auto',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}
                >
                    Admin Panel
                </Typography>
                <Box display='flex'>
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
                    <Button 
                        variant="contained" 
                        onClick={handleButtonClick}
                        sx = {{
                            width: '15rem',
                            height: '3.4rem',
                            marginRight: '1rem'
                        }}
                    >
                        Send User IDs
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default AdminPanel