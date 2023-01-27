import { MenuValue } from '../../meny-storage-utils';
import { Locale } from '../../../store/reducers/language-duck';
import { AppState } from '../../../store/reducers';
import { taskAnalyticsSelectSurvey } from './ta-selection';
import { taskAnalyticsRefreshState, taskAnalyticsGetSelectedSurvey, taskAnalyticsSetSelected } from './ta-cookies';
import { taskAnalyticsGetMatchingSurveys } from './ta-matching';

export type TaskAnalyticsUrlRule = {
    url: string;
    match: 'exact' | 'startsWith';
    exclude?: boolean;
};

export type TaskAnalyticsSurveyConfig = {
    id: string;
    selection?: number;
    urls?: TaskAnalyticsUrlRule[];
    audience?: MenuValue[];
    language?: Locale[];
};

let fetchedSurveys: TaskAnalyticsSurveyConfig[] | null = null;

const taFallback = (...args: any[]) => {
    TA.q = TA.q || [];
    TA.q.push(args);
};

const startSurvey = (surveyId: string) => {
    console.log(`Starting TA survey ${surveyId}`);
    window.TA('start', surveyId);
};

const findAndStartSurvey = (surveys: TaskAnalyticsSurveyConfig[], state: AppState) => {
    const { arbeidsflate, language, environment } = state;

    // Do not show surveys if the simple header is used
    if (environment.PARAMS.SIMPLE || environment.PARAMS.SIMPLE_HEADER) {
        return;
    }

    const { status: currentAudience } = arbeidsflate;
    const { language: currentLanguage } = language;

    const matchingSurveys = taskAnalyticsGetMatchingSurveys(surveys, currentLanguage, currentAudience);
    if (!matchingSurveys) {
        return;
    }

    const selectedSurvey = taskAnalyticsSelectSurvey(matchingSurveys);
    if (!selectedSurvey) {
        return;
    }

    const { id } = selectedSurvey;
    taskAnalyticsSetSelected(id);
    startSurvey(id);
};

const fetchAndStart = (appUrl: string, state: AppState) =>
    fetch(`${appUrl}/api/ta`)
        .then((res) => {
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }

            return res.json();
        })
        .then((surveys) => {
            if (!Array.isArray(surveys)) {
                throw Error(`Invalid type for surveys response - ${JSON.stringify(surveys)}`);
            }
            fetchedSurveys = surveys;
            findAndStartSurvey(surveys, state);
        })
        .catch((e) => {
            console.error(`Error fetching Task Analytics surveys - ${e}`);
        });

export const startTaskAnalyticsSurvey = (appUrl: string, state: AppState) => {
    taskAnalyticsRefreshState();

    // If the user was previously selected for a survey (in the last 30 days), start it
    const selectedSurveyId = taskAnalyticsGetSelectedSurvey();
    if (selectedSurveyId) {
        startSurvey(selectedSurveyId);
        return;
    }

    if (fetchedSurveys) {
        findAndStartSurvey(fetchedSurveys, state);
    } else {
        fetchAndStart(appUrl, state);
    }
};

export const initTaskAnalytics = () => {
    window.TA = window.TA || taFallback;
    window.dataLayer = window.dataLayer || [];
};
