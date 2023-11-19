import success from '../../assets/image/success.png';
function Saved() {
    return(
        <div>
            <div className="min-h-full w-full">
                <div className="profile text-2xl w-[900px] mx-auto mt-8 bg-white p-4 ">
                    <div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <img src={success} className="w-full" alt="img" />
                            </div>
                            <div>
                                <img src={success} className="w-full" alt="img" />
                            </div>
                            <div>
                                <img src={success} className="w-full" alt="img" />
                            </div>
                            <div>
                                <img src={success} className="w-full" alt="img" />
                            </div>
                            <div>
                                <img src={success} className="w-full" alt="img" />
                            </div>
                            <div>
                                <img src={success} className="w-full" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          );
}





export default Saved;
