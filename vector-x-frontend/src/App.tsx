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
import Authorization from './Components/Services/Shared/AccountService/Pages/Authorization/Auth';
import Profile from './Components/Services/Shared/AccountService/Pages/Profile/Profile'
import Redirect from '../src/Components/Common/Redirect'

//CSS Import
import '../src/App.css'

//Redux
import { Provider } from 'react-redux';
import store from './Store/store'; // Путь к файлу store

function App() {
    return (
        <Provider store={store} >
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
                            path="/profile"
                            element={<Profile />}
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
        </Provider>
    );
}

export default App;
