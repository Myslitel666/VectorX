//React Import
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

//ImageUploading Import
import ImageUploading, { ImageListType } from 'react-images-uploading';

//MyComponent Import
import { useUserContext } from '../../../../../../Context/UserContext'
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
import { useColorMode, ColorModeContextProps } from '../../../../../../Context/ColorModeContext';
import MyButton from '../../../../../Common/User Interface/MyButton';

//MUI Import
import Box from '@mui/material/Box'

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar, updateIsLoadedAvatar } from '../../../../../../Store/slices/courseCreationSlice';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store

//Utils Import
import {addImagePrefix, isNullImage} from '../../../../../../Utils/ImageUtils'

const CourseImageUploading: React.FC = () => {
    const { themeMode, defaultAvatars }: ColorModeContextProps = useColorMode();
    const { getUser, updateAvatar } = useUserContext();
    const { getColorFromLabel } = useColorLabel('green');
    let user = getUser();
    let defaultAvatarPath = themeMode === 'dark' ? defaultAvatars.courseDark : defaultAvatars.courseLight;
    const isDesktop = useMediaQuery({ minWidth:900 });

    //Redux
    const courseId = useSelector((state: RootState) => state.createdCourse.courseId);

    // Установка начального значения для imageList
    const [image, setImage] = React.useState<ImageListType>([
        {
            data_url: courseId === -1 ? defaultAvatarPath : 'null'
        }
    ]);

    const [darkDefaultAvatar] = React.useState<ImageListType>([{ data_url: defaultAvatars.courseDark}]);
    const [lightDefaultAvatar] = React.useState<ImageListType>([{ data_url: defaultAvatars.courseLight }]);
    const maxNumber = 1; // Задаем максимальное количество изображений равным 1
    const [initialImage, setInitialImage] = React.useState<string>(image[0]['data_url']);
    const [unlockSaveButton, setUnlockSaveButton] = React.useState(false);

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
            setUnlockSaveButton(false);
        }
        else {
            if ((initialImage === darkDefaultAvatar[0]['data_url'] || initialImage === lightDefaultAvatar[0]['data_url']) && (image[0]['data_url'] === darkDefaultAvatar[0].data_url || image[0]['data_url'] === lightDefaultAvatar[0].data_url)) {
                setUnlockSaveButton(false);
            }
            else {
                setUnlockSaveButton(true);
            }
        }
    }, [image[0]['data_url']])

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
                        {imageList.length > 0 && (
                            <div
                                className="image-item"
                            >
                                <div style={{
                                    marginTop: '1rem',
                                    display: 'flex', // Центрируем содержимое по горизонтали и вертикали
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <div
                                        style={{
                                            width: '18rem',
                                            height: '18rem',
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
                          
                                <Box className="image-item__btn-wrapper"
                                    sx={{
                                        display: isDesktop ? '' : 'flow',
                                        width: isDesktop ? '18rem' : '100%',
                                        position: 'absolute',
                                        top: '28rem',
                                        paddingRight: isDesktop ? '' : '1rem',
                                        zIndex: 1,
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
                                            height: '3.7rem',
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
                                            height: '3.7rem'
                                        }}
                                    >
                                        Remove
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

export default CourseImageUploading;
