//React Import
import React, { useState } from 'react';

//MUI Import
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import Tooltip from '@mui/material/Tooltip';

//MyComponents Import
import { useHomeContext } from './HomeContext'
import { useUserContext } from '../../../../../Context/UserContext';
import MyInputBase from '../../../../Common/User Interface/MyInputBase';
import MyButton from '../../../../Common/User Interface/MyButton';

const DictionaryEditorForm: React.FC = () => {
    //Работа с контекстом домашней страницы
    const { jargonState, translateState, idState, exampleOfUseState } = useHomeContext();
    const [jargon, setJargon] = jargonState;
    const [translate, setTranslate] = translateState;
    const [id, setId] = idState;
    const [exampleOfUse, setExampleOfUse] = exampleOfUseState;

    //Работа с контекстом пользователя
    const { getUser } = useUserContext();
    const user = getUser();

    const apiUrl = process.env.REACT_APP_API_URL as string;
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const updateFeedbackMessage = (isError: boolean, message: string) => {
        setIsError(isError);
        setFeedbackMessage(message);
    };

    const handleResponse = async (response: Response) => {
        const data = await response.json();
        updateFeedbackMessage(data.isError, data.feedbackMessage);
    };

    async function sendData() {
        if (jargon === '')
        {
            updateFeedbackMessage(true, 'Enter the "Jargon"');
        }
        else if (translate === '') {
            updateFeedbackMessage(true, 'Enter the "Translate"');
        }
        else
        {
            const response = await fetch(`${apiUrl}/api/english-assistant/home/setJargon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.userId,
                    jargonInstance: jargon,
                    translate: translate,
                    exampleOfUse: exampleOfUse
                }),
            });

            handleResponse(response);
        }
    };

    async function modifyData() {
        if (id === '') {
            updateFeedbackMessage(true, 'Enter the "Id"');
        }
        else if (jargon === '') {
            updateFeedbackMessage(true, 'Enter the "Jargon"');
        }
        else if (translate === '') {
            updateFeedbackMessage(true, 'Enter the "Translate"');
        }
        else {
            const response = await fetch(`${apiUrl}/api/english-assistant/home/modifyJargon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.userId,
                    jargonId: id,
                    jargonInstance: jargon,
                    translate: translate,
                    exampleOfUse: exampleOfUse
                }),
            });

            handleResponse(response);
        }
    };

    async function deleteData() {
        if (id === '') {
            updateFeedbackMessage(true, 'Enter the "Id"');
        }
        else {
            const response = await fetch(`${apiUrl}/api/english-assistant/home/deleteJargon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.userId,
                    jargonId: id,
                    jargonInstance: jargon,
                    translate: translate,
                    exampleOfUse: exampleOfUse
                }),
            });

            handleResponse(response);
        }
    };

    const handleAddButtonClick = () => {
        sendData(); 
    };
    const handleModifyButtonClick = () => {
        modifyData(); 
    };
    const handleDeleteButtonClick = () => {
        deleteData(); 
    };
    const handleClearButtonClick = () => {
        updateFeedbackMessage(false, '');
        setJargon('');
        setTranslate('');
        setId('');
        setExampleOfUse('');
    };

    return (
        <>
            <Box sx={{
                minHeight: '2rem',
                justifyContent: 'space-between', 
            }}
                display='flex'
            >
                <Box>
                    <Typography sx={{
                        marginTop: '-0.2rem',
                        color: isError ? 'red' : 'green',
                    }}
                    >
                        { feedbackMessage }
                    </Typography>
                </Box>
                <Box
                    onClick={() => { handleClearButtonClick() } }
                    sx={{
                        cursor: 'pointer'
                    }}
                >
                    <Tooltip title="Clear">
                        <FormatPaintIcon sx={{
                                display: 'flex',
                                fontSize: '1.5rem',
                            }}
                        />
                    </Tooltip>
                </Box>
            </Box>
            <Box
                display='flex'
            >
                <Box alignItems = 'center'
                    marginRight = '0.7rem'

                    sx={{
                        textAlign: 'right',
                        float: 'left'
                    }}
                >
                    <Typography
                        fontSize = '1.3rem'
                        marginBottom = '1.5rem'
                        sx = {{
                            '@media screen and (max-width: 600px)': {
                                fontSize: '1.1rem',
                                marginTop: '0.3rem',
                                marginBottom: '2rem'
                            }
                        }}
                    >
                        Jargon:
                    </Typography>
                    <Typography
                        fontSize = '1.3rem'
                        sx = {{
                            '@media screen and (max-width: 600px)': {
                                fontSize: '1.1rem',
                            }
                        }}
                    >
                        Translate:
                    </Typography>
                </Box>
                <Box alignItems = 'center'
                        sx={{ float: 'left', width: '100%' }}

                >
                    <Box paddingRight = '0.7rem'
                        display = 'flex'
                        paddingBottom = '0.7rem'

                        sx={{
                            float: 'left',
                            width: '62%',
                            '@media screen and (max-width: 600px)': {
                                width: '56%'
                            }
                        }}
                    >
                        <MyInputBase 
                            onChange={(e) => setJargon(e.target.value)}
                            value={jargon}
                            maxLength={ 50 }
                            style={{
                                height: '2.3rem',
                                marginBottom: '0.4rem',
                                float: 'left',
                                width: '100%',
                            }}
                        />
                    </Box>
                    <Box
                        display='flex'
                        width='38%'
                        sx={{
                            float: 'left',
                            '@media screen and (max-width: 600px)': {
                                width: '44%'
                            }
                        }}
                    >
                        <Typography
                            fontSize = '1.3rem'
                            sx={{
                                float: 'left',
                                marginRight: '0.7rem',
                                '@media screen and (max-width: 600px)': {
                                    fontSize: '1.1rem',
                                    marginTop: '0.3rem'
                                }
                            }}
                        >
                            Id:
                        </Typography>
                        <MyInputBase
                            fullWidth
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            maxLength={6}
                            style={{
                                float: 'left',
                                height: '2.3rem',
                            }} 
                        />
                    </Box>
                    <MyInputBase
                        fullWidth
                        onChange={(e) => setTranslate(e.target.value)}
                        maxLength={50}
                        value={translate}
                        style={{
                            height: '2.3rem',
                        }} 
                    />
                </Box>
            </Box>
            <Typography
                fontSize = '1.3rem'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                    '@media screen and (max-width: 600px)': {
                        fontSize: '1.1rem',
                    }
                }}
            >
                Example of use
            </Typography>
            <MyInputBase
                multiline
                rows={4}
                value={exampleOfUse}
                onChange={(e) => setExampleOfUse(e.target.value)}
                maxLength={250}
                style={{
                    width: '100%'
                }}
            />
            <Box paddingTop='0.7rem'
                display="flex"
                justifyContent='space-between'
            >

                <MyButton
                    variant="contained"
                    onClick={handleModifyButtonClick}
                    style={{
                        float: 'left',
                        width: '100%',
                        marginRight: '8px',
                        fontSize: '1.2rem',
                    }}
                >
                    Modify
                </MyButton>
                <MyButton
                    variant="contained"
                    onClick={handleAddButtonClick}
                    style={{
                        float: 'left',
                        width: '100%',
                        marginRight: '8px',
                        fontSize: '1.2rem',
                    }}
                >
                    Add
                </MyButton>
                <MyButton
                    variant="contained"
                    onClick={handleDeleteButtonClick}
                    style={{
                        float: 'left',
                        width: '100%',
                        fontSize: '1.2rem',
                    }}
                >
                    Delete
                </MyButton>
            </Box>
        </>
    )
}

export default DictionaryEditorForm;