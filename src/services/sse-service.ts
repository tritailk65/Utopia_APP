import { deleteAxios } from '../utils/api-request';
import { backend_utils } from '../utils/api-utils';

export const removeConnection = async (id: number) => {
    try {
        const path = `${backend_utils.sseController}/removeConnection/${id}`;
        const response = await deleteAxios(path, {});

        return response;
    } catch (e) {
        console.log(e);
    }
};
