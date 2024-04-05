import React, { useState } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { useTheme } from '@mui/material';

interface MyTypographyProps extends TypographyProps {
}

const MyTypography: React.FC<MyTypographyProps> = (props) => {

    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;

    return (
        <Typography
            {...props}
            color={primaryMainColor}
            sx={{
                ...props.sx,
                transition: 'color 1s ease'
            }}
        />
    );
};

export default MyTypography;
