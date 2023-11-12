import { deleteAxios, getAxios, getAxiosAvatar, postAxios, postAxiosFile, putAxios } from "../utils/api-request";
import { backend_utils } from "../utils/api-utils";

export const getListFollowingById = async (id: number) => {
    try {
        const path = `${backend_utils.backend_url}/Follow/FollowedUsers/${id}`;
        const response = await getAxios(path, {});
        console.log(response);

        return response;

    } catch (e) {
        console.log(e);
    }
};

export const getListFollowingByCurrentUser = async () => {
    try {
        const userDataString = localStorage.getItem('userData');
        console.log('userDataString:', userDataString);
        if (userDataString !== null) {
            //const userData = JSON.parse(userDataString) as { Data: { id: number } };
            //const currentUserId = userData.Data.id;
            const userData = JSON.parse(userDataString)
            const currentUserId = userData.id;
            console.log("ajajs",currentUserId);
            const path = `${backend_utils.backend_url}/Follow/followed-users/${currentUserId}`;
            const response = await getAxios(path, {});
            return response;
        } else {
            throw new Error('User data not found in localStorage');            
        }
    } catch (error) {
        throw error;
    }
};

export const Unfollowing = async (id: number) => {
    try {
        const userDataString = localStorage.getItem('userData');
        console.log('userDataString:', userDataString);
        if (userDataString !== null) {
            //const userData = JSON.parse(userDataString) as { Data: { id: number } };
            //const currentUserId = userData.Data.id;
            const userData = JSON.parse(userDataString)
            const currentUserId = userData.id;
            console.log("ajajs",currentUserId);
            const path = `${backend_utils.backend_url}/Follow/unfollow/${currentUserId}/${id}`;
            const response = await deleteAxios(path, {});
            return response;
        } else {
            throw new Error('User data not found in localStorage');            
        }
    } catch (e) {
        console.log(e);
    }
};


