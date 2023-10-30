import { getAxios,getAxiosAvatar,postAxios,putAxios,postAxiosFile } from "../utils/api-request";
import { backend_utils } from "../utils/api-utils";

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

export const getUserDataById = async (userId: string | undefined) => {
    try {
      const path = `${backend_utils.backend_url}/User/${userId}`;
      const response = await getAxios(path,{});
      if (response.Status === 200) {
        return response.Data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const getAvatar = async (userId: string | undefined) => {
    try {
      const path = `${backend_utils.backend_url}/User/Avatar/${userId}`;
      const response = await getAxiosAvatar(path, { responseType: 'arraybuffer' });
  
      const contentType = response.headers && response.headers['content-type'] ? response.headers['content-type'] : 'Loading';
  
      const blob = new Blob([response.data], { type: contentType });
      if (blob.size > 0) { 
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
      } else {
        console.error('Error: Blob is empty or invalid');
      }
    } catch (error) {
      console.error('Error fetching avatar', error);
      throw error;
    }
  };



export const getDetailUser = async (code:string) => {
    try {
        const path = `/${backend_utils.userController}/code`;
        const response = await getAxios(path, {});
        console.log(response);

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const login = async (loginData: { [key: string]: string } | undefined) => {
    try {
        const path = `${backend_utils.backend_url}/User/Login`;
        const response = await postAxios(path, loginData);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const register = async (userData: {} | undefined) => {
    try {
      const path = `${backend_utils.backend_url}/User/SignUp`;
      const response = await postAxios(path,userData);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const editprofile = async (userID: Uint8Array | undefined,UserData: {} | undefined) => {
    try {
      const path = `${backend_utils.backend_url}/User/EditProfile/${userID}`;
      const response = await putAxios(path,UserData);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const uploadAvatar = async (userId: Uint8Array | undefined, selectedFile: string | Blob) => {
    try {
        const path = `${backend_utils.backend_url}/User/UploadAvatar/${userId}`;
        const formData = new FormData();
        formData.append('avatar', selectedFile);

        const response = await postAxiosFile(path, formData);

        return response;
    } catch (error) {
        console.log(error);
    }
};