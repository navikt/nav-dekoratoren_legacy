import Cookies from 'js-cookie';

/*
 * We keep the state of survey selection for a user in a cookie. When a survey has matched for a user
 * and been part of the selection draw, we should not attempt to show this to the user again for
 * <expireTimeDays> days. We also don't want to show any surveys for 30 days if a survey is selected
 * in a draw
 * */

type TaskAnalyticsState = { selected?: { id: string; ts: number }; matched: Record<string, number> };

const cookieName = 'ta-dekoratoren-v2';

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
    setCookie({ ...currentState, matched: { ...currentState.matched, [surveyId]: Date.now() } });
};

export const taskAnalyticsSetSelected = (surveyId: string) => {
    const currentState = taskAnalyticsGetState();
    setCookie({ ...currentState, selected: { id: surveyId, ts: Date.now() } });
};

export const taskAnalyticsGetSelectedSurvey = () => {
    const currentState = taskAnalyticsGetState();
    return currentState['selected']?.id;
};

export const taskAnalyticsRefreshState = () => {
    const prevState = taskAnalyticsGetState();
    if (!prevState) {
        return;
    }

    const { matched, selected } = prevState;

    const now = Date.now();

    const freshSelected = selected?.ts && now - selected.ts > expireTimeMs ? undefined : selected;

    const freshMatched = matched
        ? Object.entries(matched).reduce((acc, [key, timestamp]) => {
              if (now - timestamp > expireTimeMs) {
                  return acc;
              }

              return { ...acc, [key]: timestamp };
          }, {})
        : {};

    setCookie({ matched: freshMatched, selected: freshSelected });
};
