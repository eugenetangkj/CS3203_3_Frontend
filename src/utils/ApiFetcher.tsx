//Makes an API POST request
export const apiFetcherPost = async (apiEndpoint: string, requestBody: object): Promise<any> => {
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            return {};
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error making POST request:', error);
        return {};
    }
};
