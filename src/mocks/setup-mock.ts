import innloggingsstatusResponse from './innloggingsstatus-mock';
import varselinnboksResponse from './varselinnboks-mock';
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
            MiddlewareUtils.delayMiddleware(0),
            MiddlewareUtils.failurerateMiddleware(0.0),
            loggingMiddleware
        ),
    });

    console.log('Mock data enabled');

    fetchMock.get(API.innloggingsstatusURL, innloggingsstatusResponse);

    fetchMock.get(`${API.getVarselinnboksURL}(.*)`, varselinnboksResponse);

    fetchMock.post(`${API.postVarselinnboksURL}/33475442`, ({ body }) => body);

    fetchMock.get(API.sokeresultat, sokeresultatResponse);
};
