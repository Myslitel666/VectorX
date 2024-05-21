const apiUrl = process.env.REACT_APP_API_URL as string;

export const topUpFunds = async (userId: number, funds: number) => {
    const response = await fetch(`${apiUrl}/api/vectorX/taking-courses/topUpFunds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            funds: funds,
        }),
    });

    const data = await response.json();

    return data;
};