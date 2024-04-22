//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//MyComponents Import
import { ColorModeContextProps, useColorMode } from '../../../../../../Context/ColorModeContext'
import MyLink from '../../../../../Common/User Interface/MyLink';

export default function BasicModal() {
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();

    return (
        <>
            <Typography
                fontSize = '1.65rem'
                marginTop='1rem'
                marginBottom='-0.75rem'
            >
                Quik Account Access
            </Typography>
            <Box
                width='100%'
                height='7.5rem'
                margin='1.75rem auto 0'
                border='1px solid'
                borderColor={themeMode === 'light' ? '#cecece' : '#4d4d4d'}
                borderRadius='0.6rem'
                textAlign='center'
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}
            >
            </Box>
            <Box
                width='100%'
                height='7.5rem'
                margin='1.75rem auto 0'
                border='1px solid'
                borderColor={themeMode === 'light' ? '#cecece' : '#4d4d4d'}
                borderRadius='0.6rem'
                textAlign='center'
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}
            >
            </Box>
            <Box
                width='100%'
                height='7.5rem'
                margin='1.75rem auto 0'
                border='1px solid'
                borderColor={themeMode === 'light' ? '#cecece' : '#4d4d4d'}
                borderRadius='0.6rem'
                textAlign='center'
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}
            >
            </Box>
            <Box
                width='100%'
                height='7.5rem'
                margin='1.75rem auto 0'
                border='1px solid'
                borderColor={themeMode === 'light' ? '#cecece' : '#4d4d4d'}
                borderRadius='0.6rem'
                textAlign='center'
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}
            >
            </Box>
            <Box
                width='100%'
                height='7.5rem'
                margin='1.75rem auto 0'
                border='1px solid'
                borderColor={themeMode === 'light' ? '#cecece' : '#4d4d4d'}
                borderRadius='0.6rem'
                textAlign='center'
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}
            >
            </Box>
            <Box
                width='100%'
                height='7.5rem'
                margin='1.75rem auto 0'
                border='1px solid'
                borderColor={themeMode === 'light' ? '#cecece' : '#4d4d4d'}
                borderRadius='0.6rem'
                textAlign='center'
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}
            >
            </Box>
        </>
    );
}