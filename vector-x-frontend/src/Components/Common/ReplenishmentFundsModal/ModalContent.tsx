import { useEffect } from 'react';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Button from '@mui/material/Button';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

//My Components Import
import { useColorLabel } from '../../../Context/UseColorLabel';
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';

export default function CustomizationModalContent() {
    const { setPrimaryColor, setThemeMode } = useColorMode();
    const { getColorFromLabel, getLabelFromColor } = useColorLabel('green');
    const { themeMode }: ColorModeContextProps = useColorMode();

    const handleModeThemeToggle = (theme: 'light' | 'dark') => {
        setThemeMode(theme);
    };

    const handlePrimaryColorToggle = (labelColor: string) => {
        const currentColor = getColorFromLabel(labelColor);
        setPrimaryColor(currentColor);
    };

    useEffect(() => {
        const labelColor = getLabelFromColor();
        const primaryColorWithTheme = getColorFromLabel(labelColor);
        setPrimaryColor(primaryColorWithTheme);
    }, [themeMode]);

    return (
        <>
            <Typography variant="h6" component="h2">
                Replenishment Funds
            </Typography>
            <Box
                display='flex'
                justifyContent="center"
                sx={{
                    float: 'center'
                }}
            >
                
            </Box>
        </>
    )
}