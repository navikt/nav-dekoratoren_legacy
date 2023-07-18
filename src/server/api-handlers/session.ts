import { RequestHandler } from 'express';

const TOKEN_MOCK_SECONDS = 60 * 5.03;
const SESSION_MOCK_SECONDS = TOKEN_MOCK_SECONDS;

const createMockSession = () => {
    const now = new Date();
    const sessionExpires = new Date(now.getTime() + SESSION_MOCK_SECONDS * 1000);
    const tokenExpires = new Date(now.getTime() + TOKEN_MOCK_SECONDS * 1000);

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
