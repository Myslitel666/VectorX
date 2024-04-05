//React Import
import React from 'react'

//MUI Import
import Typography from '@mui/material/Typography';

//MyComponents Import
import Header from '../../../../../Common/Header/Header';
import MyImageUploading from '../../../../../Common/User Interface/MyImageUploading';

const Profile: React.FC = () => {

    return (
        <>
            <Header />
            <Typography
                color='primary'
                sx={{
                    marginTop: '4rem',
                    marginLeft: '5rem',
                    fontSize: '3rem'

                }}
            >
                My Account
            </Typography>
            <MyImageUploading />
        </>
    )
}

export default Profile;