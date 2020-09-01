import Cookies from 'js-cookie';
import moment, { Moment } from 'moment';

const fast32bitHash = (str: string) =>
    str.split('').reduce(
        // tslint:disable-next-line:no-bitwise
        (hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0,
        0
    ) +
    2 ** 31 +
    1;

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

    const seed = fast32bitHash(featureName);
    const idValue = Math.floor(Math.random() * seed);
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
