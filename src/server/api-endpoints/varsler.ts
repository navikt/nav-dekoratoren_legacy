import { createProxyMiddleware } from 'http-proxy-middleware';
import { IncomingMessage } from 'http';
import { Request, Response } from 'express';

export const varselInnboksProxyUrl = `${process.env.APP_BASE_PATH || ``}/api/varsler`;

export const varselInnboksProxyHandler = createProxyMiddleware(varselInnboksProxyUrl, {
    target: `${process.env.API_VARSELINNBOKS_URL}`,
    pathRewrite: { [`^${varselInnboksProxyUrl}`]: '' },
    changeOrigin: true,
    onProxyRes: (proxyRes: IncomingMessage, req: Request, res: Response) => {
        const requestHeaders = req.headers['access-control-request-headers'];
        if (requestHeaders) {
            proxyRes.headers['access-control-allow-headers'] = requestHeaders;
        }
    },
});
