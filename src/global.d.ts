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
        boostInit: any;
        vngage?: {
            info: {
                version: string;
                revision: number;
                status: string; //ok
            },
            get: (key: string, groupId: string) => any;
            join: (key: string, payload: Record<string, string>) => void;
            subscribe: (key: string, callback: (message: string, data: any) => void) => void;
        }
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
            BUILD_ID: string;
        }
    }
}

export {};
