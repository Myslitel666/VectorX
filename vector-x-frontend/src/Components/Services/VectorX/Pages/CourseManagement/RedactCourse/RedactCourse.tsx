//React Import
import React, { useEffect } from 'react';

//MUI Import
import { Typography } from '@mui/material';

//MyComponents Import
import { useUserContext } from '../../../../../../Context/UserContext';
import Header from '../../../../../Common/Header/Header';
import Box from '@mui/material/Box';

const RedactCourse: React.FC = () => {
    const { getUser, logoutUser } = useUserContext();
    const user = getUser();

    useEffect(() => {
        if (user.isBlocked) {
            logoutUser();
        }
    }, [user.isBlocked]);

    return (
        <>
            <Header />
            <Box sx={{
                marginTop: '4.75rem',
                marginBottom: '1.75rem'
            }}>
                <Typography fontSize='5rem'>
                    Taking Courses
                </Typography>
            </Box>
        </>
    );
};

export default RedactCourse;