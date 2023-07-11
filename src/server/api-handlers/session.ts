import { RequestHandler } from 'express';

const MOCK_SECONDS_TO_EXPIRY = 120;

const createMockSession = () => {
    const now = new Date();
    const sessionExpires = new Date(now.getTime() + 60 * 60 * 1000 * 6);
    const tokenExpires = new Date(now.getTime() + MOCK_SECONDS_TO_EXPIRY * 1000);

    return {
        session: {
            created_at: now.toISOString(),
            ends_at: sessionExpires.toString(),
            timeout_at: sessionExpires.toString(),
            ends_in_seconds: Math.round((sessionExpires.getTime() - now.getTime()) / 1000),
            active: true,
            timeout_in_seconds: Math.round((sessionExpires.getTime() - now.getTime()) / 1000),
        },
        tokens: {
            expire_at: tokenExpires.toISOString(),
            refreshed_at: now.toISOString(),
            expire_in_seconds: Math.round((tokenExpires.getTime() - now.getTime()) / 1000),
            next_auto_refresh_in_seconds: Math.round((tokenExpires.getTime() - now.getTime()) / 1000),
            refresh_cooldown: false,
            refresh_cooldown_seconds: 0,
        },
    };
};

export const getSessionHandler: RequestHandler = (req, res) => {
    if (process.env.ENV === 'localhost') {
        res.status(200).send(createMockSession());
        return;
    }

    res.status(200).send({});
};
