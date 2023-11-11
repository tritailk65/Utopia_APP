import { getAxios, getAxiosAvatar, postAxios, putAxios, postAxiosFile } from '../utils/api-request';
import { backend_utils } from '../utils/api-utils';

export const getRequestFollow = async () => {
    try {
        const path = `${backend_utils.requestFollowController}`;
        const response = await getAxios(path);

        return response;
    } catch (e) {
        console.log(e);
    }
};

//For user target delete
export const deleteRequestFollow = async (UserTar: number) => {
    try {
        const path = `${backend_utils.requestFollowController}/DeleteRequestFollow/UserTar=${UserTar}`;
        const response = await putAxios(path);

        return response;
    } catch (e) {
        console.log(e);
    }
};

//For user target accept
export const acceptRequestFollow = async (UserTar: number) => {
    try {
        const path = `${backend_utils.requestFollowController}/AcceptRequestFollow/UserTar=${UserTar}`;
        const response = await postAxios(path);

        return response;
    } catch (e) {
        console.log(e);
    }
};
