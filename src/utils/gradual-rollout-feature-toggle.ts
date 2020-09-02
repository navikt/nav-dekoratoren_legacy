import Cookies from 'js-cookie';
import moment, { Moment } from 'moment';

const cookieName = (featureName: string) => `decorator-rollout-${featureName}`;

const setCookie = (featureName: string, idValue: number, expires: Moment) =>
    Cookies.set(cookieName(featureName), idValue.toString(), {
        expires: expires.diff(moment(), 'days').valueOf(),
    });

const stickyUserIdForFeature = (
    featureName: string,
    expires: Moment
): number => {
    const cookieIdValue = Number(Cookies.get(cookieName(featureName)));
    if (!isNaN(cookieIdValue)) {
        setCookie(featureName, cookieIdValue, expires);
        return cookieIdValue;
    }

    const idValue = Math.floor(Math.random() * 2 ** 31);
    setCookie(featureName, idValue, expires);

    return idValue;
};

export const gradualRolloutFeatureToggle = (
    featureName: string,
    percentage: number,
    expires: Moment,
    toggleOnExpire = false
) => {
    if (moment().isAfter(expires)) {
        return toggleOnExpire;
    }

    return (
        stickyUserIdForFeature(featureName, expires) % 100 <
        Math.min(percentage, 100)
    );
};
