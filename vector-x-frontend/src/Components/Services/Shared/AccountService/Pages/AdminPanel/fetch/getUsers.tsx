const apiUrl = process.env.REACT_APP_API_URL as string;

export const getUsers = async () => {
    const response = await fetch(`${apiUrl}/api/adminPanel/getUsers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return data.userDtos;
};