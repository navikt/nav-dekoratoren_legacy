import { originDevelopment } from './utils';

export enum CookieName {
    DECORATOR_CONTEXT = 'decorator-context',
    DECORATOR_LANGUAGE = 'decorator-language',
}

const isDevelopment: boolean = process.env.NODE_ENV === 'development';

export function getCookieContextKey(origin: string): string {
    return originDevelopment(origin) ? 'dev' : 'prod';
}

export const cookieOptions = {
    path: '/',
    domain: isDevelopment ? 'localhost' : '.nav.no',
};
