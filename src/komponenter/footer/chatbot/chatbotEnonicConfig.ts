import { gradualRolloutFeatureToggle } from 'utils/gradual-rollout-feature-toggle';
import moment from 'moment-timezone';

export const isEnonicPage = () =>
    /(nav.no|^)(\/no|\/en|\/se)/.test(document.location.href);

export type EnonicChatConfig = {
    percentage: number;
    toggle: boolean;
    analytics?: any;
};

export const defaultEnonicConfig: EnonicChatConfig = {
    toggle: true,
    percentage: 25,
};

export const enonicFeatureToggle = (chatConfig: EnonicChatConfig) =>
    isEnonicPage() &&
    chatConfig.toggle &&
    gradualRolloutFeatureToggle(
        'enonic-chatbot',
        chatConfig.percentage,
        moment().add(30, 'days')
    );
