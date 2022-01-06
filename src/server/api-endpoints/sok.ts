import fetch from 'node-fetch';
import { RequestHandler } from 'express';

const sokServiceUrl = `${process.env.API_XP_SERVICES_URL}/navno.nav.no.search/search2/sok`;

export const getSokHandler: RequestHandler = async (req, res) => {
    const queryString = new URL(req.url, process.env.APP_BASE_URL).search;
    const response = await fetch(`${sokServiceUrl}${queryString}`);

    if (response.status === 200) {
        const json = await response.json();
        return res.status(200).send(json);
    }

    return res.status(response.status).send(response.statusText);
};
