import avt from '../../../../assets/image/avt2.png';

function FollowRequestItem() {
    return (
        <>
            <div className="text-base flex  w-[100%] mt-4">
                <div className="flex-1 w-[6%] ml-2">
                    <img src={avt} alt="avatar" className="circle w-14 h-14" />
                </div>
                <div className="flex-4 w-[38%] text-left">
                    <h3 className="font-semiboldtext-[18px]">sooyaa__</h3>
                    <p className="text-gray-500 text-sm">24.8M Followers</p>
                </div>
                <div className="flex-1 w-[47%] flex flex-row items-center cursor-pointer font-semibold ">
                    <button
                        onClick={() => {}}
                        className=" bg-[#001F3E] transition border-2 border-transparent rounded-xl text-sm text-[#ffffff] hover:bg-[#ffffff] hover:border-[#001F3E] hover:text-[#001F3E] px-4 py-1.5 mr-3"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => {}}
                        className=" bg-[#8E8E8E]/30 transition border-2 border-transparent cursor-pointer rounded-xl text-sm text-black hover:bg-[#464646]/30 px-4 py-1.5 mr-3"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
}

export default FollowRequestItem;
