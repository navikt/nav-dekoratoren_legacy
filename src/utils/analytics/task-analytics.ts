const surveys: Record<string, string> = {
    'https://www.nav.no/tilleggsstonader': '03343',
    'https://www.nav.no/soknader/nb/person/familie/tilleggsstonader': '03343',
    'https://www.nav.no/tilleggsstonader-enslig': '03343',
    'https://www.nav.no/tilleggsstonader-gjenlevende': '03343',
    'https://www.nav.no/tilleggsstonader/nn': '03343',
    'https://www.dev.nav.no/tilleggsstonader': '03343',
};

const taFallback = (...args: any[]) => {
    TA.q = TA.q || [];
    TA.q.push(args);
};

export const startTaskAnalyticsSurveys = () => {
    const currentUrl = window.location.origin + window.location.pathname;

    Object.keys(surveys).forEach((surveyUrl) => {
        if (currentUrl.startsWith(surveyUrl)) {
            const surveyId = surveys[surveyUrl];
            console.log(`Start survey ${surveyId}`);
            window.TA('start', surveyId);
        }
    });
};

export const initTaskAnalytics = () => {
    window.TA = window.TA || taFallback;
    window.dataLayer = window.dataLayer || [];
};
