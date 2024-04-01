//React Import
import React, { useEffect } from 'react';

//MUI Import
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

//MyComponents Import
import { Visibility, VisibilityOff } from '@mui/icons-material';


interface PasswordTextFieldProps {
    externalPassword: string;
    setExternalPassword: React.Dispatch<React.SetStateAction<string>>;
    containerSx?: React.CSSProperties; // Дополнительные стили для контейнера
}

const PasswordTextField: React.FC<PasswordTextFieldProps> = ({
        externalPassword,
        setExternalPassword,
        containerSx
    }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [cursorPosition, setCursorPosition] = React.useState<number | null>(null);

    useEffect(() => {
        // Восстанавливаем позицию курсора после рендеринга
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
            }
        }, 0);
    }, [showPassword]);

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);

        inputRef.current?.setSelectionRange(cursorPosition, cursorPosition)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (inputRef.current) {
            // Сохраняем текущую позицию курсора
            setCursorPosition(inputRef.current.selectionStart);
        }
    };

    return (
        <FormControl sx={{ ...containerSx }} variant='outlined'>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                label='Password'
                onChange={(e) => {
                    setExternalPassword(e.target.value);
                    setCursorPosition(e.target.selectionStart); // Сохраняем позицию курсора
                }}
                value={externalPassword}
                type={showPassword ? 'text' : 'password'}
                inputRef={inputRef}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

export default PasswordTextField;