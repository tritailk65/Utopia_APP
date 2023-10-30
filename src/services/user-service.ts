import { getAxios } from "../utils/api-request";
import { backend_utils } from "../utils/api-utils";
import axios from 'axios';

export const getListUser = async () => {
    try {
        const path = `${backend_utils.backend_url}/User`;
        const response = await getAxios(path, {});
        console.log(response);

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getAvatarUser = async (id: number) => {
    try {
        const path = `${backend_utils.backend_url}/User/Avatar/${id}`;
        const response = await axios.get(path, {
            responseType: 'arraybuffer', // Yêu cầu dữ liệu trả về dưới dạng array buffer
        });

        const contentType = response.headers['content-type']; // Lấy Content-Type từ headers

        if (contentType && contentType.startsWith('image')) {
            // Nếu Content-Type là hình ảnh, trả về dữ liệu phản hồi
            return response.data;
        } else {
            // Nếu không phải là hình ảnh, ném lỗi
            throw new Error('Invalid content type');
        }
    } catch (e) {
        console.error(e);
        throw new Error('Failed to fetch avatar data');
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