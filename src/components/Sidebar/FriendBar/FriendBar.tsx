import React from 'react';
import oggy from '../../../assets/image/oggy.png';
import olivia from '../../../assets/image/olivia.png';
import bob from '../../../assets/image/bob.png';
import jack from '../../../assets/image/jack.png';
import dee from '../../../assets/image/dee.png';
import StickyWrapper from '../../Wrapper/StickyWrapper/StickyWrapper';
import { Link } from 'react-router-dom';
function FriendBar() {
    return (
        <StickyWrapper top={14} right={0} paddingLeft={16}>
            <ul className=" w-[319px] px-2">
                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 ">
                        <img src={olivia} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Olivia</h3>
                        <p>OliviaCute</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span className="text-sm">Switch</span>
                    </div>
                </li>

                <li className="flex justify-between text-sm tracking-wide py-1 mb-4">
                    <span className="opacity-80 text-base">Suggested for you</span>
                    <Link to="/SuggestFollowAll">
                        <span className="font-semibold cursor-pointer hover:text-[#787878]">See all</span>
                    </Link>
                </li>

                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 ">
                        <img src={oggy} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Oggy</h3>
                        <p>Suggested for you</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span className="text-sm">Follow</span>
                    </div>
                </li>
                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 ">
                        <img src={jack} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Jack</h3>
                        <p>Suggested for you</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span className="text-sm">Follow</span>
                    </div>
                </li>
                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 ">
                        <img src={bob} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Bob</h3>
                        <p>Suggested for you</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span className="text-sm">Follow</span>
                    </div>
                </li>
                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 ">
                        <img src={dee} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">DeeDee</h3>
                        <p>Suggested for you</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span className="text-sm">Follow</span>
                    </div>
                </li>
            </ul>
        </StickyWrapper>
        // <div className="max-w-[383px] min-h-screen  pl-16 shrink z-10 ">
        //     <div className=" mt-8  sticky top-14 right-0 ">

        //     </div>
        // </div>
    );
}

export default FriendBar;
