import { RequestHandler } from 'express';
import fs from 'fs';

const readTaConfig = () => {
    try {
        const taConfigFile = fs.readFileSync(`${process.cwd()}/config/ta-config.json`);
        return JSON.parse(taConfigFile.toString());
    } catch (e) {
        console.error(`Error reading Task Analytics config - ${e}`);
        return {};
    }
};

const taConfig = readTaConfig();

console.log(`cwd: ${process.cwd()}`);
console.log(`config: ${JSON.stringify(taConfig)}`);

export const getTaskAnalyticsConfigHandler: RequestHandler = (req, res) => {
    res.status(200).send(taConfig);
};
