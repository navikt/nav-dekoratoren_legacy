import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

const cookieName = 'selvbetjening-idtoken';

type IdToken = {
    auth_time: string;
    exp: string;
};

export const useAuthExpireTimeSeconds = () => {
    const [cookies] = useCookies([cookieName]);
    const idToken = cookies[cookieName];

    if (!idToken) {
        return null;
    }

    const decodedToken = jwtDecode(idToken) as IdToken;
    return Number(decodedToken?.exp);
};
