//React Import
import React from 'react'

//MUI Import
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

//MyComponents Import
import Header from '../../../../../Common/Header/Header';
import MyImageUploading from './MyImageUploading';

const Profile: React.FC = () => {
    const Avatar: React.FC = () => {
        const theme = useTheme();
        const DefaultAvatarColor = theme.palette.action.disabled;

        return (
            <>
                <Box 
                    sx={{ 
                        marginTop: '0.5rem',
                    }}
                >
                    <MyImageUploading />
                </Box>
            </>
        )
    }

    return (
        <>
            <Header />
            <Box sx = {{marginLeft:'5rem'}}>
                <Typography
                    color='primary'
                    sx={{
                        marginTop: '4rem',
                        fontSize: '3rem',
                        overflow: 'hidden'
                    }}
                >
                    My Account
                </Typography>
                <Avatar/>
            </Box>
        </>
    )
}

export default Profile;