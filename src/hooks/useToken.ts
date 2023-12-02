import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const USER_COOKIE_KEY = 'utopia-jwt';

export type UserData = {
    sub: string;
    iat: number;
    exp: number;
};

const useToken = (): string | null => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const cookieToken = Cookies.get('utopia-jwt');
        console.log(`CookieToken -->`, cookieToken);
        if (cookieToken) {
            //   // Check if the token is expired
            //   if (cookieToken.exp * 1000 > Date.now()) {
            //     setToken(cookieToken);
            //   } else {
            //     // Token is expired, remove it from the cookie
            //     Cookies.remove('utopia_jwt');
            //   }
            setToken('');
        }
    }, []);

    return token;
};

export default useToken;
