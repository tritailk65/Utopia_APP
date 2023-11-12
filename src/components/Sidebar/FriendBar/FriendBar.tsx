import { useEffect, useState } from 'react';
import StickyWrapper from '../../Wrapper/StickyWrapper/StickyWrapper';
import { Link, useNavigate } from 'react-router-dom';
import { UserInfo } from '../../../types/user-type';
import ConfirmDialog from '../../Dialog/ConfirmDialog/ConfirmDialog';
import { backend_utils as backend } from '../../../utils/api-utils';
import useGetUserInfo from '../../../hooks/useGetUserInfo';
import { getListSuggested } from '../../../services/user-service';
import HomeSuggestSkeleton from '../../Skeleton/HomeSuggestSkeleton';
import HomeSuggestItem from './HomeSuggestItem/HomeSuggestItem';

function FriendBar() {
    const navigate = useNavigate();
    const userInfo: UserInfo = useGetUserInfo();
    const [dataSuggesSlice, setDataSuggestSlice] = useState<UserInfo[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [titleComfirmModel, setTitleComfirmModel] = useState<string>('');
    const [showConfirmModel, setShowCofirmModel] = useState<boolean>(false);
    const [messageFollow, setMessageAlert] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        try {
            setLoading(true);
            getListSuggested().then((res) => {
                if (res != undefined) {
                    if (res.Data != null) {
                        const slicedArray = res.Data.slice(0, 6);
                        setDataSuggestSlice(slicedArray);
                        setLoading(false);
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleLogout = () => {
        if (userInfo != null) {
            localStorage.removeItem('userData');
        }
        navigate('/login');
    };

    const logoutConfirm = () => {
        setTitleComfirmModel('Bạn có chắc muốn đăng xuất ?');
        setShowCofirmModel(true);
    };

    return (
        <StickyWrapper top={14} right={0} paddingLeft={16}>
            <ul className=" w-[319px] px-2 my-6">
                <li className="text-base flex  mb-8 items-center ">
                    <div className="flex-1 w-1/6 ">
                        <Link to={'/profile/' + userInfo.userName}>
                            <img
                                src={backend.imagePath + userInfo.avatarPath}
                                alt="avatar"
                                className="circle w-12 h-12 cursor-pointer"
                            />
                        </Link>
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4 ">
                        <Link to={'/profile/' + userInfo.userName}>
                            <h3 className="font-semibold cursor-pointer">{userInfo?.userName}</h3>
                        </Link>
                        <h3>{userInfo?.fullName}</h3>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span onClick={logoutConfirm} className="text-sm">
                            Switch
                        </span>
                    </div>
                </li>

                <li className="flex justify-between text-sm tracking-wide py-1 mb-4 ">
                    <span className="opacity-80 text-base font-semibold text-gray-600">Suggested for you</span>
                    <Link to="/see-all-suggest">
                        <span className="font-semibold cursor-pointer hover:text-[#787878]">See all</span>
                    </Link>
                </li>

                {!loading && dataSuggesSlice && (
                    <>
                        {dataSuggesSlice.map((_, index) => (
                            <>
                                <HomeSuggestItem key={index} user={_} />
                            </>
                        ))}
                    </>
                )}
                {loading && (
                    <>
                        <HomeSuggestSkeleton />
                        <HomeSuggestSkeleton />
                        <HomeSuggestSkeleton />
                        <HomeSuggestSkeleton />
                        <HomeSuggestSkeleton />
                        <HomeSuggestSkeleton />
                    </>
                )}
                <li className="text-[14px] font-thin mt-10">
                    <span className="text-gray-600">© 2023 UTOPIA FROM NHOM10</span>
                </li>
            </ul>

            <ConfirmDialog
                title={titleComfirmModel}
                confirmText="OK"
                cancelText="Cancle"
                onClose={() => {}}
                onCancel={() => setShowCofirmModel(false)}
                onConfirm={() => handleLogout()}
                show={showConfirmModel}
            />
        </StickyWrapper>
    );
}

export default FriendBar;
