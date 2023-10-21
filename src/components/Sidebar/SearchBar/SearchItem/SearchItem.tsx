import avt from '../../../../assets/image/avt2.png';

function SearchItem() {
    return (
        <div className="cursor-pointer hover:bg-gray-200 px-2 h-16 flex items-center mb-3">
            <div className="mr-2">
                <img src={avt} alt="avt" className="w-14 h-14 circle" />
            </div>
            <div className="">
                <h1 className="font-semibold">sooyaa__</h1>
                <div className="text-gray-500">
                    <span className="mr-1">Jisoo Blackpink</span>
                    <span className="mr-1">-</span>
                    <span className="">408k followers</span>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;
