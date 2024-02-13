import { RequestHandler } from 'express';

const sokServiceUrl = `${process.env.SEARCH_URL}/content/decorator-search`;

export const getSokHandler: RequestHandler = (req, res) => {
    const queryString = new URL(req.url, process.env.APP_BASE_URL).search;

    console.log(sokServiceUrl);

    console.log(queryString);

    fetch(`${sokServiceUrl}${queryString}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
        })
        .then((json) => {
            res.status(200).send(json);
        })
        .catch((err) => {
            console.error(`Failed to fetch for search query ${queryString} - ${err}`);
            res.status(500).send('Failed to fetch from search service');
        });
};
