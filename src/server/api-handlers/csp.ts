import { RequestHandler } from 'express';
import { cspDirectives } from '../../csp';

export const getCspHandler: RequestHandler = (req, res) => {
    res.status(200).send(cspDirectives);
};
