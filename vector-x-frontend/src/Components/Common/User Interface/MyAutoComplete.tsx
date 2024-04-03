import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface AutoCompleteProps {
    sx?: React.CSSProperties | {
        [key: string]: React.CSSProperties | undefined;
    } ; // Либо CSS-правила, либо media-теги
    label?: string;
    dropList?: { title: string }[];
}

const MyAutoComplete: React.FC<AutoCompleteProps> = ({ sx,
    label = 'label',
    dropList = defaultDropList
}) => {

    const options = dropList.map((option) => {
        return {
            ...option,
        };
    });

    return (
        <Autocomplete
            id="grouped-demo"
            size="small"
            options={options}
            getOptionLabel={(option) => option.title}
            defaultValue={options[0]} // Выбираем первый элемент по умолчанию
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