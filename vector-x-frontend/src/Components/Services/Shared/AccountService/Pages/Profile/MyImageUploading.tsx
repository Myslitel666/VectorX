//React Import
import React, { useState, useEffect } from 'react';
//ImageUploading Import
import ImageUploading, { ImageListType } from 'react-images-uploading';
//MyComponent Import 
import MyButton from '../../../../../Common/User Interface/MyButton';
import { useColorMode, ColorModeContextProps } from '../../../../../../Context/ColorModeContext';
//MUI Import
import Box from '@mui/material/Box'

const MyImageUploading: React.FC = () => {
    const { themeMode }: ColorModeContextProps = useColorMode();
    let isHasAvatar = false;
    let userAvatar = ''
    let defaultAvatarPath = themeMode === 'dark' ? '/images/default-avatars/dark.jpg' : '/images/default-avatars/light.jpg';

    // Установка начального значения для imageList
    const [image, setImage] = React.useState<ImageListType>([
        {
            data_url: isHasAvatar? userAvatar : defaultAvatarPath
        }
    ]);
    const maxNumber = 1; // Задаем максимальное количество изображений равным 1

    useEffect(() => {
        setImage([
            {
                data_url: isHasAvatar? userAvatar : defaultAvatarPath
            }
        ]);
    }, [defaultAvatarPath, isHasAvatar]
    )

    const onChange = (imageList: ImageListType) => {
        // data for submit
        setImage(imageList);
    };

    const removeImage = () => {
        setImage([
            {
                data_url: defaultAvatarPath
            }
        ]);
        isHasAvatar = false;
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
                    // write your building UI
                    <div className="upload__image-wrapper">
                        {imageList.length > 0 && (
                            <div 
                                className="image-item" style={{ 
                                    width: '24rem', 
                                    height: '24rem', 
                                    borderRadius: '50%', 
                                    overflow: 'hidden'
                             }}
                            >
                                <img 
                                    src={imageList[0]['data_url']}
                                    alt="" 
                                    style = {{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                                <Box className="image-item__btn-wrapper" 
                                    style={{ 
                                        position: 'absolute', 
                                        top: '35.4rem', 
                                        left: '2.5rem', 
                                        width: '24rem',
                                        zIndex: 1,
                                    }}
                                    sx = {{
                                        '@media screen and (max-width: 850px)': {
                                            display: 'flow',
                                        },
                                    }}
                                >
                                    <MyButton
                                        variant='contained'
                                        onClick={() => onImageUpdate(0)}
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
                                        onClick={() => removeImage()}
                                        sx={{
                                            minWidth: '100%',
                                            height: '3.4rem'
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

export default MyImageUploading;
