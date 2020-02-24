import innloggingsstatusResponse from './innloggingsstatus-mock';
import varselinnboksResponse from './varselinnboks-mock';
import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import Environment from '../utils/Environment';

export const setUpMock = async () => {
    const loggingMiddleware: Middleware = (request, response) => {
        // console.log(request, response);
        return response;
    };

    const fetchMock = FetchMock.configure({
        enableFallback: true, // default: true
        ignoreMiddlewareIfFallback: true, // Edge er tullete
        middleware: MiddlewareUtils.combine(
            MiddlewareUtils.delayMiddleware(0),
            MiddlewareUtils.failurerateMiddleware(0.0),
            loggingMiddleware
        ),
    });

    console.log('Mock data enabled');
    fetchMock.get(Environment.innloggingslinjenUrl, innloggingsstatusResponse);

    fetchMock.get(
        `${Environment.varselinnboksUrl}/varsler(.*)`,
        varselinnboksResponse
    );

    fetchMock.post(
        `${Environment.varselinnboksUrl}/rest/varsel/erles/33475442`,
        ({ body }) => body
    );
};
