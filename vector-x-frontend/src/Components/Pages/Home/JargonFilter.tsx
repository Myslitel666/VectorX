import * as React from 'react';
import Box from '@mui/material/Box';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

//MyComponents Import
import { useHomeContext } from '../Home/HomeContext'

const JargonFilter: React.FC = () => {
    const { rowsState, backupRowsState } = useHomeContext();
    const [rows, setRows] = rowsState;
    const [backupRows, setBackupRows] = backupRowsState;
    const [inputValue, setInputValue] = React.useState('');

    const [filteredJargons, setFilteredJargons] = React.useState(['']);
    // После обновления filteredRows
    React.useEffect(() => {
        const filteredJargon = backupRows
            .filter((row) => row.jargon.includes(inputValue))
            .map((row) => row.jargon);
        setFilteredJargons(filteredJargon);
    }, [backupRows, inputValue]);

    const handleFilterClick = () => {
        const filtered = backupRows.filter(row => row.jargon.includes(inputValue));
        setRows(filtered);
    }

    return (
        <>
            <Box width='100%'
                paddingLeft='0.5rem'
                paddingRight='0.5rem'
                alignItems='justify-end'
                display='flex'
                justifyContent='flex-end'
            >
                <Stack spacing={5}
                    marginRight='1vh'
                    width = '100%'
                    sx={{ float: 'left' }}
                >
                    <Autocomplete
                        freeSolo
                        options={filteredJargons}
                        inputValue={inputValue}
                        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                        getOptionLabel={(option: string) => `${option}`}
                        id="movie-customized-option-demo"
                        //disableClearable
                        renderInput={(params) => (
                            <TextField {...params} label="Choose a movie" variant="standard"
                            />
                        )}
                    />
                </Stack>
                <Button
                    color="primary"
                    onClick={handleFilterClick}
                    style={{
                        marginTop: 'auto',
                        fontSize: '1.5rem',
                        width: '8rem',
                        height: '2.5rem'
                    }}
                    sx={{ transition: 'background-color 1s ease, color 1s ease, border-color 1s ease' }}
                >
                    Filter
                </Button>
            </Box>
        </>
    )
}

export default JargonFilter;