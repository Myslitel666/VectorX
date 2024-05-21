//React Import
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

//MUI Import
import { CssBaseline } from '@mui/material';

//MyComponents Import
import { ColorModeProvider } from '../src/Context/ColorModeContext';
import { UserProvider } from '../src/Context/UserContext';
import Redirect from '../src/Components/Common/Redirect'
import Home from './Components/Services/VectorX/Pages/Home/Home';
import Registration from './Components/Services/Shared/AccountService/Pages/Registration/Registration'; //Account Service
import Authorization from './Components/Services/Shared/AccountService/Pages/Authorization/Auth';
import Profile from './Components/Services/Shared/AccountService/Pages/Profile/Profile';
import AdminPanel from './Components/Services/Shared/AccountService/Pages/AdminPanel/AdminPanel';
import CourseManagement from './Components/Services/VectorX/Pages/CourseManagement/CourseManagement'; //Vector X
import TakingCourses from './Components/Services/VectorX/Pages/TakingCourses/TakingCourses';
import EducationalPrograms from './Components/Services/VectorX/Pages/EducationalPrograms/EducationalPrograms';
import ChatForum from './Components/Services/VectorX/Pages/ChatForum/ChatForum';
import LearningAnalytics from './Components/Services/VectorX/Pages/LearningAnalytics/LearningAnalytics';
import EnglishAssistantHome from './Components/Services/EnglishAssistant/Pages/Home/Home'; //EnglishAssistant Pro

//CSS Import
import '../src/App.css'

//Redux
import { Provider } from 'react-redux';
import store from './Store/store'; // Путь к файлу store

function App() {
    return (
        <Provider store={store}>
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
                        path="/reg"
                        element={<Registration />}
                    />
                    <Route
                        path="/auth"
                        element={<Authorization />}
                    />
                    <Route
                        path="/profile"
                        element={<Profile />}
                    />
                    <Route
                        path="/admin-panel"
                        element={<AdminPanel />}
                    />
                    <Route
                        path="/course-management"
                        element={<CourseManagement />}
                    />
                    <Route
                        path="/taking-courses"
                        element={<TakingCourses />}
                    />
                    <Route
                        path="/educational-programs"
                        element={<EducationalPrograms />}
                    />
                    <Route
                        path="/chat-forum"
                        element={<ChatForum />}
                    />
                    <Route
                        path="/learning-analytics"
                        element={<LearningAnalytics />}
                    />
                    <Route
                        path="/english-assistant/home"
                        element={<EnglishAssistantHome />}
                    />
                </Routes>
            </Router>
        </UserProvider>
        </ColorModeProvider>
        </Provider>
    );
}

export default App;
