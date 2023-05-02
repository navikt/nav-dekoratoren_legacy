import Cookies from 'js-cookie';

/*
 * We keep the state of survey selection for the user in a cookie. When a survey has matched for a user
 * and has been part of the selection draw, we should not attempt to draw this for this user again for
 * <expireTimeDays> days. Also, if a survey is selected in a draw, we only want to show this survey for
 * the next <expireTimeDays> days
 * */

type TaskAnalyticsState = { selected?: { id: string; ts: number }; matched?: Record<string, number> };

const cookieName = 'ta-dekoratoren-v2';

const expireTimeDays = 30;
const expireTimeMs = expireTimeDays * 24 * 60 * 60 * 1000;

const setCookie = (state: TaskAnalyticsState) => {
    Cookies.set(cookieName, JSON.stringify(state), {
        expires: expireTimeDays,
        domain: '.nav.no',
    });
};

export const taskAnalyticsGetState = (): TaskAnalyticsState => {
    const cookie = Cookies.get(cookieName);
    if (!cookie) {
        return {};
    }

    return JSON.parse(cookie);
};

export const taskAnalyticsSetSurveyMatched = (surveyId: string) => {
    const currentState = taskAnalyticsGetState();
    setCookie({ ...currentState, matched: { ...currentState.matched, [surveyId]: Date.now() } });
};

export const taskAnalyticsSetSelected = (surveyId: string) => {
    const currentState = taskAnalyticsGetState();
    setCookie({ ...currentState, selected: { id: surveyId, ts: Date.now() } });
};

export const taskAnalyticsGetSelectedSurveyId = () => {
    return taskAnalyticsGetState().selected?.id;
};

export const taskAnalyticsRefreshState = () => {
    const { matched, selected } = taskAnalyticsGetState();

    const now = Date.now();

    const freshSelected = selected?.ts && now - selected.ts > expireTimeMs ? undefined : selected;

    const freshMatched = matched
        ? Object.entries(matched).reduce((acc, [key, timestamp]) => {
              if (now - timestamp > expireTimeMs) {
                  return acc;
              }

              return { ...acc, [key]: timestamp };
          }, {})
        : undefined;

    setCookie({ matched: freshMatched, selected: freshSelected });
};
