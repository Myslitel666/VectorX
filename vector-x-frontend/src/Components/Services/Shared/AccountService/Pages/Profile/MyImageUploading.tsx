//React Import
import React, { useState, useEffect } from 'react';
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

const MyImageUploading: React.FC = () => {
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { getUser, updateAvatar } = useUserContext();
    const { getColorFromLabel } = useColorLabel('green');
    let user = getUser();
    let defaultAvatarPath = themeMode === 'dark' ? '/images/default-avatars/dark.jpg' : '/images/default-avatars/light.jpg';

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const feedbackMessage = useSelector((state: RootState) => state.message.text);
    const isError = useSelector((state: RootState) => state.message.isError); 
    const unlockSaveButton = useSelector((state: RootState) => state.message.unlockSaveButton); 

    const addImagePrefix = (image: string) => {
        const subString = 'data:image/png;base64,';

        if (image.startsWith(subString)) {
            return image;
        }

        return subString + image;
    };

    // Установка начального значения для imageList
    const [image, setImage] = React.useState<ImageListType>([
        {
            data_url: user.avatar ? addImagePrefix(user.avatar) : defaultAvatarPath
        }
    ]);
    // dark and light default avatars
    const [darkDefaultAvatar, setDarkDefaultAvatar] = React.useState<ImageListType>([{data_url: '/images/default-avatars/dark.jpg'}]);
    const [lightDefaultAvatar, setLightDefaultAvatar] = React.useState<ImageListType>([{ data_url: '/images/default-avatars/light.jpg' }]);
    const maxNumber = 1; // Задаем максимальное количество изображений равным 1
    const [initialImage, setInitialImage] = React.useState<string>(image[0]['data_url']);

    const [isAvatarChanged, setIsAvatarChanged] = useState(false);

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

        if (imageList[0].data_url !== image[0].data_url) {
            setIsAvatarChanged(true);
        }
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
                                textAlign: 'left',
                                color: isError ? getColorFromLabel('red') : getColorFromLabel('green'),
                            }}
                            >
                                {feedbackMessage}
                            </Typography>
                        {imageList.length > 0 && (
                            <div
                                className="image-item"
                                style={{
                                    width: '20rem',
                                    height: '20rem',
                                    borderRadius: '50%',
                                    overflow: 'hidden'
                                }}
                            >
                                <img
                                    src={imageList[0]['data_url'] }
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                                <Box className="image-item__btn-wrapper"
                                    style={{
                                        position: 'absolute',
                                        top: '32rem',
                                        left: '1.25rem',
                                        width: '22.75rem',
                                        zIndex: 1,
                                    }}
                                    sx={{
                                        '@media screen and (max-width: 850px)': {
                                            display: 'flow',
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
                                            height: '3.4rem'
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
