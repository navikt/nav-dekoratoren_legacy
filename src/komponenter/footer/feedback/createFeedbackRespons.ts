import { TilbakemeldingRespons, Response } from '../../../store/reducers/tilbakemelding-duck';
import { v4 as uuidv4 } from 'uuid';
import Bowser from 'bowser';

export const createFeedbackRespons = (
    message: string,
    language: string,
    response: Response,
    responseReason?: string
): TilbakemeldingRespons => {
    const responseId = uuidv4();
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = uuidv4();
        sessionStorage.setItem('sessionId', sessionId);
    }

    const browserParser = Bowser.getParser(window.navigator.userAgent);

    return {
        responseId: responseId,
        sessionId: sessionId,
        response: response,
        responseReason: responseReason || '',
        message: message,
        href: window.location.href,
        browser: browserParser.getBrowserName(),
        os: browserParser.getOSName(),
        platform: browserParser.getPlatformType(),
        browserLanguage: window.navigator.language,
        appLocale: language,
    };
};
