//React Import
import React from 'react'

//MUI Import
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

//MyComponents Import
import Header from '../../../../../Common/Header/Header';
import MyImageUploading from '../../../../../Common/User Interface/MyImageUploading';

const Profile: React.FC = () => {
    const Avatar: React.FC = () => {
        const theme = useTheme();
        const DefaultAvatarColor = theme.palette.action.disabled;

        return (
            <>
                <Box 
                    sx={{ 
                        //width: '25rem',
                        //height: '25rem',
                        //overflow: 'hidden',
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