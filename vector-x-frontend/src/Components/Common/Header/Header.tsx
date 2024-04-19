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
import UserMenu from './UserMenu'
import Logout from './Logout'
import Login from './Login'
import { useUserContext } from '../../../Context/UserContext';
import Drawer from '../../Common/Drawer/Drawer'

interface ContentProps {
    serviceName?: string;
    href?: string;
}

const Header: React.FC<ContentProps> = ({ serviceName = 'Vector X', href = '/home' }) => {
    //Работа с контекстом
    const { isLogged } = useUserContext();
    const theme = useTheme();

    const isMobile = useMediaQuery({ maxWidth: 725 });
    if (isMobile) {
        return (
            <>
                <Drawer serviceName={serviceName} />
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
                        content={serviceName}
                        href={href}
                    />
                    <Box 
                        display='flex'
                        sx={{
                            marginLeft: 'auto',
                            marginRight: '9rem'
                        }}
                    >
                        <Box sx={{
                            marginTop: '0.1rem'
                        }}>
                            <CustomizationModal />
                        </Box>
                        <Box sx={{
                            marginRight: '5rem'
                        }}>
                            {isLogged() ? <UserMenu /> : <Login />}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;