﻿//React Import
import React, { useState } from 'react';

//MUI Import
import Typography from '@mui/material/Typography';  
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

//MyComponents Import
import { useUserContext } from '../../../Context/UserContext';

interface ContentProps {
    content?: string;
    href?: string;
    serviceNameSx?: React.CSSProperties | {
        [key: string]: React.CSSProperties | undefined;
    }; // Либо CSS-правила, либо media-теги
}

const ServiceName: React.FC<ContentProps> = ({
    content = 'Vector X',
    href = '/home',
    serviceNameSx = {
        '@media screen and (max-width: 725px)': {
            fontSize: '22.5px',
            marginTop: '0.3rem'
        }
    }
}) => {
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

    return (
        <Tooltip
            title={content}
            arrow
            placement="right"
        >
            <Link
                underline="none"
                href={href}
            >
                <Typography
                    fontSize = '2.3rem'
                    color={primaryMainColor}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                        ...serviceNameSx,
                        cursor: 'pointer',
                        color: isHovered ? `${primaryDarkColor}` : `${primaryMainColor}`,
                        transition: 'color 1s ease',
                        marginLeft: '5px',
                    }}
                >
                    { content }
                </Typography>
            </Link>
        </Tooltip>
    );
};

export default ServiceName;