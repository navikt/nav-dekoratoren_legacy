import innloggingsstatusResponse from './innloggingsstatus-mock';
import { API } from '../api/api';
import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';

export default () => {
    const loggingMiddleware: Middleware = (request, response) => {
        return response;
    };

    const fetchMock = FetchMock.configure({
        enableFallback: true, // default: true
        middleware: MiddlewareUtils.combine(
            MiddlewareUtils.delayMiddleware(1000),
            MiddlewareUtils.failurerateMiddleware(0.0),
            loggingMiddleware
        ),
    });

    console.log('mock data enabled');

    fetchMock.get(API.innloggingsstatusURL, innloggingsstatusResponse);
};
