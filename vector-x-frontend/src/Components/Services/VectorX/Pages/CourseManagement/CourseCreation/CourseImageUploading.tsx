//React Import
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

//ImageUploading Import
import ImageUploading, { ImageListType } from 'react-images-uploading';

//MyComponent Import
import { useColorMode, ColorModeContextProps } from '../../../../../../Context/ColorModeContext';
import MyButton from '../../../../../Common/User Interface/MyButton';

//MUI Import
import Box from '@mui/material/Box'

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateCourseAvatar, updateIsLoadedAvatar } from '../../../../../../Store/slices/courseCreationSlice';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store

//fetch import
import { getCourseById } from './fetch/courseManagementFetch';

//interfaces import
import { Course } from '../../../Interfaces/interfaces';

//Utils Import
import { addImagePrefix } from '../../../../../../Utils/ImageUtils';

const CourseImageUploading: React.FC = () => {
    const { themeMode, defaultAvatars }: ColorModeContextProps = useColorMode();
    let defaultAvatarPath = themeMode === 'dark' ? defaultAvatars.courseDark : defaultAvatars.courseLight;
    const isDesktop = useMediaQuery({ minWidth:900 });

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const courseId = useSelector((state: RootState) => state.createdCourse.courseId);
    const avatar = useSelector((state: RootState) => state.createdCourse.avatar);

    // Установка начального значения для imageList
    const [image, setImage] = React.useState<ImageListType>([
        {
            data_url: courseId === -1 ? defaultAvatarPath : addImagePrefix(avatar)
        }
    ]);

    const [darkDefaultAvatar] = React.useState<ImageListType>([{ data_url: defaultAvatars.courseDark}]);
    const [lightDefaultAvatar] = React.useState<ImageListType>([{ data_url: defaultAvatars.courseLight }]);
    const maxNumber = 1; // Задаем максимальное количество изображений равным 1
    const [draft, setDraft] = useState<Course>();

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
        if (courseId != -1) {
            getCourseById(courseId)
                .then(draft => {
                    setDraft(draft);
                });
        }
    }, []);

    useEffect(() => {
        if (draft) {
            setImage([
                {
                    data_url: addImagePrefix(draft.courseAvatar)
                }
            ]);
        }
    }, [draft]);

    const onChange = (imageList: ImageListType) => {
        setImage(imageList);
        dispatch(updateCourseAvatar(imageList[0]['data_url']))
    };

    const removeImage = () => {
        setImage([
            {
                data_url: defaultAvatarPath
            }
        ]);
        dispatch(updateCourseAvatar(''));
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
