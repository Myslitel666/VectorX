//React Import
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

//MUI Import
import { CssBaseline } from '@mui/material';

//MyComponents Import
import { ColorModeProvider } from '../src/Context/ColorModeContext';
import { UserProvider } from '../src/Context/UserContext';
import EnglishAssistantHome from './Components/Services/EnglishAssistant/Pages/Home/Home';
import Home from './Components/Services/VectorX/Pages/Home/Home';
import Registration from './Components/Services/Shared/AccountService/Pages/Registration/Registration';
import Authorization from './Components/Services/Shared/AccountService/Pages/Authorization/Authorization';
import Redirect from '../src/Components/Common/Redirect'

//CSS Import
import '../src/App.css'

function App() {
    return (
        <ColorModeProvider>
        <UserProvider>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<Redirect />}
                    />
                    <Route
                        path="/home"
                        element={<Home />}
                    />
                    <Route
                        path="/english-assistant/home"
                        element={ <EnglishAssistantHome /> }
                    />
                    <Route
                        path="/reg"
                        element={ <Registration /> }
                    />
                    <Route
                        path="/auth"
                        element={ <Authorization /> }
                    />
                </Routes>
                </Router>
        </UserProvider>
        </ColorModeProvider>
    );
}

export default App;
