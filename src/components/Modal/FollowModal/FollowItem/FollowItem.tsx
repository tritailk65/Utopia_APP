import avt from '../../../../assets/image/avt2.png';

function FollowItem() {
    return (
        <div className="text-base flex mb-5 mr-4">
            <div className="flex-1 w-1/6 ">
                <img src={avt} alt="avatar" className="circle w-14 h-14" />
            </div>
            <div className="flex-4 w-4/6 text-left pl-4">
                <h3 className="font-semibold cursor-pointer text-lg">sooyaa__</h3>
                <p className="text-gray-500">24.8M Followers</p>
            </div>
            <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer font-semibold ">
                <button className="text-sm bg-gray-300 px-5 border-2 border-transparent rounded-2xl text-lg text-gray-600 hover:opacity-90 hover:text-black py-2">
                    Following
                </button>
            </div>
        </div>
    );
}

export default FollowItem;
