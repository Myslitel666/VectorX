//React Import
import React, { useEffect } from 'react';

//ImageUploading Import
import ImageUploading, { ImageListType } from 'react-images-uploading';

//MyComponent Import
import { useUserContext } from '../../../../../../Context/UserContext'
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
import { useColorMode, ColorModeContextProps } from '../../../../../../Context/ColorModeContext';
import MyButton from '../../../../../Common/User Interface/MyButton';

//MUI Import
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage, resetMessage, updateUnlockSaveButton } from './Store/slices/messageSlice'; // Action Import
import { RootState } from '../Profile/Store/store'; // Импорт типа RootState из файла store

//Utils Import
import {addImagePrefix, isNullImage} from '../../../../../../Utils/ImageUtils'

const MyImageUploading: React.FC = () => {
    const { themeMode, defaultAvatars }: ColorModeContextProps = useColorMode();
    const { getUser, updateAvatar } = useUserContext();
    const { getColorFromLabel } = useColorLabel('green');
    let user = getUser();
    let defaultAvatarPath = themeMode === 'dark' ? defaultAvatars.dark : defaultAvatars.light;

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const feedbackMessage = useSelector((state: RootState) => state.message.text);
    const isError = useSelector((state: RootState) => state.message.isError); 
    const unlockSaveButton = useSelector((state: RootState) => state.message.unlockSaveButton); 

    // Установка начального значения для imageList
    const [image, setImage] = React.useState<ImageListType>([
        {
            data_url: isNullImage(user.avatar) ? defaultAvatarPath : addImagePrefix(user.avatar)
        }
    ]);
    // dark and light default avatars
    const [darkDefaultAvatar] = React.useState<ImageListType>([{ data_url: defaultAvatars.dark}]);
    const [lightDefaultAvatar] = React.useState<ImageListType>([{ data_url: defaultAvatars.light }]);
    const maxNumber = 1; // Задаем максимальное количество изображений равным 1
    const [initialImage, setInitialImage] = React.useState<string>(image[0]['data_url']);

    const apiUrl = process.env.REACT_APP_API_URL as string;

    const onClickSave = async (avatar: string) => {

        const response = await fetch(`${apiUrl}/api/userDataRedaction/redactAvatar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.userId,
                avatar: avatar,
            }),
        });

        const jsonData = await response.json();

        dispatch(updateMessage({ text: jsonData.feedbackMessage, isError: jsonData.isError }));

        if (avatar === defaultAvatarPath) {
            updateAvatar('');
        }
        else {
            updateAvatar(avatar);
        }
    };

    useEffect(() => {
        if (image[0]['data_url'] === darkDefaultAvatar[0].data_url || image[0]['data_url'] === lightDefaultAvatar[0].data_url) {
            setImage([
                {
                    data_url: defaultAvatarPath
                }
            ]);
        }
    }, [defaultAvatarPath])

    useEffect(() => {
        
        if (initialImage === image[0]['data_url']) {
            dispatch(updateUnlockSaveButton(false));
        }
        else {
            if ((initialImage === darkDefaultAvatar[0]['data_url'] || initialImage === lightDefaultAvatar[0]['data_url']) && (image[0]['data_url'] === darkDefaultAvatar[0].data_url || image[0]['data_url'] === lightDefaultAvatar[0].data_url)) {
                dispatch(updateUnlockSaveButton(false));
            }
            else {
                dispatch(updateUnlockSaveButton(true));
            }
        }
    }, [image[0]['data_url']])

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(resetMessage());
        }, 1750);

        return () => clearTimeout(timer);
    }, [feedbackMessage, isError, dispatch]);

    const onChange = (imageList: ImageListType) => {
        setImage(imageList);
    };

    const removeImage = () => {
        setImage([
            {
                data_url: defaultAvatarPath
            }
        ]);
    };

    return (
        <div className="App">
            <ImageUploading
                value={image}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <div className="upload__image-wrapper">
                        <Typography sx={{
                            position: 'absolute',
                            top: '8.5rem',
                            left: '0.5rem',
                            textAlign: 'left',
                            color: isError ? getColorFromLabel('red') : getColorFromLabel('green'),
                        }}
                        >
                            {feedbackMessage}
                        </Typography>
                        {imageList.length > 0 && (
                            <div
                                className="image-item"
                            >
                                <Box sx={{
                                    marginLeft: '1.25rem',
                                    '@media screen and (max-width: 850px)': {
                                        marginRight: '0rem',
                                    },
                                }}>
                                    <div style={{
                                        marginTop: '1.9rem',
                                        display: 'flex', // Центрируем содержимое по горизонтали и вертикали
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <div
                                            style={{
                                                width: '20rem',
                                                height: '20rem',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <img
                                                src={imageList[0]['data_url']}
                                                alt=""
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Box>
                          
                                <Box className="image-item__btn-wrapper"
                                    sx={{
                                        width: '22.75rem',
                                        position: 'absolute',
                                        top: '32rem',
                                        paddingLeft: '0.5rem',
                                        paddingRight: '0.5rem',
                                        zIndex: 1,
                                        '@media screen and (max-width: 850px)': {
                                            display: 'flow',
                                            width: '100%',
                                        },
                                    }}
                                >
                                    <MyButton
                                        variant='contained'
                                        onClick={() => {
                                            onImageUpdate(0);
                                        }}
                                        sx={{
                                            marginBottom: '0.5rem',
                                            minWidth: '100%',
                                            height: '3.4rem',
                                        }}
                                    >
                                        Update
                                    </MyButton>
                                    <MyButton
                                        variant='contained'
                                        onClick={() => {
                                            removeImage();
                                        }}
                                        sx={{
                                            marginBottom: '0.5rem',
                                            minWidth: '100%',
                                            height: '3.4rem'
                                        }}
                                    >
                                        Remove
                                    </MyButton>
                                    <MyButton
                                        variant = 'contained'
                                        disabled = { !unlockSaveButton }
                                        onClick={() => {
                                            onClickSave(imageList[0]['data_url']);
                                            setInitialImage(imageList[0]['data_url']);
                                        }}
                                        sx={{
                                            marginBottom: '0.5rem',
                                            minWidth: '100%',
                                            height: '3.4rem'
                                        }}
                                    >
                                        Save
                                    </MyButton>
                                </Box>
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>

            </div>
    );
};

export default MyImageUploading;
