//React Import
import React, { useState, useEffect } from 'react';

//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//MyComponents Import
import { ColorModeContextProps, useColorMode } from '../../../Context/ColorModeContext';
import { useColorLabel } from '../../../Context/UseColorLabel';
import { useUserContext } from '../../../Context/UserContext';
import MyButton from '../User Interface/MyButton';

//fetch Import
import { topUpFunds } from './fetch/replenishmentFundsFetch';

const PaymentMethodContent: React.FC<({ setPaymentMethodClick: React.Dispatch<React.SetStateAction<boolean>> })> = ({ setPaymentMethodClick }) => {

    //Context
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { getColorFromLabel } = useColorLabel('red');

    const paymentMethod = [
        {
            paymentMethodId: 1,
            paymentMethodTitle: 'Bank Card',
            paymentMethodNumber: '2202 2020 **** 0083',
            paymentMethodMark: 'VISA',
            avatar: '/images/vector-x/common/wallet/bank-card.svg',
        },
        {
            paymentMethodId: 2,
            paymentMethodTitle: 'Electronic Wallet',
            paymentMethodNumber: '',
            paymentMethodMark: 'QIWI',
            avatar: '/images/vector-x/common/wallet/electronic-wallet.svg',
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

export const PayNowModalContent: React.FC<({ setOpen: React.Dispatch<React.SetStateAction<boolean>> })> = ({ setOpen }) => {
    const [amountSum, setAmountSum] = React.useState('');
    const [feedbackMessage, setFeedbackMessage] = React.useState('');
    const [isError, setIsError] = React.useState(true);
    const { getColorFromLabel } = useColorLabel('green');
    const { getUser, updateBalance } = useUserContext();
    const user = getUser();

    const updateFeedbackMessage = (isError: boolean, message: string) => {
        setIsError(isError);
        setFeedbackMessage(message);
    };

    const handleOnClick = () => {
        const amountSumInt = parseInt(amountSum);

        if (amountSumInt < 150) {
            updateFeedbackMessage(true, '✘You need to deposit at least 150₽ into the wallet');
        }
        else {
            topUpFunds(user.userId, amountSumInt)
            .then(data => {
                updateFeedbackMessage(data.isError, data.feedbackMessage);
            });
        }
    }

    useEffect(() => {
        if (isError) {
            const timeoutId = setTimeout(() => {
                updateFeedbackMessage(true, '');
            }, 3000);
    
            // Очистить таймаут, чтобы избежать утечек при размонтировании компонента
            return () => clearTimeout(timeoutId);
        }
        else {
            updateBalance(user.balance + parseInt(amountSum));

            const timeoutId = setTimeout(() => {
                updateFeedbackMessage(true, '');
                setOpen(false);
            }, 1250);
    
            // Очистить таймаут, чтобы избежать утечек при размонтировании компонента
            return () => clearTimeout(timeoutId);
        }
    }, [feedbackMessage, isError]);

    return (
        <>
            <Typography
                fontSize='1.65rem'
                marginTop='-1rem'
                marginBottom='-0.75rem'
            >
                Replenishment of funds
            </Typography>
            <Typography 
                marginTop='0.75rem'
                sx={{
                    textAlign: 'left',
                    color: isError ? getColorFromLabel('red') : getColorFromLabel('green'),
                }}
            >
                {feedbackMessage}
            </Typography>
            <Box 
                display = 'flex'
                marginTop= {feedbackMessage ? '1rem' : '1.5rem'}
            >
                <Typography>
                    Enter the amount of money: 
                </Typography>
                <TextField 
                    sx = {{width: '100%'}}
                    label='amount of money'
                    placeholder='150Р'
                    onChange={(e) => {
                        const symbolsFilter = /^[0-9]*$/; // Регулярное выражение, которое разрешает только цифры
                        if (symbolsFilter.test(e.target.value)) {
                            setAmountSum(e.target.value);
                        }
                    }}
                    value={amountSum}
                />
            </Box>
            <MyButton 
                variant='contained'
                disabled={amountSum === ''}
                onClick={handleOnClick}
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

export const Content: React.FC<({ setOpen: React.Dispatch<React.SetStateAction<boolean>> })> = ({ setOpen }) => {
    const [paymentMethodClick, setPaymentMethodClick] = React.useState(false);

    return (
        <>
        {paymentMethodClick ? 
            <PayNowModalContent setOpen={setOpen}/>
            : 
            <PaymentMethodContent setPaymentMethodClick = {setPaymentMethodClick}/>
        }
        </>
    )
}

export default Content;