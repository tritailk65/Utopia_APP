import { NotificationThisWeek } from '../types/notification-type';

import { getAxios, postAxios } from '../utils/api-request';
import { backend_utils as backend } from '../utils/api-utils';

export const getListNotiThisWeek = async (id: number) => {
    try {
        const path = `${backend.notificationController}/User/` + id;

        const response = await getAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};
