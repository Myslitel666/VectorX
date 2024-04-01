//React Import
import React from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

//MyComponents Import
import Logo from '../Header/Logo';
import ServiceName from './ServiceName';
import CustomizationModal from '../CustomizationModal/CustomizationModal'
import Logout from '../Header/Logout'
import Login from '../Header/Login'
import { useUserContext } from '../../../Context/UserContext';
import Drawer from '../../Common/Drawer/Drawer'


const Header: React.FC = () => {
    //Работа с контекстом
    const { isLogged } = useUserContext();
    const theme = useTheme();

    const isMobile = useMediaQuery({ maxWidth: 725 });
    if (isMobile) {
        return (
            <>
                <Drawer />
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
                    <ServiceName />
                    <Box
                        display='flex'
                        sx={{
                            marginLeft: 'auto',
                        }}
                    >
                        <CustomizationModal />
                        {isLogged() ? <Logout /> : <Login />}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
