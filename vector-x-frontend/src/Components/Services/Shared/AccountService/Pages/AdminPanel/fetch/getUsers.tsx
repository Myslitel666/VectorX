const apiUrl = process.env.REACT_APP_API_URL as string;
const wsUrl = process.env.REACT_APP_WS_URL as string;

export const getUsers = async () => {
    const response = await fetch(`${apiUrl}/api/adminPanel/getUsers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return data.userDtos;
};

export const connectWebSocket = (userIds: string) => {
    const url = `${wsUrl}/admin/update`;
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
        newSocket.send(userIds.toString());
    };
};