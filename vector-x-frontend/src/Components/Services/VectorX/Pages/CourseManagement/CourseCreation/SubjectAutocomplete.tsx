import React, { ChangeEvent } from 'react';

//MUI Import
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

//interfaces import
import { SubjectDirectory } from '../../../Interfaces/interfaces';

interface AutoCompleteProps {
    sx?: React.CSSProperties | {
        [key: string]: React.CSSProperties | undefined;
    } ; // Либо CSS-правила, либо media-теги
    label?: string;
    dropList: SubjectDirectory[];
    size?: "medium" | "small";
    onFieldSelectionChange?: (selectedValue: string) => void; // Обработчик события для выбора поля
    onInputChange?: (event: ChangeEvent<{}>, newInputValue: string) => void;
}

const SubjectAutocomplete: React.FC<AutoCompleteProps> = ({ 
    sx,
    label = 'label',
    dropList,
    size = "small",
    onFieldSelectionChange,
    onInputChange,
}) => {

    const options = dropList.map((option) => ({ ...option }));
    const isOptionEqualToValue = (option: SubjectDirectory, value: SubjectDirectory | null) => {
        if (value === null) {
            return false;
        }
        return option.subjectName === value.subjectName;
    };

    const handleFieldSelectionChange = (event: React.ChangeEvent<{}>, selectedOption: SubjectDirectory | null) => {
        if (selectedOption && onFieldSelectionChange) {
            onFieldSelectionChange(selectedOption.subjectName); // Вызываем обработчик события с выбранным значением
        }
    };

    return (
        <Autocomplete
            id="grouped-demo"
            size = {size}
            options={options}
            getOptionLabel={(option) => option.subjectName}
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

export default SubjectAutocomplete;