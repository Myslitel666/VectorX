import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

interface MyButtonProps extends ButtonProps {
    
}

const MyButton: React.FC<MyButtonProps> = (props) => {
    const theme = useTheme();

    return (
        <Button
            {...props}
            disableElevation //Убираем тени
            sx={{
                transition: 'background-color 1s ease, color 1s ease, border-color 1s ease',
                border: 1,
                borderColor: 'black',
                '&:hover': {
                    border: 1,
                    borderColor: 'black',
                },
                '&:disabled': { // Стили для состояния disabled
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200], // Цвет кнопки в неактивном состоянии
                    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.disabled, // Цвет текста в неактивном состоянии
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400], // Цвет рамки в неактивном состоянии
                },
                ...props.sx // Позволяет вам передавать другие стили через props
            }}
        />
    );
};

export default MyButton;
