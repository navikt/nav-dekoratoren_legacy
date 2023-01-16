declare global {
    let TA: any;

    interface Window {
        TA: any;
        dataLayer: any;
        dekoratorenAmplitude: ({
            origin,
            eventName,
            eventData,
        }?: {
            origin: string;
            eventName: string;
            eventData?: EventData;
        }) => Promise<any>;
    }

    namespace NodeJS {
        interface ProcessEnv {
            ENV: 'prod' | 'dev' | 'localhost';
            APP_BASE_URL: string;
            APP_BASE_PATH: string;
            API_XP_SERVICES_URL: string;
            API_DEKORATOREN_URL: string;
            MINSIDE_ARBEIDSGIVER_URL: string;
            MIN_SIDE_URL: string;
            LOGIN_URL: string;
            LOGOUT_URL: string;
            FEEDBACK_API_URL: string;
            BUILD_ID: string;
        }
    }
}

export {};
