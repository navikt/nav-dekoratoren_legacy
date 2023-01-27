import Cookies from 'js-cookie';

/*
 * We keep the state of survey selection for a user in a cookie. When a survey has matched for a user
 * and been part of the selection draw, we should not attempt to show this to the user again for
 * <expireTimeDays> days.
 * */

type TaskAnalyticsState = Record<string, number>;

const cookieName = 'ta-dekoratoren';

const expireTimeDays = 30;
const expireTimeMs = expireTimeDays * 24 * 60 * 60 * 1000;

const setCookie = (state: TaskAnalyticsState) => {
    Cookies.set(cookieName, JSON.stringify(state), {
        expires: expireTimeDays,
        domain: '.nav.no',
    });
};

export const taskAnalyticsGetState = () => (Cookies.getJSON(cookieName) || {}) as TaskAnalyticsState;

export const taskAnalyticsSetSurveyMatched = (surveyId: string) => {
    const currentState = taskAnalyticsGetState();
    setCookie({ ...currentState, [surveyId]: Date.now() });
};

export const taskAnalyticsCleanState = () => {
    const prevState = taskAnalyticsGetState();
    if (!prevState) {
        return;
    }

    const now = Date.now();

    const currentState = Object.entries(prevState).reduce((acc, [surveyId, surveyMatchDate]) => {
        if (now - surveyMatchDate > expireTimeMs) {
            return acc;
        }

        return { ...acc, [surveyId]: surveyMatchDate };
    }, {});

    setCookie(currentState);
};
