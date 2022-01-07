import fetch from 'node-fetch';
import { RequestHandler } from 'express';

const sokServiceUrl = `${process.env.API_XP_SERVICES_URL}/navno.nav.no.search/search2/sok`;

export const getSokHandler: RequestHandler = (req, res) => {
    const queryString = new URL(req.url, process.env.APP_BASE_URL).search;

    fetch(`${sokServiceUrl}${queryString}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.error(`Search failed for query ${queryString} - ${response.statusText}`);
                return res.status(response.status).send(response.statusText);
            }
        })
        .then((json) => {
            return res.status(200).send(json);
        })
        .catch((err) => {
            console.error(`Failed to fetch for search query ${queryString} - ${err}`);
            return res.status(500).send('Unknown server error');
        });
};
