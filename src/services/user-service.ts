import { getAxios } from '../utils/api-request';
import { backend_utils } from '../utils/api-utils';

export const getListUser = async () => {
    try {
        const path = `/${backend_utils.userController}/getListUser`;
        const response = await getAxios(path, {});
        console.log(response);

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getDetailUser = async (code: string) => {
    try {
        const path = `/${backend_utils.userController}/code`;
        const response = await getAxios(path, {});
        console.log(response);

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getUserAvatar = async (id: number) => {
    try {
        const path = `${backend_utils.userController}/User/Avatar/` + id;

        const response = await getAxios(path, { responseType: 'blob' });
        return URL.createObjectURL(response);
    } catch (e) {
        console.log(e);
    }
};
