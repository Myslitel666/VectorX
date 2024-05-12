//React Import
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';

//MyComponents Import
import Logo from '../Header/Logo';
import ServiceName from './ServiceName';
import CustomizationModal from '../CustomizationModal/CustomizationModal'
import UserMenu from './UserMenu'
import Login from './Login'
import MoneyIcon from './MoneyIcon'
import { useUserContext } from '../../../Context/UserContext';
import Drawer from '../../Common/Drawer/Drawer'
import { Typography } from '@mui/material';

interface ContentProps {
    serviceName?: string;
    href?: string;
    serviceNameSx?: React.CSSProperties | {
        [key: string]: React.CSSProperties | undefined;
    }; // Либо CSS-правила, либо media-теги
}

const Header: React.FC<ContentProps> = ({
    serviceName = 'Vector X',
    href = '/home',
    serviceNameSx = {
        '@media screen and (max-width: 725px)': {
            fontSize: '22.5px',
            marginTop: '0.3rem'
        }
    }
}) => {
    //Работа с контекстом
    const { isLogged } = useUserContext();
    const theme = useTheme();

    const isMobile = useMediaQuery({ maxWidth: 725 });
    if (isMobile) {
        return (
            <>
                <Drawer serviceName = { serviceName } />
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                elevation={0}
                sx={{
                    backgroundColor: `${theme.palette.action.disabledBackground}`
                }}
            >
                <Toolbar
                    style={{
                        paddingLeft: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        height: '4.1rem',
                        minHeight: '0',
                    }}
                >

                    <Logo />
                    <ServiceName
                        content = {serviceName}
                        href = {href}
                        serviceNameSx = {serviceNameSx}
                    />

                    {isLogged() ? 
                        <Box
                            display = 'flex'
                            alignItems = 'center'
                            sx = {{
                                marginLeft: 'auto',
                                marginRight: '9rem'
                            }}
                        >
                            <Box sx = {{
                            }}>
                                <CustomizationModal />
                            </Box>
                            { serviceName === 'Vector X' &&
                                <Box sx = {{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '0.75rem',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.focus
                                    }
                                }}>
                                    <MoneyIcon style = {{
                                        width: '2.5rem', 
                                        height: '2.5rem'}}
                                    />
                                    <Typography sx = {{
                                        marginRight: '0.25rem',
                                        color: 'text.primary'
                                    }}
                                    >
                                        150000₽
                                    </Typography>
                                    <AddBoxIcon sx = {{
                                        color: 'primary.main',
                                        fontSize: '1.75rem',
                                        transition: 'color 1s ease',
                                    }}/>
                                </Box>
                            }
                            <Box sx = {{
                                marginRight: '5rem'
                            }}>
                                <UserMenu />
                            </Box>
                            <MoneyIcon/>
                        </Box>

                        :

                        <Box
                            display = 'flex'
                            sx={{
                                marginLeft: 'auto',
                            }}
                        >
                            <Box sx = {{
                                marginTop: '-0.15rem'
                            }}>
                                <CustomizationModal />
                            </Box>
                            <Login />
                        </Box>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;