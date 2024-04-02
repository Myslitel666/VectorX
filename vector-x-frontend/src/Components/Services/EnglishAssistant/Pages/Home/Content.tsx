//MUI Import
import Box from '@mui/material/Box';

//MyCompoent Import
import LeftHalfScreen from '../Home/LeftHalfScreen'
import RightHalfScreen from '../Home/RightHalfScreen'

const Content: React.FC = () =>
{ 
    return (
        <>
            <Box width='60%' maxHeight='100vh'
                sx={{
                    float: 'left',
                    '@media screen and (max-width: 1000px)': {
                        float: 'none', width: '100%'
                    }
                }}
            >
                <LeftHalfScreen/>
            </Box>
            <Box padding='1rem' width='40%'
                paddingTop='5rem'
                sx={{
                    float: 'left',
                    position: 'absolute',
                    marginLeft: '60%',
                    //border: '1px solid #000',
                    '@media screen and (max-width: 1000px)': {
                        marginLeft: 0,
                        width: '100%',
                        paddingTop: '0rem'
                    }
                }}
            >
                <RightHalfScreen />
            </Box>
        </>
    );
}

export default Content;
