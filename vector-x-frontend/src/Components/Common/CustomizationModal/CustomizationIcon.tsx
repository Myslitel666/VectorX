//MUI Import
import PaletteIcon from '@mui/icons-material/PaletteOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';

//MyComponents Import
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';

interface IconProps {
    sx?: React.CSSProperties | {
        [key: string]: React.CSSProperties | undefined;
    }; // Либо CSS-правила, либо media-теги
}

const CustomizationIcon: React.FC<IconProps> = ({ sx = { fontSize: '1.9rem' } }) => {
    const { iconColor }: ColorModeContextProps = useColorMode();

    return (
        <>
            <PaletteIcon
                sx={{
                    ...sx,
                    color: iconColor,
                }}
            />
            <BrushOutlinedIcon
                sx={{
                    ...sx,
                    color: iconColor,
                    marginLeft: '-0.6rem',
                    transform: 'rotate(-18deg)'
                }}
            />
        </>
    );
}

export default CustomizationIcon;