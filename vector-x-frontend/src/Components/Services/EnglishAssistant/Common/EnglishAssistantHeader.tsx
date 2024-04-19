//React Import
import React from 'react';

//MyComponents Import
import Header from '../../../Common/Header/Header';

const EnglishAssistantHeader: React.FC = () => {

    return (
        <>
            <Header
                serviceName='EnglishAssistant Pro'
                href='/english-assistant/home'
            />
        </>
    );
};

export default EnglishAssistantHeader;