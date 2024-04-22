//React Import
import React, { useState } from 'react';

//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';

//MyComponents Import
import { ColorModeContextProps, useColorMode } from '../../../../../../Context/ColorModeContext'
import MyLink from '../../../../../Common/User Interface/MyLink';

export default function BasicModal() {
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { iconColor }: ColorModeContextProps = useColorMode();

    // Состояние для отслеживания наведения мыши
    const [isHovered, setIsHovered] = useState(false);

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
                display='flex'
                alignItems='center'
                width='100%'
                height='7.5rem'
                margin='1.75rem auto 0'
                border='1px solid'
                borderColor={themeMode === 'light' ? '#cecece' : '#4d4d4d'}
                borderRadius='0.6rem'
                padding='0.66rem'

                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}

                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Avatar
                    alt="Avatar"
                    src='/images/default-avatars/light.jpg'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '6rem',
                        height: '6rem'
                    }}
                />
                <Box
                    sx={{
                        marginLeft: '0.66rem',
                    }}
                >
                    <Typography>
                        Username: Svelte.dev
                    </Typography>
                    <Typography>
                        Role: learner
                    </Typography>
                    <Typography>
                        Password: ●●●●●●●●●
                    </Typography>
                </Box>
                <Tooltip
                    title='Clear'
                >
                    <DeleteIcon
                        sx={{
                            display: isHovered ? 'visible' : 'none',
                            color: iconColor,
                            position: 'absolute',
                            right: '0',
                            marginRight: '2.5rem',
                            fontSize: '1.66rem'
                        }}
                    />
                </Tooltip>
            </Box>
        </>
    );
}