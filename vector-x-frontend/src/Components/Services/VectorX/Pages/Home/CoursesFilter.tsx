//React Import
import React, { useState } from 'react'

//MUI Import
import SearchCriteria from '../../../../Common/User Interface/MyAutoComplete';
import MyButton from '../../../../Common/User Interface/MyButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material';

//MyComponents Import
import { SearchIcon } from '../Home/Icons'

const CoursesFilter: React.FC = () =>
{ 
    const isMobile = useMediaQuery('(max-width:800px)');
    const [selectedField, setSelectedField] = useState('Course name');

    const searchCriteriaDropList = [
        { title: 'Course name' },
        { title: 'Author' },
        { title: 'Subject' },
    ]

    const handleSelectedFieldChange = (selectedValue: string) => {
        setSelectedField(selectedValue); // обновляем значение выбранного поля
    };

    return (
        <>
            <Box
                display='flex'
                padding='1rem'
                paddingBottom='0'
                paddingRight='0.7rem'
            >
                <Box alignItems='center'
                    sx={{
                        float: 'left',
                        width: '100%',
                    }}
                >
                    <Box
                        display='flex'
                        sx={{
                            float: 'left',
                            width: '42%',
                            '@media screen and (max-width: 600px)': {
                                width: '100%'
                            }
                        }}
                    >
                        <Typography
                            fontSize='1rem'
                            marginTop='0.35rem'
                            marginRight='0.7rem'
                            sx={{
                                whiteSpace: 'nowrap', //Предотвращаем перенос "by" на отдельную строку
                                '@media screen and (max-width: 600px)': {
                                    fontSize: '1rem',
                                    marginTop: '0.35rem',
                                }
                            }}
                        >
                            Sort by:
                        </Typography>
                        <SearchCriteria
                            label="Search criteria"
                            dropList={searchCriteriaDropList}
                            onFieldSelectionChange={handleSelectedFieldChange}
                            defaultValue={searchCriteriaDropList.find(option => option.title === selectedField)}
                            sx={{
                                marginBottom: '1rem',
                                marginRight: '0.7rem',
                                width: '100%',
                                '@media screen and (max-width: 600px)': {
                                    marginRight: 0,
                                }
                            }}
                        />
                    </Box>
                    <Box
                        display='flex'
                        paddingRight='0.7rem'
                        sx={{
                            float: 'left',
                            width: '48%',
                            '@media screen and (max-width: 600px)': {
                                width: '80%'
                            }
                        }}
                    >
                        <TextField
                            size="small"
                            label="Value of the search criteria"
                            fullWidth
                            style={{
                                float: 'left',
                            }}
                        />
                    </Box>
                    <Box
                        display='flex'
                        width='10%'
                        sx={{
                            float: 'left',
                            '@media screen and (max-width: 600px)': {
                                width: '20%'
                            }
                        }}
                    >
                        <MyButton
                            variant="contained"
                            sx={{
                                width: '100%',
                            }}>
                            {isMobile ? <SearchIcon style={{ height: '1.5rem' }} /> : <Typography>Search</Typography> }
                        </MyButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default CoursesFilter;
