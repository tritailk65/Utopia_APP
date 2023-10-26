export interface SuggesFollowItemProps {
    userName: string;
    fullName: string;
    avatar: string;
}

function handleFollow(): void {}

function SuggestFollowItem(props: SuggesFollowItemProps) {
    const { userName, fullName, avatar } = props;
    return (
        <>
            <ul className=" w-full px-2">
                <li className="text-base flex  mb-4 pl-24">
                    <div className="flex-1 w-1/2">
                        <img src={avatar} alt="avatar" className="circle w-14 h-14" />
                    </div>
                    <div className="flex-4 w-4/6 text-left ">
                        <h3 className="font-semibold cursor-pointer">{userName}</h3>
                        <p>{fullName}</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer font-semibold ">
                        <button
                            onClick={handleFollow}
                            className=" bg-[#001F3E] px-5 border-2 border-[#001F3E] rounded-lg text-sm text-white hover:bg-white hover:text-black py-2"
                        >
                            Following
                        </button>
                    </div>
                </li>
            </ul>
        </>
    );
}

export default SuggestFollowItem;
