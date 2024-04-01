//React Import
import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface HomeContextProps {
    jargonState: [string, React.Dispatch<React.SetStateAction<string>>];
    translateState: [string, React.Dispatch<React.SetStateAction<string>>];
    idState: [string, React.Dispatch<React.SetStateAction<string>>];
    exampleOfUseState: [string, React.Dispatch<React.SetStateAction<string>>];
    rowsState: [Row[], React.Dispatch<React.SetStateAction<Row[]>>];
    backupRowsState: [Row[], React.Dispatch<React.SetStateAction<Row[]>>];
    fetchJargon: (userId: number) => void;
}

const HomeContext = createContext<HomeContextProps | undefined>(undefined);

export const useHomeContext = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error('useDictionaryEditor must be used within a DictionaryEditorProvider');
    }
    return context;
};

interface HomeProviderProps {
    children: ReactNode;
}

type Row = {
    id: string;
    jargon: string;
    translate: string;
    exampleOfUse: string;
};

type Jargon = {
    jargonId: number;
    jargonInstance: string;
    translate: string;
    exampleOfUse: string;
};

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
    const [jargon, setJargon] = useState('');
    const [translate, setTranslate] = useState('');
    const [id, setId] = useState('');
    const [exampleOfUse, setExampleOfUse] = useState('');

    const [rows, setRows] = useState<Row[]>([]);
    const [backupRows, setBackupRows] = useState<Row[]>([]);

    const apiUrl = process.env.REACT_APP_API_URL as string;

    const fetchJargon = async (userId: number) => {
        const response = await fetch(`${apiUrl}/api/english-assistant/home/getUserJargons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
            }),
        });

        const jsonData = await response.json();

        const rows = jsonData.map((item: Jargon) => ({
            id: item.jargonId.toString(), // Преобразуйте jargonId в строку
            jargon: item.jargonInstance,
            translate: item.translate,
            exampleOfUse: item.exampleOfUse,
        }));

        setRows(rows);
        setBackupRows(rows);
    };

    const contextValue: HomeContextProps = {
        jargonState: [jargon, setJargon],
        translateState: [translate, setTranslate],
        idState: [id, setId],
        exampleOfUseState: [exampleOfUse, setExampleOfUse],
        rowsState: [rows, setRows],
        backupRowsState: [backupRows, setBackupRows],
        fetchJargon: fetchJargon
    };

    return (
        <HomeContext.Provider value={contextValue}>
            {children}
        </HomeContext.Provider>
    );
}
