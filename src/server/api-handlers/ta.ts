import { RequestHandler } from 'express';
import fs from 'fs';

// To mock this locally, create the file /config/ta-config.json on the project root

const getTaConfig = () => {
    try {
        const taConfigFile = fs.readFileSync(`${process.cwd()}/config/ta-config.json`);
        return JSON.parse(taConfigFile.toString());
    } catch (e) {
        console.error(`Error reading Task Analytics config - ${e}`);
        return [];
    }
};

export const getTaskAnalyticsConfigHandler: RequestHandler = (req, res) => {
    const taConfig = getTaConfig();

    res.status(200).send(taConfig);
};
