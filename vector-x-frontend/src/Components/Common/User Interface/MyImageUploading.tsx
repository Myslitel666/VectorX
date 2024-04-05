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
                                className="image-item"
                            >
                                <img 
                                    src={imageList[0]['data_url']} 
                                    alt="" 
                                    style = {{
                                        width: '100%',
                                        height: '100%',
                                        minWidth: '25rem',
                                        minHeight: '25rem',
                                        objectFit: 'cover',
                                        //objectPosition: 'center' /* Центрируем изображение */
                                    }}
                                />
                                <div className="image-item__btn-wrapper">
                                    <MyButton
                                        variant='contained'
                                        onClick={() => onImageUpdate(0)}
                                        sx={{
                                            marginRight: '1rem',
                                            minWidth: '7.5rem',
                                        }}
                                    >
                                        Update
                                    </MyButton>
                                    <MyButton
                                        variant='contained'
                                        onClick={() => removeImage()}
                                        sx={{
                                            minWidth: '7.5rem'
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
