import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import { useTheme } from '@mui/material';

interface MyInputProps extends InputBaseProps {
    maxLength?: number;
    isMultiline?: boolean;
}

const MyInputBase: React.FC<MyInputProps> = (props) => {

    const theme = useTheme();

    return (
        <InputBase
            {...props}
            className="inputBase"
            inputProps={{
                maxLength: props.maxLength,
                multiline: props.isMultiline
            }}
            sx={{
                transition: 'background-color 1s ease, color 1s ease, border-color 1s ease',
                border: `1px solid ${theme.palette.action.disabled}`,
                borderRadius: '4px',
                padding: '1.2vh',
                '&.Mui-focused': {
                    borderColor: `${theme.palette.primary.main}`, // Ваши стили при фокусировке
                },

                //...props.sx // Позволяет вам передавать другие стили через props
            }}
        />
    );
};

export default MyInputBase;
