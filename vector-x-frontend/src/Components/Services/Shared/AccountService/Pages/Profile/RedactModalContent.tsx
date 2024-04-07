import React, { useState, useEffect } from 'react';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//My Components Import
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
import MyButton from '../../../../../../Components/Common/User Interface/MyButton';
import PasswordTextField from '../../../../../Common/User Interface/PasswordTextField' 

export default function RedactModalContent({ selectedField }: { selectedField: string }) {

    let componentToRender;
    const [verification, setVerification] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const onClickVerification = () => {
        setVerification(true);
    };

    switch (selectedField) {
        case 'Username':
            componentToRender = (
                <>
                    <Box 
                        display='flex'
                        marginTop='1rem'
                    >
                    <Typography >
                        Enter a new username:
                    </Typography>
                    <TextField 
                        sx = {{width: '100%'}}
                        label = 'Username'
                    />
                    </Box>
                    <MyButton
                        variant='contained'
                        sx = {{
                            marginTop: '1rem',
                            width: '100%',
                            height: '3.4rem'
                        }}
                    >
                        Save
                    </MyButton>
                </>
            );
            break;
        case 'Password':
            componentToRender = (
                <>
                    <Box 
                        display='flex'
                        marginTop='1rem'
                    >
                    <Typography>
                        Enter your password:
                    </Typography>
                    <TextField 
                        sx = {{width: '100%'}}
                        label = 'Password'
                    />
                    </Box>
                    <MyButton
                        variant = 'contained'
                        onClick = {onClickVerification}
                        sx = {{
                            marginTop: '1rem',
                            width: '100%',
                            height: '3.4rem'
                        }}
                    >
                        Verification
                    </MyButton>
                </>
            );
            break;
        // Добавьте дополнительные варианты по мере необходимости
        default:
            componentToRender = null;
    }

    if (verification)
    {
        componentToRender = (
            <>
                    <Box 
                        display='flex'
                        marginTop='1rem'
                    >
                    <Typography>
                        Enter a new password:
                    </Typography>
                    <PasswordTextField 
                        externalPassword = {password}
                        setExternalPassword={setPassword}
                        sx = {{width: '100%'}}
                    />
                    </Box>
                    <Box 
                        display='flex'
                        marginTop='1rem'
                    >
                    <Typography>
                        Confirm the password:
                    </Typography>
                    <PasswordTextField 
                        externalPassword = {confirmPassword}
                        setExternalPassword={setConfirmPassword}
                        sx = {{width: '100%'}}
                    />
                    </Box>
                    <MyButton
                        variant = 'contained'
                        onClick = {onClickVerification}
                        sx = {{
                            marginTop: '1rem',
                            width: '100%',
                            height: '3.4rem'
                        }}
                    >
                        Save password
                    </MyButton>
            </>
        );
    }

    return (
        <>
            <Typography variant="h6" component="h2">
                User data editing form
            </Typography>
            {componentToRender}
        </>
    )
}