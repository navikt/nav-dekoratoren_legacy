export function checkVergic(vngage: typeof window.vngage): vngage is NonNullable<typeof window.vngage> {
    return typeof window !== 'undefined' && typeof window.vngage !== 'undefined';
}
