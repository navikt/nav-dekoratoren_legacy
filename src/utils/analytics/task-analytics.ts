import { MenuValue } from '../meny-storage-utils';
import { Locale } from '../../store/reducers/language-duck';

type UrlRule = {
    url: string;
    match: 'exact' | 'startsWith';
    exclude?: boolean;
};

export type TaSurveyConfig = {
    id: string;
    urls?: UrlRule[];
    audience?: MenuValue[];
    language?: Locale[];
};

let fetchedSurveys: TaSurveyConfig[] | null = null;

const taFallback = (...args: any[]) => {
    TA.q = TA.q || [];
    TA.q.push(args);
};

const removeTrailingSlash = (str: string) => str.replace(/\/$/, '');

const isMatchingUrl = (url: string, currentUrl: string, match: UrlRule['match']) =>
    match === 'startsWith' ? currentUrl.startsWith(url) : currentUrl === url;

const isMatchingSurvey = (survey: TaSurveyConfig, currentLanguage: Locale, currentAudience: MenuValue): boolean => {
    const { id, urls, audience, language } = survey;

    if (!id) {
        console.log('No survey id specified!');
        return false;
    }

    if (urls) {
        const currentUrl = removeTrailingSlash(`${window.location.origin}${window.location.pathname}`);

        let isMatched = false;
        let isExcluded = false;

        urls.every((urlRule) => {
            const { url, match, exclude } = urlRule;
            const urlToMatch = removeTrailingSlash(url);

            if (isMatchingUrl(urlToMatch, currentUrl, match)) {
                // If the url is excluded we can stop. If not, we need to continue checking the url-array, in case
                // there are exclusions in the rest of the array
                if (exclude) {
                    isExcluded = true;
                    return false;
                } else {
                    isMatched = true;
                }
            }

            return true;
        });

        if (isExcluded || !isMatched) {
            return false;
        }
    }

    if (audience && !audience.some((audience) => audience === currentAudience)) {
        return false;
    }

    if (language && !language.some((language) => language === currentLanguage)) {
        return false;
    }

    return true;
};

const startMatchingSurvey = (surveys: TaSurveyConfig[], currentAudience: MenuValue, currentLanguage: Locale) => {
    console.log(surveys);

    const matchingSurveys = surveys.filter((survey) => isMatchingSurvey(survey, currentLanguage, currentAudience));

    if (matchingSurveys.length === 0) {
        return;
    }

    // TODO: handle multiple matching surveys
    const { id } = matchingSurveys[0];

    console.log(`Starting TA survey ${id}`);
    window.TA('start', id);
};

export const startTaskAnalyticsSurvey = (appUrl: string, currentAudience: MenuValue, currentLanguage: Locale) => {
    if (fetchedSurveys) {
        startMatchingSurvey(fetchedSurveys, currentAudience, currentLanguage);
    } else {
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
                startMatchingSurvey(surveys, currentAudience, currentLanguage);
            })
            .catch((e) => {
                console.error(`Error fetching Task Analytics surveys - ${e}`);
            });
    }
};

export const initTaskAnalytics = async () => {
    window.TA = window.TA || taFallback;
    window.dataLayer = window.dataLayer || [];
};
