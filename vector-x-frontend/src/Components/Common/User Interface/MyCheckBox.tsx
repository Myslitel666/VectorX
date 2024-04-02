//MUI Import
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

interface MyCheckboxProps extends CheckboxProps {
    // Дополнительные свойства, если необходимо
}

const MyCheckbox: React.FC<MyCheckboxProps> = (props) => {
    return (
        <Checkbox
            {...props}
            sx={{
                transition: 'background-color 1s ease, color 1s ease, border-color 1s ease'
                //...props.sx // Позволяет вам передавать другие стили через props
            }}
        />
    );
};

export default MyCheckbox;
