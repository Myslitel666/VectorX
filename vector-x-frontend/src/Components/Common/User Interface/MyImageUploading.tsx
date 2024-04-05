//React Import
import React from 'react';
//ImageUploading Import
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
//MyComponent Import 
import MyButton from './MyButton'

const MyImageUploading: React.FC = () => {
    const [images, setImages] = React.useState<ImageListType>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex?: number[] | undefined) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
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
                        <MyButton
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            variant='contained'
                            {...dragProps}
                        >
                            Click or Drop here
                        </MyButton>
                        &nbsp;
                        <MyButton
                            variant='contained'
                            onClick={onImageRemoveAll}
                        >
                            Remove all images
                        </MyButton>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <MyButton
                                        variant='contained'
                                        onClick={() => onImageUpdate(index)}
                                        sx={{
                                            marginRight: '1rem',
                                            minWidth: '7.5rem',
                                        }}
                                    >
                                        Update
                                    </MyButton>
                                    <MyButton
                                        variant='contained'
                                        onClick={() => onImageRemove(index)}
                                        sx={{
                                            minWidth: '7.5rem'
                                        }}
                                    >
                                        Remove
                                    </MyButton>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}

export default MyImageUploading;
