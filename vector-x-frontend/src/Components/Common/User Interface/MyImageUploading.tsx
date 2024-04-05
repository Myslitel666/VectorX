//React Import
import React from 'react';
//ImageUploading Import
import ImageUploading, { ImageListType } from 'react-images-uploading';
//MyComponent Import 
import MyButton from './MyButton';

// Путь к изображению по умолчанию
const defaultImageURL = '/images/default-avatars/light.jpg';

const MyImageUploading: React.FC = () => {
    // Установка начального значения для imageList
    const [image, setImage] = React.useState<ImageListType>([
        {
            data_url: defaultImageURL
        }
    ]);
    const maxNumber = 1; // Задаем максимальное количество изображений равным 1

    const onChange = (imageList: ImageListType) => {
        // data for submit
        console.log(imageList);
        setImage(imageList);
    };

    const removeImage = () => {
        setImage([
            {
                data_url: defaultImageURL
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
                    // write your building UI
                    <div className="upload__image-wrapper">
                        {imageList.length > 0 && (
                            <div 
                                className="image-item" style={{ 
                                    width: '25rem', 
                                    height: '25rem', 
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
                                <div className="image-item__btn-wrapper" 
                                    style={{ 
                                        position: 'absolute', 
                                        top: '36rem', 
                                        left: '5rem', 
                                        width: '25rem',
                                        zIndex: 1,
                                        display: 'flex' }}>
                                    <MyButton
                                        variant='contained'
                                        onClick={() => onImageUpdate(0)}
                                        sx={{
                                            marginRight: '1rem',
                                            minWidth: '50%',
                                        }}
                                    >
                                        Update
                                    </MyButton>
                                    <MyButton
                                        variant='contained'
                                        onClick={() => removeImage()}
                                        sx={{
                                            minWidth: '50%'
                                        }}
                                    >
                                        Remove
                                    </MyButton>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default MyImageUploading;
