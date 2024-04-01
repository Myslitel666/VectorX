import React, { useState } from 'react';

//MUI Import
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh';

//My components import
import { useHomeContext } from '../Home/HomeContext'
import { useUserContext } from '../../../Context/UserContext';
import DictionaryDataGrid from '../Home/DictionaryDataGrid'
import JargonFilter from '../Home/JargonFilter'

const LeftHalfScreen: React.FC = () => {
    //Работа с контекстом домашней страницы
    const { fetchJargon } = useHomeContext();
    const [rotation, setRotation] = useState(0);

    //Работа с контекстом пользователя
    const { getUser } = useUserContext();
    const user = getUser();

    const handleClickRefreshIcon = () => {
        fetchJargon(user.userId);
        setRotation(rotation + 360);
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: '4.2rem',
                    marginBottom: '0',
                    cursor: 'pointer',
                }}
            >
                <Box sx={{ display: 'flex', float: 'left' }}>
                    <Tooltip title="Refresh">
                        <RefreshIcon
                            onClick={() => handleClickRefreshIcon()}
                            sx={{
                                marginTop: '1rem',
                                marginLeft: '1rem',
                                fontSize: '1.85rem',
                                color: 'primary.main',
                                transform: `rotate(${rotation}deg)`,
                                transition: 'transform 0.6s ease, color 1s ease',
                            }}
                        />
                    </Tooltip>
                </Box>
                <Box display='flex' sx={{ } }>
                    <JargonFilter />
                </Box>
            </Box>
            <DictionaryDataGrid />
        </>
    )
}

export default LeftHalfScreen;