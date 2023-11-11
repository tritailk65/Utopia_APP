import { getAxios, postAxios, putAxios } from '../utils/api-request';
import { backend_utils } from '../utils/api-utils';

export const getAllFollowing = async () => {
    try {
        const path = `${backend_utils.followingController}`;
        const response = await getAxios(path, {});

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const PostUnFollow = async (IdTar: number) => {
    try {
        const path = `${backend_utils.followingController}/CancelFollow/UserTar=${IdTar}`;
        const response = await putAxios(path);

        return response;
    } catch (e) {
        console.log(e);
    }
};
