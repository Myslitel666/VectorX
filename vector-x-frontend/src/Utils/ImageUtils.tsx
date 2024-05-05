export const addImagePrefix = (image: string) => {
    const subString = 'data:image/png;base64,';

    if (image.startsWith(subString)) {
        return image;
    }

    return subString + image;
};

// В некоторых случаях в качестве изображения передаётся строка 'null'
export const isNullImage = (image: string) => {
    if (image === null || image === 'null' || image === '') {
        return true;
    }

    return false;
};