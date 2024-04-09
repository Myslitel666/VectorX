import React, { useState, useEffect } from 'react';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//My Components Import
import { useUserContext } from '../../../../../../Context/UserContext'
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
import MyButton from '../../../../../../Components/Common/User Interface/MyButton';
import PasswordTextField from '../../../../../Common/User Interface/PasswordTextField' 

export default function RedactModalContent({ selectedField }: { selectedField: string }) {
    const [verification, setVerification] = React.useState(false);
    const [verificationPassword, setVerificationPassword] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(true);
    const [desiredUsername, setDesiredUsername] = useState('');
    const { getUser, updateUsername } = useUserContext();
    const { getColorFromLabel } = useColorLabel('green');
    let user = getUser();

    const onClickVerification = () => {
        setVerification(true);
    };

    const updateFeedbackMessage = (isError: boolean, message: string) => {
        setIsError(isError);
        setFeedbackMessage(message);
    };

    const apiUrl = process.env.REACT_APP_API_URL as string;

    async function redactUsername() {
        const response = await fetch(`${apiUrl}/api/userDataRedaction/redactUsername`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.userId,
                desiredUsername: desiredUsername,
            }),
        });

        const data = await response.json();
        updateFeedbackMessage(data.isError, data.feedbackMessage);

        if (!data.isError) {
            updateUsername(desiredUsername);
        }

    };

    //useEffect(() => {
    //    if (!isError) {
    //        updateUsername(desiredUsername);
    //    }
    //}, [isError])

    let componentToRender;

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
                        label='Username'
                        onChange={(e) => setDesiredUsername(e.target.value)}
                        value={desiredUsername}
                    />
                    </Box>
                    <MyButton
                        variant = 'contained'
                        onClick={redactUsername}
                        disabled={desiredUsername === ''}
                        sx={{
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
                    <PasswordTextField 
                        externalPassword={verificationPassword}
                        setExternalPassword={setVerificationPassword}
                        sx={{ width: '100%' }}
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
            <Typography sx={{
                textAlign: 'left',
                color: isError ? getColorFromLabel('red') : getColorFromLabel('green'),
            }}
            >
                {feedbackMessage}
            </Typography>
            {componentToRender}
        </>
    )
}