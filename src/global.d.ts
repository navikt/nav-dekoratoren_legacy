declare global {
    interface Window {
        TA: any;
    }
    namespace NodeJS {
        interface ProcessEnv {
            ENV: 'prod' | 'dev' | 'localhost';
            API_DEKORATOREN_URL: string;
            APP_BASE_URL: string;
        }
    }
}

export {};
