import { getAxios, postAxios, putAxios, postAxiosFile } from '../utils/api-request';
import { backend_utils } from '../utils/api-utils';

export const getListUser = async () => {
    try {
        const path = `${backend_utils.userController}`;
        const response = await getAxios(path, {});

        return response;
    } catch (e) {
        console.log(e);
    }
};

//export const getDetailUser = async (code: string) => {
export const getUserDataByName = async (userName: string | undefined) => {
    try {
        const path = `${backend_utils.userController}/GetByName/${userName}`;
        const response = await getAxios(path, {});
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getUserDataById = async (id: number) => {
    try {
        const path = `${backend_utils.userController}/GetById/${id}`;
        const response = await getAxios(path, {});
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getListSuggested = async () => {
    try {
        const path = `${backend_utils.userController}/SuggestFollow`;
        const response = await getAxios(path, {});
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getUserByName = async (name: string | undefined) => {
    try {
        const path = `${backend_utils.userController}/GetByName/` + name;
        const response = await getAxios(path, {});

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getUserAvatar = async (id: number) => {
    try {
        const path = `${backend_utils.userController}/User/Avatar/` + id;

        const response = await getAxios(path, {});
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

export const userRegister = async (userData: {} | undefined) => {
    try {
        const path = `${backend_utils.userController}/SignUp`;
        const response = await postAxios(path, userData);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const editprofile = async (userID: number, UserData: {} | undefined) => {
    try {
        const path = `${backend_utils.userController}/EditProfile/${userID}`;
        const response = await putAxios(path, UserData);

        return response;
    } catch (error) {
        console.log(error);
    }
};

export const uploadAvatar = async (userId: number, avatar: string | Blob) => {
    try {
        const path = `${backend_utils.userController}/UploadAvatar/${userId}`;
        const formData = new FormData();
        formData.append('avatar', avatar);
        const response = await postAxiosFile(path, formData);

        return response;
    } catch (error) {
        console.log(error);
    }
};
