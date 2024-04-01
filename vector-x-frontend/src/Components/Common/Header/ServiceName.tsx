//React Import
import React, { useState } from 'react';

//MUI Import
import Typography from '@mui/material/Typography';  
import { useTheme } from '@mui/material/styles';

//MyComponents Import
import { useUserContext } from '../../../Context/UserContext';

const ServiceName: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryDarkColor = theme.palette.primary.dark;

    //Работа с контекстом
    const { getUser } = useUserContext();

    const handleMouseClick = () => {
        console.log(getUser())
    };

    return (
        <Typography
            fontSize = '2.3rem'
            color={primaryMainColor}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseClick }
            sx={{
                cursor: 'pointer',
                color: isHovered ? `${primaryDarkColor}` : `${primaryMainColor}`,
                transition: 'color 1s ease',
                marginLeft: '5px',
                '@media screen and (max-width: 725px)': {
                    fontSize: '22.5px'
                }
            }}
        >
            EnglishAssistant Pro
        </Typography>
    );
};

export default ServiceName;