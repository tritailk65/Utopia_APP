import { UserInfo } from '../../../types/user-type';
import { backend_utils } from '../../../utils/api-utils';

export interface SuggesFollowItemProps {
    user: UserInfo;
}

const SuggestFollowItem = (props: SuggesFollowItemProps) => {
    return (
        <>
            <ul className=" w-full px-2">
                <li className="text-base flex  mb-4 pl-24">
                    <div className="flex-1 w-1/2">
                        <img
                            src={backend_utils.imagePath + props.user.avatarPath}
                            alt="avatar"
                            className="circle w-14 h-14"
                        />
                    </div>
                    <div className="flex-4 w-4/6 text-left ">
                        <h3 className="font-semibold cursor-pointer">{props.user.userName}</h3>
                        <p>{props.user.fullName}</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer font-semibold ">
                        <button
                            onClick={() => {}}
                            className=" bg-[#001F3E] px-5 border-2 border-[#001F3E] rounded-lg text-sm text-white hover:bg-white hover:text-black py-2"
                        >
                            Following
                        </button>
                    </div>
                </li>
            </ul>
        </>
    );
};

export default SuggestFollowItem;
