import { NotificationThisWeek } from '../types/notification-type';

import { getAxios, postAxios } from '../utils/api-request';
import { backend_utils as backend } from '../utils/api-utils';

export const getListNotiThisWeek = async (id: number) => {
    try {
        const path = `${backend.notificationController}/ThisWeek/User/` + id;

        const response = await getAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getListNotiThisMonth = async (id: number) => {
    try {
        const path = `${backend.notificationController}/ThisMonth/User/` + id;

        const response = await getAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getListNotiEarlier = async (id: number) => {
    try {
        const path = `${backend.notificationController}/Earlier/User/` + id;

        const response = await getAxios(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};
