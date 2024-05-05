//MUI Import
import Avatar from '@mui/material/Avatar';

//MyComponents Import
import { useUserContext } from '../../../Context/UserContext';
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';

//Utils Import
import {addImagePrefix, isNullImage} from '../../../Utils/ImageUtils'

export default function AvatarUserMenu() {
    const { themeMode, defaultAvatars }: ColorModeContextProps = useColorMode();
    const { getUser } = useUserContext();
    let user = getUser();
    let defaultAvatarPath = themeMode === 'dark' ? defaultAvatars.dark : defaultAvatars.light;

    return (
        <>
            <Avatar
                alt="Avatar"
                src={isNullImage(user.avatar) ? defaultAvatarPath : addImagePrefix(user.avatar)}
                sx={{
                    left: '-0.3rem'
                }}
            />
        </>
    );
}