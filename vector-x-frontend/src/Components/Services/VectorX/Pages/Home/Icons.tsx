import { useTheme } from '@mui/material';

interface RegisterIcoProps {
    style?: React.CSSProperties; // Добавляем проп для стилей
}

export const SearchIcon: React.FC<RegisterIcoProps> = ({ style }) => {
    const theme = useTheme();
    const iconColor = theme.palette.primary.contrastText;

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            aria-hidden="true"
            style={{
                fill: iconColor,
                ...style
            }}
        >
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
        </svg>
    )
}