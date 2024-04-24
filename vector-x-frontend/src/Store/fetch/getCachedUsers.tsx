const apiUrl = process.env.REACT_APP_API_URL as string;

export const getCachedUsers = async (userIds: number[]) => {
    const response = await fetch(`${apiUrl}/api/auth/getCachedUsers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userIds: userIds,
        }),
    });

    const data = await response.json();

    return data.userDtos;
};