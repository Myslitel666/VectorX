//React Import
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//MyComponents Import
import { useUserContext } from '../../Context/UserContext';

export default function Redirect({ link = '/home' }) {
    const navigate = useNavigate();
    const { getUser } = useUserContext();
    const user = getUser()

    useEffect(() => {
        if (user.userId !== -1) {
            navigate(link);
        }
        else {
            navigate('/auth');
        }
    });

    return (
        <>
        </>
    )
}