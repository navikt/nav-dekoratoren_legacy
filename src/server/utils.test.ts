import { ValidAnalyticsUserConfig, validateAnalyticsUserConfig } from './utils';

describe('utils', () => {
    it('Skal ikke sette feilformatert analyticsUserConfig', () => {
        const analyticsUserConfig = 'ikke et object';

        expect(() =>
            validateAnalyticsUserConfig(analyticsUserConfig as unknown as ValidAnalyticsUserConfig)
        ).toThrowError();
    });
});
