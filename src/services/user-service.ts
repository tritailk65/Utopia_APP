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
export const getUserDataById = async (userName: string | undefined) => {
    try {
        const path = `${backend_utils.userController}/${userName}`;
        const response = await getAxios(path, {});
        if (response.Status === 200) {
            return response.Data;
        }
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

export const userLogin = async (loginData: { [key: string]: string } | undefined) => {
    try {
        const path = `${backend_utils.userController}/Login`;
        const response = await postAxios(path, loginData);

        return response;
    } catch (error) {
        console.log(error);
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

export const editprofile = async (userID: Uint8Array | undefined, UserData: {} | undefined) => {
    try {
        const path = `${backend_utils.userController}/EditProfile/${userID}`;
        const response = await putAxios(path, UserData);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const uploadAvatar = async (userId: Uint8Array | undefined, selectedFile: string | Blob) => {
    try {
        const path = `${backend_utils.userController}/UploadAvatar/${userId}`;
        const formData = new FormData();
        formData.append('avatar', selectedFile);

        const response = await postAxiosFile(path, formData);

        return response;
    } catch (error) {
        console.log(error);
    }
};
