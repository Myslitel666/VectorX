//React Import
import React, { useState } from 'react';

//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//MyComponents Import
import { ColorModeContextProps, useColorMode } from '../../../Context/ColorModeContext';
import { useColorLabel } from '../../../Context/UseColorLabel';
import MyButton from '../User Interface/MyButton';

const PaymentMethodContent: React.FC<({ setPaymentMethodClick: React.Dispatch<React.SetStateAction<boolean>> })> = ({ setPaymentMethodClick }) => {

    //Context
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { getColorFromLabel } = useColorLabel('red');

    //Redux
    const paymentMethod = [
        {
            paymentMethodId: 1,
            paymentMethodTitle: 'Bank Card',
            paymentMethodNumber: '2202 2020 **** 0083',
            paymentMethodMark: 'VISA',
            avatar: 'images/vector-x/common/wallet/bank-card.svg',
        },
        {
            paymentMethodId: 2,
            paymentMethodTitle: 'Electronic Wallet',
            paymentMethodNumber: '',
            paymentMethodMark: 'QIWI',
            avatar: 'images/vector-x/common/wallet/electronic-wallet.svg',
        },
    ]

    // Создаем массив состояний для каждого Box'а
    const [, setIsHoveredBox] = useState(Array(paymentMethod.length).fill(false));
    const [boxStates] = useState<Array<{ lastClickedTime: Date | null; errorMessage: string }>>(
        Array(paymentMethod.length).fill({ lastClickedTime: null, errorMessage: '' })
    );

    return (
        <>
            <Typography
                fontSize='1.65rem'
                marginTop='-1rem'
                marginBottom='-0.75rem'
            >
                Payment Method
            </Typography>
            {paymentMethod.map((paymentMethod, index) => (
                <Box
                    key={index}
                    display='flex'
                    alignItems='center'
                    width='100%'
                    height='7.5rem'
                    margin='1.75rem auto 0'
                    border='1px solid'
                    borderColor={themeMode === 'light' ? '#cecece' : '#4d4d4d'}
                    borderRadius='0.6rem'
                    padding='1.25rem'
                    sx={{
                        cursor: 'pointer',
                        position: 'relative', // Для позиционирования значка DeleteIcon
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                    }}
                    onMouseEnter={() => {
                        setIsHoveredBox(prevState => prevState.map((value, i) => i === index ? true : value));
                    }}
                    onMouseLeave={() => {
                        setIsHoveredBox(prevState => prevState.map((value, i) => i === index ? false : value));
                    }}
                    onClick={() => {
                        //setOpen(true);
                        setPaymentMethodClick(true);
                    }}
                >
                    <img
                        alt="Avatar"
                        src={paymentMethod.avatar}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '5rem',
                            height: '5rem'
                        }}
                    />
                    <Box
                        sx={{
                            marginLeft: '1.25rem',
                        }}
                    >
                        {boxStates[index].errorMessage &&
                            <Typography sx={{
                                color: getColorFromLabel('red'),
                            }}
                            >
                                {boxStates[index].errorMessage}
                            </Typography>
                        }
                        <Typography style={{ fontWeight: 'bold' }}>
                            {paymentMethod.paymentMethodTitle}
                        </Typography>
                        <Typography>
                            {paymentMethod.paymentMethodNumber}
                        </Typography>
                        <Typography>
                            {paymentMethod.paymentMethodMark}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </>
    );
}

export const PayNowModalContent: React.FC = () => {
    const [amountSum, setAmountSum] = React.useState('');

    function hasDigits(str: string) {
        return /\d/.test(str);
    }

    return (
        <>
            <Typography
                fontSize='1.65rem'
                marginTop='-1rem'
                marginBottom='-0.75rem'
            >
                Replenishment of funds
            </Typography>
            <Box 
                display = 'flex'
                marginTop='1.5rem'
            >
                <Typography>
                    Enter the amount of money: 
                </Typography>
                <TextField 
                    sx = {{width: '100%'}}
                    label='amount of money'
                    placeholder='150Р'
                    onChange={(e) => {
                        const symbolsFilter = /[0-9]/; // Регулярное выражение, которое разрешает только цифры
                        if (e.target.value === '' || symbolsFilter.test(e.target.value)) {
                            setAmountSum(e.target.value);
                        }
                    }}
                    value={amountSum}
                />
            </Box>
            <MyButton 
                variant='contained'
                disabled={amountSum === ''}
                sx = {{
                    marginTop: '1rem',
                    width: '100%',
                    height: '3.3rem'
                }}
            >
                Pay Now
            </MyButton>
        </>
    );
}

export const Content: React.FC = () => {
    const [paymentMethodClick, setPaymentMethodClick] = React.useState(false);

    return (
        <>
        {paymentMethodClick ? 
            <PayNowModalContent/>
            : 
            <PaymentMethodContent setPaymentMethodClick = {setPaymentMethodClick}/>
        }
        </>
    )
}

export default Content;