import { gradualRolloutFeatureToggle } from 'utils/gradual-rollout-feature-toggle';
import moment from 'moment-timezone';

export const isEnonicPage = () =>
    /(nav.no|^)(\/no|\/en|\/se)/.test(document.location.href);

const pathsAlwaysEnabled = [
    '/no/person/innhold-til-person-forside/nyttig-a-vite/kampanje-korona/tilbakebetaling-og-trekk-av-forskudd-pa-dagpenger',
];

export type EnonicChatConfig = {
    percentage: number;
    toggle: boolean;
    analytics?: any;
};

export const defaultEnonicConfig: EnonicChatConfig = {
    toggle: true,
    percentage: 50,
};

export const enonicFeatureToggle = (chatConfig: EnonicChatConfig) => {
    return (
        pathsAlwaysEnabled.some((str) =>
            document.location.pathname.includes(str)
        ) ||
        (isEnonicPage() &&
            chatConfig.toggle &&
            gradualRolloutFeatureToggle(
                'enonic-chatbot',
                chatConfig.percentage,
                moment().add(30, 'days')
            ))
    );
};
