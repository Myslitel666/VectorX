//React Import
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTheme } from '@mui/material';

//My Components Import
import { useHomeContext } from '../Home/HomeContext'
import { useUserContext } from '../../../../../Context/UserContext'

const columnsDesktop: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Id',
        width: 65,
        cellClassName: 'wrap-cell',

    },
    {
        field: 'jargon',
        headerName: 'Jargon',
        width: 150,
        //editable: true,
        headerClassName: 'custom-header', //Класс заголовка для стилей
        cellClassName: 'custom-cell wrap-cell', //Класс ячеек для стилей
    },
    {
        field: 'translate',
        headerName: 'Translate',
        width: 150,
        //editable: true,
        cellClassName: 'wrap-cell',
    },
    {
        field: 'exampleOfUse',
        headerName: 'Example of use',
        width: 250,
        //editable: true,
        flex: 1,
        cellClassName: 'wrap-cell example-of-use',
    },
];

const columnsMobile: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Id',
        width: 45,
    },
    {
        field: 'jargon',
        headerName: 'Jargon',
        width: 125,
        headerClassName: 'custom-header', //Класс заголовка для стилей
        cellClassName: 'custom-cell', //Класс ячеек для стилей
    },
    {
        field: 'translate',
        headerName: 'Translate',
        width: 145,
    },
    {
        field: 'exampleOfUse',
        headerName: 'Example of use',
        width: 270,
        cellClassName: 'wrap-cell',
    },
];

export default function DictionaryDataGrid() {
    //Работа с контекстом домашней страницы
    const { rowsState, jargonState, translateState, idState, exampleOfUseState, fetchJargon } = useHomeContext();
    const { getUser } = useUserContext();
    const [jargon, setJargon] = jargonState;
    const [translate, setTranslate] = translateState;
    const [id, setId] = idState;
    const [exampleOfUse, setExampleOfUse] = exampleOfUseState;
    const user = getUser();

    const theme = useTheme();
    const [rows, setRows] = rowsState;

    const isMobile = useMediaQuery({ minWidth: 600 });
    const columns = isMobile ? columnsDesktop : columnsMobile;

    useEffect(() => {
        fetchJargon(user.userId)
    }, []);

    return (
        <Box sx={{
            padding: '1rem',
            marginTop: '0.1rem',
            height: '38.9rem',
            width: '100%',
        }}>
            <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={90}
                getEstimatedRowHeight={() => 90}
                getRowHeight={() => 'auto'}
                onRowSelectionModelChange={(newSelectionModel) => {
                    if (newSelectionModel.length > 0) {
                        const selectedRow = rows.find(row => row.id === newSelectionModel[0]);
                        if (selectedRow) {
                            setJargon(selectedRow.jargon);
                            setTranslate(selectedRow.translate);
                            setId(selectedRow.id);
                            setExampleOfUse(selectedRow.exampleOfUse);
                        }
                    }
                }}
                sx={{
                    //Стиль, который добавляет отступ для верхнего и нижнего края в строке таблицы
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                        py: '15px',
                    },
                    '@media screen and (max-width: 1400px)': {
                        height: '36.05rem',
                    },
                    '@media screen and (max-width: 1200px)': {
                        height: '35.37rem',
                    },
                    '@media screen and (max-width: 1000px)': {
                        height: '36.2rem',
                    },
                    "& .custom-header": {
                        color: `${theme.palette.primary.main}`,
                        transition: 'color 1s ease'
                    },
                    "& .custom-cell": {
                        color: `${theme.palette.primary.main}`,
                        transition: 'color 1s ease',
                        cursor: 'pointer'
                    },
                    "& .wrap-cell": {
                        cursor: 'pointer',
                        //Стиль, который переносит слово на новую строку, если оно не помещается в ширину столбца
                        overflowWrap: 'break-word',
                        display: 'flex',
                        alignItems: 'center', //Центрирование по горизонтали
                    },
                }}
            />
        </Box>
    );
}