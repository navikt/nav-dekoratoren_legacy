import { createProxyMiddleware } from 'http-proxy-middleware';
import { getSession, refreshSession } from '../mock/mockSession';

const proxyBaseTarget = `${process.env.APP_BASE_URL}/oauth2`;

export const sessionProxyConfig = createProxyMiddleware({
    target: `${proxyBaseTarget}/session`,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        if (process.env.ENV === 'localhost') {
            const session = getSession();
            res.json(session);
            return;
        }
        // Copy all headers from the original request to the proxy request
        Object.entries(req.headers).forEach(([key, value]) => {
            proxyReq.setHeader(key, value as string);
        });
    },
});

export const refreshProxyConfig = createProxyMiddleware({
    target: `${proxyBaseTarget}/session/refresh`,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        if (process.env.ENV === 'localhost') {
            const session = refreshSession();
            res.json(session);
            return;
        }
        // Copy all headers from the original request to the proxy request
        Object.entries(req.headers).forEach(([key, value]) => {
            proxyReq.setHeader(key, value as string);
        });
    },
});
