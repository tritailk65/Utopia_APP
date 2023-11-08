import { getAxios, postAxios, putAxios } from '../utils/api-request';
import { backend_utils } from '../utils/api-utils';

export const getAllFollowing = async (Id: number) => {
    try {
        const path = `${backend_utils.followingController}/${Id}`;
        const response = await getAxios(path);

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const PostUnFollow = async (IdSrc: number, IdTar: number) => {
    try {
        const path = `${backend_utils.followingController}/CancelFollow/UserSrc=${IdSrc}&UserTar=${IdTar}`;
        const response = await putAxios(path);

        return response;
    } catch (e) {
        console.log(e);
    }
};
