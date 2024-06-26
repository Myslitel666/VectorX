//React Import
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';

//MyComponents Import
import { useUserContext } from '../../../../../../Context/UserContext';
import Header from '../../../../../Common/Header/Header';
import MyImageUploading from './MyImageUploading';
import MyTypography from '../../../../../Common/User Interface/MyTypography';
import MyAutoComplete from '../../../../../Common/User Interface/MyAutoComplete';
import RedactModal from './RedactModal';

//Redux
import { Provider } from 'react-redux';
import store from './Store/store'; // Путь к вашему файлу store

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getUser, isLogged } = useUserContext();
    let user = getUser();

    const [selectedField, setSelectedField] = useState('Username');

    const handleFieldSelectionChange = (selectedValue: string) => {
        setSelectedField(selectedValue); // обновляем значение выбранного поля
    };

    //Попытка получить доступ к контенту из адресной строки браузера
    //Profile Section доступен только для зарегистрированных пользователей
    useEffect(() => {
        if (!isLogged()) {
            navigate('/auth');
        }
    }, [location.pathname, user.isBlocked]);

    interface AttributeValueProps  {
        attribute: string;
        value: string;
        sx?: React.CSSProperties | {
            [key: string]: React.CSSProperties | undefined;
        } ; // Либо CSS-правила, либо media-теги
    }

    const MyAccountTypography: React.FC = () => {
        return (
            <>
                <MyTypography
                    color='primary'
                    sx={{
                        paddingLeft: '0.5rem',
                        marginTop: '4.4rem',
                        fontSize: '3rem',
                        overflow: 'hidden'
                    }}
                >
                    My Account
                </MyTypography>
            </>
        )
    }

    const Avatar: React.FC = () => {
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

    const AttributeValue: React.FC<AttributeValueProps> = ({ attribute, value, sx }) => {
        return (
            <>
                <Box sx={{
                    ...sx,
                }}>
                    <MyTypography
                        color='primary'
                        sx={{
                            fontSize: '2.25rem',
                            float: 'left',
                        }}
                    >
                        {attribute}
                    </MyTypography>
                    <Typography
                        sx={{
                            fontSize: '2.25rem',
                            paddingLeft: '12rem'
                        }}
                    >
                        {value ? value : 'undefined'}
                    </Typography>
                </Box>
                
            </>
        )
    }

    const fieldSelectionDropList = [
        { title: 'Username' },
        { title: 'Password' },
    ]

    return (
        <Provider store={store} >
            <Header />
            <Box
                display='flex'
                sx={{
                    '@media screen and (max-width: 850px)': {
                        display: 'flow',
                    },
                }}
            >
                <Box>
                    <MyAccountTypography />
                    <Avatar />
                </Box>
                <Box
                    sx={{
                        paddingLeft: '5rem',
                        width: '100%',
                        '@media screen and (max-width: 850px)': {
                            display: 'flow',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            marginTop: '5.2rem',
                            paddingRight: '0.5rem',
                            '@media screen and (max-width: 850px)': {
                                marginTop: '15rem',
                                paddingRight: '0',
                            }
                        }}
                    >
                        <MyAutoComplete
                            label='Field Selection'
                            dropList={fieldSelectionDropList}
                            size='medium'
                            onFieldSelectionChange={handleFieldSelectionChange} // передаем обновленный обработчик
                            defaultValue={fieldSelectionDropList.find(option => option.title === selectedField)}
                            sx={{
                                marginRight: '0.5rem',
                                width: '60%',
                            }}
                        />
                        <RedactModal selectedField={selectedField} />
                    </Box>
                    <AttributeValue
                        attribute="Username:"
                        value={user.username}
                        sx={{
                            marginTop: '0.5rem',
                        }}
                    />
                    <AttributeValue
                        attribute="Role:"
                        value={user.userRole}
                        sx={{
                            marginTop: '0.5rem',
                        }}
                    />
                    <AttributeValue
                        attribute="Password:"
                        value='●●●●●●●●●'
                        sx={{ marginTop: '0.5rem', }}
                    />
                    <Box sx={{
                        maxWidth: '23.5rem',
                    }}>
                        <Tooltip title="Learn English" placement="bottom" arrow>
                            <Link href='/english-assistant/home'>
                                <MyTypography
                                    sx={{
                                        marginTop: '0.5rem',
                                        fontSize: '2.25rem',
                                        cursor: 'pointer',
                                        float: 'left',
                                    }}
                                >
                                    EnglishAssistant Pro
                                </MyTypography>
                                <MyTypography>
                                    <ExitToAppIcon sx={{
                                        fontSize: '2.33rem',
                                        marginLeft: '0.4rem',
                                        marginTop: '1rem'
                                    }} />
                                </MyTypography>
                            </Link>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Provider>
    )
}

export default Profile;