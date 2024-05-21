//React Import
import { useNavigate } from 'react-router-dom';

//MUI Import
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShieldIcon from '@mui/icons-material/Shield';
import LogoutIcon from '@mui/icons-material/Logout';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import SchoolIcon from '@mui/icons-material/School';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ForumIcon from '@mui/icons-material/Forum';

export default function Profile() {
    const navigate = useNavigate();

    return (
        <>
            <ListItem
                disablePadding
                onClick={() => navigate('/profile')}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ConstructionOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Profile'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}

export function AdminPanel() {
    const navigate = useNavigate();

    return (
        <>
            <ListItem
                disablePadding
                onClick={() => navigate('/admin-panel')}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ShieldIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Admin Panel'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}

export function CourseManagement() {
    const navigate = useNavigate();

    return (
        <>
            <ListItem
                disablePadding
                onClick={() => navigate('/course-management')}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Course Management'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}

export function TakingCourses() {
    const navigate = useNavigate();

    return (
        <>
            <ListItem
                disablePadding
                onClick={() => navigate('/taking-courses')}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <PlayCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Taking Courses'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}

export function EducationalPrograms() {
    const navigate = useNavigate();

    return (
        <>
            <ListItem
                disablePadding
                onClick={() => navigate('/educational-programs')}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <EditCalendarIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Educational Programs'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}

export function ChatForum() {
    const navigate = useNavigate();

    return (
        <>
            <ListItem
                disablePadding
                onClick={() => navigate('/chat-forum')}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ForumIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Chat Forum'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}

export function LearningAnalytics() {
    const navigate = useNavigate();

    return (
        <>
            <ListItem
                disablePadding
                onClick={() => navigate('/learning-analytics')}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ForumIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Learning Analytics'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}

export function Logout() {
    const navigate = useNavigate();

    return (
        <>
            <ListItem
                disablePadding
                onClick={() => navigate('/auth')}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Log out'} />
                </ListItemButton>
            </ListItem>
        </>
    );
}