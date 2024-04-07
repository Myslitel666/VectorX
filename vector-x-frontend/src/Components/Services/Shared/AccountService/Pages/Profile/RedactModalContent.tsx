import { useState, useEffect } from 'react';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Button from '@mui/material/Button';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

//My Components Import
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
import { useColorMode, ColorModeContextProps } from '../../../../../../Context/ColorModeContext';

export default function RedactModalContent({ selectedField }: { selectedField: string }) {

    let componentToRender;

    switch (selectedField) {
        case 'Username':
            componentToRender = (
                <Typography variant="h6" component="h2">
                    Username
                </Typography>
            );
            break;
        case 'Password':
            componentToRender = (
                <Typography variant="h6" component="h2">
                    Password
                </Typography>
            );
            break;
        // Добавьте дополнительные варианты по мере необходимости
        default:
            componentToRender = null;
    }

    return (
        <>
            {componentToRender}
        </>
    )
}
