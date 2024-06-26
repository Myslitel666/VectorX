//React Import
import React from 'react';

//MUI Import
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';

//MyComponents Import
import { Typography } from '@mui/material';
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';
import { useUserContext } from '../../../Context/UserContext';

interface MoneyIconProps {
    IconSx?: React.CSSProperties; // Стили иконки
    BoxSx?: React.CSSProperties; // Стили Box'а
    onClick?: () => void; // Функция onClick
}

export const MoneyIcon: React.FC<MoneyIconProps> = ({ IconSx: iconSx }) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{
                ...iconSx, // Применяем переданные стили
            }}
        >
            <polyline style={{fill:'#FDBB00'}} points="402.026,439.864 402.026,32.094 175.298,32.094 175.298,439.864 "/>
            <polyline style={{fill:'#EDAB06'}} points="221.087,439.864 221.087,32.094 175.298,32.094 175.298,439.864 "/>
            <polyline style={{fill:'#F9CF67'}} points="369.877,439.864 369.877,32.094 338.962,32.094 338.962,439.864 "/>
            <rect x="8.92" y="220.749" style={{fill:'#FDBB00'}} width="226.728" height="244.664"/>
            <rect x="8.92" y="220.749" style={{fill:'#EDAB06'}} width="48.608" height="244.664"/>
            <rect x="165.813" y="220.749" style={{fill:'#F9CF67'}} width="33.841" height="244.664"/>
            <path style={{fill:'#FDBB00'}} d="M503.993,368.802c0,62.607-50.763,113.358-113.37,113.358c-14.518,0-28.393-2.73-41.152-7.705
                c-42.257-16.47-72.207-57.565-72.207-105.654c0-62.618,50.751-113.37,113.358-113.37c14.462,0,28.28,2.707,40.994,7.648
                C473.964,279.505,503.993,320.646,503.993,368.802z"/>
            <path style={{fill:'#F9CF67'}} d="M503.993,368.802c0,62.607-50.763,113.358-113.37,113.358c-14.518,0-28.393-2.73-41.152-7.705
                l82.145-211.375C473.964,279.505,503.993,320.646,503.993,368.802z"/>
            <path d="M273.669,430.276h-5.873c-4.674,0-8.46,3.788-8.46,8.46c0,4.672,3.787,8.46,8.46,8.46h5.873c4.674,0,8.46-3.788,8.46-8.46
                C282.129,434.064,278.341,430.276,273.669,430.276z"/>
            <path d="M174.839,202.532c4.464,0,8.111-3.459,8.429-7.841h209.839v35.079c0,4.672,3.787,8.46,8.46,8.46
                c4.674,0,8.46-3.788,8.46-8.46V30.966c0-4.672-3.787-8.46-8.46-8.46H174.839c-4.674,0-8.46,3.788-8.46,8.46v163.106
                C166.378,198.744,170.166,202.532,174.839,202.532z M183.299,177.769v-33.501h209.807v33.501H183.299z M393.106,39.427v37.5h-54.604
                c-4.674,0-8.46,3.788-8.46,8.46c0,4.672,3.787,8.46,8.46,8.46h54.604v33.501H183.299V93.848h127.002c4.674,0,8.46-3.788,8.46-8.46
                c0-4.672-3.787-8.46-8.46-8.46H183.299v-37.5H393.106z"/>
            <path d="M235.188,211.157H8.46c-4.674,0-8.46,3.788-8.46,8.46v244.663c0,4.672,3.787,8.46,8.46,8.46h226.728
                c4.674,0,8.46-3.788,8.46-8.46V219.618C243.649,214.945,239.862,211.157,235.188,211.157z M226.728,308.279H16.921v-33.501h209.807
                V308.279z M226.728,325.199V358.7H16.921v-33.501H226.728z M226.728,228.078v29.778H16.921v-29.778H226.728z M16.921,455.82v-29.778
                h34.958c4.674,0,8.46-3.788,8.46-8.46s-3.787-8.46-8.46-8.46H16.921V375.62h209.807v33.501H80.081c-4.674,0-8.46,3.788-8.46,8.46
                c0,4.672,3.787,8.46,8.46,8.46h146.647v29.778L16.921,455.82L16.921,455.82z"/>
            <path d="M264.412,228.191c-4.674,0-8.46,3.788-8.46,8.46s3.787,8.46,8.46,8.46h91.367c4.674,0,8.46-3.788,8.46-8.46
                s-3.787-8.46-8.46-8.46H264.412z"/>
            <path d="M279.64,295.534c4.674,0,8.46-3.788,8.46-8.46c0-4.672-3.787-8.46-8.46-8.46h-15.228c-4.674,0-8.46,3.788-8.46,8.46
                c0,4.672,3.787,8.46,8.46,8.46H279.64z"/>
            <path d="M390.176,245.845c-67.175,0-121.824,54.65-121.824,121.824s54.65,121.824,121.824,121.824S512,434.844,512,367.67
                S457.35,245.845,390.176,245.845z M390.176,472.573c-57.843,0-104.904-47.059-104.904-104.904s47.06-104.904,104.904-104.904
                s104.904,47.059,104.904,104.904S448.019,472.573,390.176,472.573z"/>
            <path d="M465.17,359.209c-4.674,0-8.46,3.788-8.46,8.46c0,37.653-29.847,68.287-66.534,68.287
                c-36.686,0-66.533-30.633-66.533-68.287s29.847-68.287,66.533-68.287c26.771,0,50.827,16.347,61.282,41.644
                c1.785,4.318,6.73,6.372,11.052,4.587c4.317-1.785,6.371-6.732,4.587-11.05c-13.083-31.651-43.275-52.103-76.92-52.103
                c-46.017,0-83.454,38.224-83.454,85.208s37.438,85.208,83.454,85.208c46.018,0,83.455-38.224,83.455-85.208
                C473.63,362.997,469.843,359.209,465.17,359.209z"/>
        </svg>
    )
}

export const ReplenishmentFunds: React.FC<MoneyIconProps> = ({ IconSx: iconSx, BoxSx: boxSx, onClick }) => {
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { getUser } = useUserContext();
    const user = getUser();
    
    return (
        <Tooltip title = 'Add funds to wallet' arrow>
            <Box 
                sx = {{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: themeMode === 'light' ? theme.palette.grey[100] : theme.palette.action.focus
                    }
                }}
                style = {{
                    ...boxSx,
                }}
                onClick = {onClick}
            >
                <MoneyIcon IconSx={{
                    ...iconSx, // Применяем переданные стили
                }}/>
                <Typography 
                    sx = {{
                        color: 'text.primary',
                        marginLeft: '0.2rem'
                    }}
                >
                    {user.balance}
                </Typography>
                <Typography 
                    sx = {{
                        float: 'left',
                        marginLeft: '0.12rem',
                        marginRight: '0.12rem',
                        color: 'text.primary'
                    }}
                >
                    ₽
                </Typography>
                <AddBoxIcon sx = {{
                    color: 'primary.main',
                    fontSize: '1.75rem',
                    transition: 'color 1s ease',
                }}/>
            </Box>
        </Tooltip>
    )
}

export default ReplenishmentFunds;