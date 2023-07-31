import { RequestHandler } from 'express';
import { mock } from 'node:test';

const TOKEN_MOCK_SECONDS = 60 * 5.03;
const SESSION_MOCK_SECONDS = 60 * 60;

type MockAuth = {
    session: {
        created_at: string;
        ends_at: string;
        timeout_at: string;
        ends_in_seconds: number;
        active: boolean;
        timeout_in_seconds: number;
    };
    tokens: {
        expire_at: string;
        refreshed_at: string;
        expire_in_seconds: number;
        next_auto_refresh_in_seconds: number;
        refresh_cooldown: boolean;
        refresh_cooldown_seconds: number;
    };
};

let mockAuth: MockAuth | null = null;

const createMockSession = () => {
    const now = new Date();

    const sessionExpires = new Date(now.getTime() + SESSION_MOCK_SECONDS * 1000);
    const tokenExpires = new Date(now.getTime() + TOKEN_MOCK_SECONDS * 1000);

    mockAuth = {
        session: {
            created_at: now.toISOString(),
            ends_at: sessionExpires.toISOString(),
            timeout_at: sessionExpires.toISOString(),
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

const isTokenExpired = (auth: any) => {
    const now = new Date();
    const tokenExpires = new Date(auth.tokens.expire_at);
    return tokenExpires.getTime() < now.getTime();
};

const refreshToken = () => {
    if (!mockAuth) {
        createMockSession();
        throw new Error('Mock session not created');
    }
    if (!mockAuth) {
        throw new Error('Mock session not created');
    }
    const now = new Date();
    const newExpiresAt = new Date(new Date().getTime() + TOKEN_MOCK_SECONDS * 1000);
    mockAuth.tokens.expire_at = newExpiresAt.toISOString();
    mockAuth.tokens.refreshed_at = new Date().toISOString();
    mockAuth.tokens.expire_in_seconds = Math.round((newExpiresAt.getTime() - now.getTime()) / 1000);
};

const getMockSession = () => {
    if (!mockAuth) {
        createMockSession();
    }

    if (isTokenExpired(mockAuth)) {
        createMockSession();
    }

    if (!mockAuth) {
        throw new Error('Mock session not created');
    }

    return {
        ...mockAuth,
        session: {
            ...mockAuth.session,
            ends_in_seconds: Math.round((new Date(mockAuth.session.ends_at).getTime() - new Date().getTime()) / 1000),
            timeout_in_seconds: Math.round(
                (new Date(mockAuth.session.timeout_at).getTime() - new Date().getTime()) / 1000
            ),
        },
        tokens: {
            ...mockAuth.tokens,

            expire_in_seconds: Math.round(
                (new Date(mockAuth.tokens.expire_at).getTime() - new Date().getTime()) / 1000
            ),
            next_auto_refresh_in_seconds: Math.round(
                (new Date(mockAuth.tokens.expire_at).getTime() - new Date().getTime()) / 1000
            ),
        },
    };
};

export const getRefreshHandler: RequestHandler = (req, res) => {
    if (process.env.ENV === 'localhost') {
        refreshToken();
        res.status(200).send(getMockSession());
        return;
    }

    res.status(200).send({});
};

export const getSessionHandler: RequestHandler = (req, res) => {
    if (process.env.ENV === 'localhost') {
        res.status(200).send(getMockSession());
        return;
    }

    res.status(200).send({});
};
