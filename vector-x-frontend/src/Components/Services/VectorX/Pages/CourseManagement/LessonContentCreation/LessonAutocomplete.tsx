//React Import
import React, { ChangeEvent } from 'react';

//MUI Import
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

//interfaces import
import { Lesson } from '../../../Interfaces/interfaces';

interface AutoCompleteProps {
    sx?: React.CSSProperties | {
        [key: string]: React.CSSProperties | undefined;
    } ; // Либо CSS-правила, либо media-теги
    label?: string;
    dropList: Lesson[];
    size?: "medium" | "small";
    onFieldSelectionChange?: (selectedValue: Lesson | null) => void; // Обработчик события для выбора поля
    onInputChange?: (event: ChangeEvent<{}>, newInputValue: string) => void;
    defaultValue?: Lesson | null;
}

const LessonAutocomplete: React.FC<AutoCompleteProps> = ({ 
    sx,
    label = 'label',
    dropList,
    size = "small",
    onFieldSelectionChange,
    onInputChange,
    defaultValue,
}) => {

    const options = dropList.map((option) => ({ ...option }));
    const isOptionEqualToValue = (option: Lesson, value: Lesson | null) => {
        if (value === null) {
            return false;
        }
        return option.lessonName === value.lessonName;
    };

    const handleFieldSelectionChange = (event: React.ChangeEvent<{}>, selectedOption: Lesson | null) => {
        if (selectedOption && onFieldSelectionChange) {
            onFieldSelectionChange(selectedOption); // Вызываем обработчик события с выбранным значением
        }
    };

    return (
        <Autocomplete
            id="grouped-demo"
            size = {size}
            options={options}
            getOptionLabel={(option) => option.lessonName}
            value={defaultValue}
            sx={{
                ...sx
            }}
            onChange={handleFieldSelectionChange} // Передаем обработчик события onChange
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => <TextField {...params} label={ label } />}
            onInputChange={onInputChange}
        />
    );
}

export default LessonAutocomplete;