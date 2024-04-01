//React Import
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

//MUI Import
import { CssBaseline } from '@mui/material';

//MyComponents Import
import { ColorModeProvider } from '../src/Context/ColorModeContext';
import { UserProvider } from '../src/Context/UserContext';
import Home from './Components/Pages/Home/Home';
import Registration from '../src/Components/Pages/Registration/Registration';
import Authorization from '../src/Components/Pages/Authorization/Authorization';
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
                        element={ <Home /> }
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
