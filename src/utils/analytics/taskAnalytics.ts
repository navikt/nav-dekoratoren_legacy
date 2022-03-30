import 'regenerator-runtime/runtime';

import { Params } from 'store/reducers/environment-duck';
import { loadExternalScript } from '../external-scripts';

export const initTaskAnalytics = async (params: Params) => {
    const { TA_SURVEYS } = params;

    if (!TA_SURVEYS || TA_SURVEYS.length === 0) {
        return;
    }

    await loadExternalScript('https://in2.taskanalytics.com/tm.js');

    if (typeof window.TA === 'function') {
        TA_SURVEYS.forEach((survey: string) => {
            window.TA('start', survey);
        });
    }
};
