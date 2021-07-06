const b64DecodeUnicode = (base64: string): string => {
    return decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (char) {
                return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
};

export const parseJwt = (token: string) =>
    JSON.parse(b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/')));
