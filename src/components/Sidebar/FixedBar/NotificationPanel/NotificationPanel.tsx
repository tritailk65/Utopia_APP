import oggy from '../../../../assets/image/oggy.png';
import olivia from '../../../../assets/image/olivia.png';
import bob from '../../../../assets/image/bob.png';
import jack from '../../../../assets/image/jack.png';
import ping from '../../../../assets/image/ping.png';
import arrow from '../../../../assets/image/Arrow_left.png';
export interface NotificationPanelProps {
    onClose: (index: number) => void;
}

function NotificationPanel(props: NotificationPanelProps) {
    const { onClose } = props;
    return (
        <div>
            <h1 className="ml-2 text-3xl font-semibold mb-7">Notifications</h1>
            <ul className=" w-[379px] px-2 max-h-screen overflow-auto ">
                <li className="text-base flex  mb-4 " onClick={() => onClose(3)}>
                    <div className="flex-1 w-1/6 relative">
                        <img src={bob} alt="avatar" className="rounded-full w-8 h-8 absolute top-1 left-1" />
                        <img src={olivia} alt="avatar" className="rounded-full w-8 h-8 absolute bottom-1 right-1" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Follow request</h3>
                        <span className="opacity-50 text-base">postmalone + 99 others</span>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <button className="flex items-center space-x-2">
                            <img src={ping} alt="icon1" className="w-2 h-2 ml-1" />
                            <img src={arrow} alt="icon2" className="w-6 h-6 ml-2" />
                        </button>
                    </div>
                </li>

                <li className="flex justify-between text-sm font-semibold tracking-wide py-1 mb-4">
                    <span className="opacity-80 text-base">This week</span>
                </li>

                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={oggy} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Oggy</h3>
                        <p>Like your post</p>
                    </div>
                </li>

                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={oggy} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Oggy</h3>
                        <p>Like your post</p>
                    </div>
                </li>

                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={oggy} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Oggy</h3>
                        <p>Like your post</p>
                    </div>
                </li>

                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={oggy} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Oggy</h3>
                        <p>Like your post</p>
                    </div>
                </li>

                <li className="flex justify-between text-sm font-semibold tracking-wide py-1 mb-4">
                    <span className="opacity-80 text-base">This month</span>
                </li>

                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={jack} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Jack</h3>
                        <p>Like your post</p>
                    </div>
                </li>

                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={jack} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Jack</h3>
                        <p>Like your post</p>
                    </div>
                </li>

                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={jack} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Jack</h3>
                        <p>Like your post</p>
                    </div>
                </li>

                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={jack} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Jack</h3>
                        <p>Like your post</p>
                    </div>
                </li>

                <li className="flex justify-between text-sm font-semibold tracking-wide py-1 mb-4">
                    <span className="opacity-80 text-base">Earlier</span>
                </li>

                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={bob} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Bob</h3>
                        <p>Like your post</p>
                    </div>
                </li>
                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={bob} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Bob</h3>
                        <p>Like your post</p>
                    </div>
                </li>
                <li className="text-base flex  mb-4 " onClick={() => (window.location.href = '/profile')}>
                    <div className="flex-1 w-1/6 ">
                        <img src={bob} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Bob</h3>
                        <p>Like your post</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default NotificationPanel;
