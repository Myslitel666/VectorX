//MUI Import
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Определение типа для объекта с полем title
type Option = { title: string };

interface AutoCompleteProps {
    sx?: React.CSSProperties | {
        [key: string]: React.CSSProperties | undefined;
    } ; // Либо CSS-правила, либо media-теги
    label?: string;
    dropList?: { title: string } [];
    size?: "medium" | "small";
    onFieldSelectionChange?: (selectedValue: string) => void; // Обработчик события для выбора поля
    defaultValue?: { title: string } | null;
}

const MyAutoComplete: React.FC<AutoCompleteProps> = ({ 
    sx,
    label = 'label',
    dropList = defaultDropList,
    size = "small",
    onFieldSelectionChange,
    defaultValue = { title: '' }
}) => {

    const options = dropList.map((option) => ({ ...option }));
    const isOptionEqualToValue = (option: Option, value: Option | null) => {
        if (value === null) {
            return false;
        }
        return option.title === value.title;
    };

    const handleFieldSelectionChange = (event: React.ChangeEvent<{}>, selectedOption: { title: string } | null) => {
        if (selectedOption && onFieldSelectionChange) {
            onFieldSelectionChange(selectedOption.title); // Вызываем обработчик события с выбранным значением
        }
    };

    return (
        <Autocomplete
            id="grouped-demo"
            size = {size}
            options={options}
            getOptionLabel={(option) => option.title}
            value={defaultValue}

            sx={{
                ...sx
            }}
            onChange={handleFieldSelectionChange} // Передаем обработчик события onChange
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => <TextField {...params} label={ label } />}
        />
    );
}

const defaultDropList = [
    { title: 'title 1' },
    { title: 'title 2' },
    { title: 'title 3' },
]

export default MyAutoComplete;