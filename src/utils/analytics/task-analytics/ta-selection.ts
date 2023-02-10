import { TaskAnalyticsSurveyConfig } from './ta';

/*
 * Draws a random surveys from the array based on the selection probabilities set in the config
 * If the sum of probabilities is greater than 100%, we draw based on their relative values
 * */

const selectionMinRange = 100;
const defaultSelection = 100;

export const taskAnalyticsSelectSurvey = (
    surveys: TaskAnalyticsSurveyConfig[]
): TaskAnalyticsSurveyConfig | null | undefined => {
    const selectionSum = surveys.reduce((sum, survey) => sum + (survey.selection || defaultSelection), 0);
    const selectedValue = Math.random() * Math.max(selectionSum, selectionMinRange);

    let lowerBound = 0;

    return surveys.find((survey) => {
        const upperBound = lowerBound + (survey.selection || defaultSelection);
        if (selectedValue > lowerBound && selectedValue < upperBound) {
            return true;
        }

        lowerBound = upperBound;
        return false;
    });
};
