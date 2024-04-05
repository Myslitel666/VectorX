//React Import
import React from 'react'

//MUI Import
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

//MyComponents Import
import Header from '../../../../../Common/Header/Header';
import MyImageUploading from './MyImageUploading';
import { useUserContext } from '../../../../../../Context/UserContext'

const Profile: React.FC = () => {
    const { getUser } = useUserContext();
    const user = getUser();

    const MyAccountTypography: React.FC = () => {

        return (
            <>
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
            </>
        )
    }

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

    interface AttributeValueProps  {
        attribute: string;
        value: string;
        sx?: React.CSSProperties | {
            [key: string]: React.CSSProperties | undefined;
        } ; // Либо CSS-правила, либо media-теги
    }

    const AttributeValue: React.FC<AttributeValueProps> = ({ attribute, value, sx }) => {
        return (
            <>
                <Typography
                    color = 'primary'
                    sx = {{
                        ...sx,
                        fontSize: '2.25rem',
                        float: 'left'
                    }}
                >
                    {attribute}
                </Typography>
                <Typography
                    sx = {{
                        ...sx,
                        marginLeft: '1rem',
                        fontSize: '2.25rem',
                        float: 'left'
                    }}
                >
                    {value}
                </Typography>
            </>
        )
    }

    return (
        <>
            <Header />
            <Box display='flex'>
                <Box sx = {{marginLeft:'5rem'}}>
                    <MyAccountTypography />
                    <Avatar/>
                </Box>
                <Box 
                    sx = {{
                        marginLeft: '5rem',
                    }}
                >
                    <AttributeValue 
                        attribute = "Username:"
                        value = {user.username}
                        sx = {{marginTop: '4.75rem',}}
                    />
                </Box>
            </Box>
        </>
    )
}

export default Profile;