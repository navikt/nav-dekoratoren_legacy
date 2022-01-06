import fetch from 'node-fetch';
import { RequestHandler } from 'express';

const driftsmeldingerUrl = `${process.env.API_XP_SERVICES_URL}/no.nav.navno/driftsmeldinger`;

export const getDriftsmeldingerHandler: RequestHandler = async (req, res) => {
    const response = await fetch(driftsmeldingerUrl);

    if (response.status === 200) {
        const json = await response.json();
        return res.status(200).send(json);
    }

    return res.status(response.status).send(response.statusText);
};
