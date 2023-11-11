const useGetUserInfo = () => {
    let user = null;

    if (localStorage['userData']) {
        user = JSON.parse(localStorage['userData']);
    }

    return user;
};

export default useGetUserInfo;
