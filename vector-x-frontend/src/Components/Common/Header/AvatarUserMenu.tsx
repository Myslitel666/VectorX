//MUI Import
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

//MyComponents Import
import { useUserContext } from '../../../Context/UserContext';
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';

export default function NestedList() {
    const { themeMode, defaultAvatars }: ColorModeContextProps = useColorMode();
    const { getUser } = useUserContext();
    const theme = useTheme();
    let user = getUser();
    let defaultAvatarPath = themeMode === 'dark' ? defaultAvatars.dark : defaultAvatars.light;

    return (
        <>
            <Avatar
                alt="Avatar"
                src = {user.avatar ? user.avatar : defaultAvatarPath}
                sx={{
                    left: '-0.3rem'
                }}
            />
        </>
    );
}