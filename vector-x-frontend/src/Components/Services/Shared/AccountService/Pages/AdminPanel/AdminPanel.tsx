//React Import
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
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
    const [userId, setUserId] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null); 
    const wsUrl = process.env.REACT_APP_WS_URL as string;

    const connectWebSocket = () => {
        const url = `${wsUrl}/admin/update`;
        const newSocket = new WebSocket(url);
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('WebSocket connected');
            newSocket.send(userId.toString());
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
            <Typography variant="h5">
                Admin Panel
            </Typography>
            <TextField
                label="User ID"
                variant="outlined"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleButtonClick}>Send User ID</Button>
        </>
    )
}

export default AdminPanel