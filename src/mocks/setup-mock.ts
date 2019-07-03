import innloggingsstatusResponse from './innloggingsstatus-mock';
import sokeresultatResponse from './sokeresultat-mock';
import { API } from '../api/api';
import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';

export default () => {
    const loggingMiddleware: Middleware = (request, response) => {
        console.log(request.url, request.method, response);
        return response;
    };

    const fetchMock = FetchMock.configure({
        enableFallback: true, // default: true
        middleware: MiddlewareUtils.combine(
            MiddlewareUtils.delayMiddleware(200),
            MiddlewareUtils.failurerateMiddleware(0.0),
            loggingMiddleware
        ),
    });

    console.log('### FULL MOCK AKTIVERT! ###');

    fetchMock.get(API.innloggingsstatusURL, innloggingsstatusResponse);

    fetchMock.get(API.sokeresultat, sokeresultatResponse);
};
