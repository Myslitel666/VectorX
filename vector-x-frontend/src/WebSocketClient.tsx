import React, { useState, useEffect } from 'react';

const WebSocketClient: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null); // ��������� ���������� socket

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:5115/ws');

        newSocket.onopen = () => {
            console.log('WebSocket connected');
        };

        newSocket.onmessage = (event) => {
            setMessage(event.data);
        };

        setSocket(newSocket); // ������������� ����� ����� � ���������

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket) { // ���������, ���������� �� �����
            // ��������, � ��� ���� �����-�� ���������, ������� �� ������ ��������� �������
            const messageToSend = 'Hello from client!';
            socket.send(messageToSend);
        }
    };

    return (
        <div>
            <h1>WebSocket Client</h1>
            <p>Message from server: {message}</p>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default WebSocketClient;
