import { Request, Response } from 'express';

export const mockAuthHandler = (req: Request, res: Response) => {
    const mockAuth = {
        authenticated: true,
        name: 'LOKAL MOCK',
        securityLevel: '4',
    };

    res.json(mockAuth);
};
