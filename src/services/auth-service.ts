import { postAxios } from '../utils/api-request';
import { backend_utils } from '../utils/api-utils';

export const authSignIn = async (loginData: { [key: string]: string } | undefined) => {
    try {
        const path = `${backend_utils.authController}/signin`;
        const response = await postAxios(path, loginData);

        return response;
    } catch (error) {
        console.log(error);
    }
};
