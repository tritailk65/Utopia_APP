import { getAxios, getAxiosAvatar, postAxios, putAxios, postAxiosFile } from '../utils/api-request';
import { backend_utils } from '../utils/api-utils';

export const getRequestFollow = async (Id: number) => {
    try {
        const path = `${backend_utils.requestFollowController}`;
        const response = await getAxios(path, { Headers: { token: { Id } } });
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
};
