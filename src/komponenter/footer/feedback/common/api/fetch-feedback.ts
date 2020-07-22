
function fetchFeedback(data: Object, url: RequestInfo) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch(url, requestOptions)
        .then(response => response)
        .then(data => data)
        .then(json => json)
}

export default fetchFeedback;