export const fetchData = async (url, post = false, body = undefined) => {
    try {
        if (!post) {
            const response = await fetch(process.env.REACT_APP_BASE_URL + url);
            const res = await response.json();
            return res;
        }
        else {
            const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const res = await response.json();
            return res;
        }
    }
    catch (error) {
        console.log(error);
    }
}