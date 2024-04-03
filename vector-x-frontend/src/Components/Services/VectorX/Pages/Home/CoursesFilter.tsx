//MUI Import
import SearchCriteria from '../../../../Common/User Interface/MyAutoComplete';
import MyButton from '../../../../Common/User Interface/MyButton';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const dropList = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
]

const CoursesFilter: React.FC = () =>
{ 
    const searchCriteriaDropList = [
        { title: 'Course name' },
        { title: 'Author' },
        { title: 'Subject' },
    ]

    return (
        <>
            <Box
                marginTop='4rem'
                display='flex'
                padding='1rem'
            >
                <Box marginRight='0.7rem'

                    sx={{
                        textAlign: 'right',
                        float: 'left'
                    }}
                >
                    <Typography
                        fontSize='1rem'
                        marginTop='0.35rem'
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
                </Box>
                <Box alignItems='center'
                    sx={{
                        float: 'left',
                        width: '100%',
                    }}

                >
                    <Box
                        display='flex'
                        paddingBottom='0.7rem'
                        paddingRight='0.7rem'
                        sx={{
                            float: 'left',
                            width: '34%',
                            '@media screen and (max-width: 600px)': {
                                width: '100%'
                            }
                        }}
                    >
                        <SearchCriteria
                            label="Search criteria"
                            dropList = {searchCriteriaDropList}
                            sx={{
                                marginBottom: '1rem',
                                width: '100%'
                            }}
                        />
                    </Box>
                    <Box
                        display='flex'
                        paddingRight='0.7rem'
                        sx={{
                            float: 'left',
                            width: '56%',
                            '@media screen and (max-width: 600px)': {
                                width: '100%'
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
                                width: '10%'
                            }
                        }}
                    >
                        <MyButton
                            variant="contained"
                            sx={{ width: '100%' }}>
                            Search
                        </MyButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default CoursesFilter;
