//React Import
import React, { useEffect } from 'react';

//MyComponents Import
import Header from '../../../Common/Header/Header';

const EnglishAssistantHeader: React.FC = () => {

    return (
        <>
            <Header
                serviceName='EnglishAssistant Pro'
                href='/english-assistant/home'
                serviceNameSx={{
                    '@media screen and (max-width: 750px)': {
                        fontSize: '22.5px',
                        marginTop: '0.3rem'
                    }
                }}
            />
        </>
    );
};

export default EnglishAssistantHeader;