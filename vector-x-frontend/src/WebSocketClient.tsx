import React, { useState, useEffect } from 'react';

const WebSocketClient: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null); // ��������� ���������� socket

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:5115/ws/echo');

        newSocket.onopen = () => {
            console.log('WebSocket connected');
            if (newSocket) { // ���������, ���������� �� �����
                // ��������, � ��� ���� �����-�� ���������, ������� �� ������ ��������� �������
                const messageToSend = 'Hello from client!';
                newSocket.send(messageToSend);
            }
        };

        newSocket.onmessage = (event) => {
            setMessage(event.data);
        };

        setSocket(newSocket); // ������������� ����� ����� � ���������
    }, []);

    return (
        <div>
            <h1>WebSocket Client</h1>
            <p>Message from server: {message}</p>
        </div>
    );
};

export default WebSocketClient;
