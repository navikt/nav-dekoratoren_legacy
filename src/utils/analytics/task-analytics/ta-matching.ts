import { Locale } from '../../../store/reducers/language-duck';
import { MenuValue } from '../../meny-storage-utils';
import { TaskAnalyticsSurveyConfig, TaskAnalyticsUrlRule } from './ta';
import { taskAnalyticsGetState, taskAnalyticsSetSurveyMatched } from './ta-cookies';

const removeTrailingSlash = (str: string) => str.replace(/\/$/, '');

const isMatchingUrl = (url: string, currentUrl: string, match: TaskAnalyticsUrlRule['match']) =>
    match === 'startsWith' ? currentUrl.startsWith(url) : currentUrl === url;

const isMatchingUrls = (urls: TaskAnalyticsUrlRule[]) => {
    const currentUrl = removeTrailingSlash(`${window.location.origin}${window.location.pathname}`);

    let isMatched: boolean | null = null;
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
        } else if (!exclude) {
            // If there was a previous match, keep the true value
            // This handles the case where the url-array contains only excluded urls
            isMatched = isMatched || false;
        }

        return true;
    });

    return !(isExcluded || isMatched === false);
};

const isMatchingSurvey = (survey: TaskAnalyticsSurveyConfig, currentLanguage: Locale, currentAudience: MenuValue) => {
    const { urls, audience, language } = survey;

    if (urls && !isMatchingUrls(urls)) {
        return false;
    }

    if (audience && !audience.some((audience) => audience === currentAudience)) {
        return false;
    }

    if (language && !language.some((language) => language === currentLanguage)) {
        return false;
    }

    return true;
};

export const taskAnalyticsGetMatchingSurveys = (
    surveys: TaskAnalyticsSurveyConfig[],
    currentLanguage: Locale,
    currentAudience: MenuValue
) => {
    const taState = taskAnalyticsGetState();

    const matchingSurveys = surveys.filter((survey) => {
        const { id } = survey;
        if (!id) {
            console.log('No TA survey id specified!');
            return false;
        }

        if (taState[id]) {
            return false;
        }

        const isMatching = isMatchingSurvey(survey, currentLanguage, currentAudience);
        if (!isMatching) {
            return false;
        }

        taskAnalyticsSetSurveyMatched(id);

        return true;
    });

    if (matchingSurveys.length === 0) {
        return null;
    }

    return matchingSurveys;
};
