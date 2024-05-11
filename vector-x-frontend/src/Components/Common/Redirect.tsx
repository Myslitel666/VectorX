//React Import
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Redirect({ link = '/home' }) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(link);
    });

    return (
        <>
        </>
    )
}