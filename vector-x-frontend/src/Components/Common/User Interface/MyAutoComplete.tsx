//MUI Import
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface AutoCompleteProps {
    sx?: React.CSSProperties | {
        [key: string]: React.CSSProperties | undefined;
    } ; // Либо CSS-правила, либо media-теги
    label?: string;
    dropList?: { title: string }[];
    size?: "medium" | "small"
}

const MyAutoComplete: React.FC<AutoCompleteProps> = ({ sx,
    label = 'label',
    dropList = defaultDropList,
    size = "small"
}) => {

    const options = dropList.map((option) => {
        return {
            ...option,
        };
    });

    const defaultValueIndex = dropList.findIndex((option) => option.title === dropList[0]?.title);

    return (
        <Autocomplete
            id="grouped-demo"
            size = {size}
            options={options}
            getOptionLabel={(option) => option.title}
            value={defaultValueIndex !== -1 ? options[defaultValueIndex] : null} // Исправляем ошибку несоответствия значений
            sx={{
                ...sx
            }}
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