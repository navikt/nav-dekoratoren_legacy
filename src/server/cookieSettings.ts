import { orginDevelopment } from './utils';

export enum CookieName {
    DECORATOR_CONTEXT = 'decorator-context',
    DECORATOR_LANGUAGE = 'decorator-language',
    DECORATOR_LOGOUT_WARNING = 'decorator-logout-warning',
    SELVBETJENING_IDTOKEN = 'selvbetjening-idtoken'
}

const isDevelopment: boolean = process.env.NODE_ENV === 'development';

export function getCookieContextKey(origin: string): string {
    return orginDevelopment(origin) ? 'dev' : 'prod'
}

export const cookieOptions = {
    path: '/',
    domain: isDevelopment ? 'localhost' : '.nav.no'
};