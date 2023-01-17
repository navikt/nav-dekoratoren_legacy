import { MenuValue } from '../meny-storage-utils';
import { Locale } from '../../store/reducers/language-duck';

type TaSurvey = {
    id: string;
    urls?: string[];
    audiences?: MenuValue[];
    languages?: Locale[];
};

let surveys: TaSurvey[] = [];

const taFallback = (...args: any[]) => {
    TA.q = TA.q || [];
    TA.q.push(args);
};

export const startTaskAnalyticsSurveys = ({
    currentAudience,
    currentLanguage,
}: {
    currentAudience: MenuValue;
    currentLanguage: Locale;
}) => {
    const currentUrl = window.location.origin + window.location.pathname;

    console.log(surveys);

    surveys.forEach((survey) => {
        const { id, urls, audiences, languages } = survey;

        if (!id) {
            console.log('No survey id specified!');
            return;
        }

        if (urls && !urls.some((url) => url.startsWith(currentUrl))) {
            return;
        }

        if (audiences && !audiences.some((audience) => audience === currentAudience)) {
            return;
        }

        if (languages && !languages.some((language) => language === currentLanguage)) {
            return;
        }

        console.log(`Start survey ${id}`);
        window.TA('start', id);
    });
};

export const initTaskAnalytics = async (APP_URL: string) => {
    window.TA = window.TA || taFallback;
    window.dataLayer = window.dataLayer || [];
    await fetch(`${APP_URL}/api/ta`)
        .then((res) => {
            if (!res.ok) {
                return;
            }

            return res.json();
        })
        .then((json) => {
            surveys = json;
        });
};
