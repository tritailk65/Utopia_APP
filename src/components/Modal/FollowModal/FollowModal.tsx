import { useState, useEffect } from 'react';
import { getListFollowingByCurrentUser } from '../../../services/following-service';
import ModalContainer from '../ModalContainer/ModalContainer';
import FollowItem from './FollowItem/FollowItem';
import { FollowingPostForViewer, UserPostForViewer } from '../../../types/post-type';
import { Response } from '../../../types/api-type';
import useDebounce from '../../../hooks/useDebounce';
import { getNameUser } from '../../../services/user-service';

export interface FollowModalProps {
    show: boolean;
    onClose: () => void;
}

function FollowModal(props: FollowModalProps) {
    const { show, onClose } = props;
    const [input, setInput] = useState<string>('');
    const [results, setResults] = useState<UserPostForViewer[]>([]);
    const delayDebounce = useDebounce(input, 1000);
    const [shouldReloadFollowing, setShouldReloadFollowing] = useState<boolean>(false);
        
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response: Response<UserPostForViewer[]> = await getListFollowingByCurrentUser();
                    console.log("asdas",response);
                    if (Array.isArray(response) && response.length > 0) {
                        const filteredResults = response.filter(user => {
                            return user.userName.toLowerCase().includes(input.toLowerCase());
                        });
                        setResults(filteredResults);
                    } else {
                        throw new Error('Invalid response format');
                    }
                } catch (error) {
                    console.error('There has been a problem with your fetch operation:', error);
                }
            };
    
            fetchData();
            if (shouldReloadFollowing) {
                fetchData();
                // Sau khi gọi fetchData, đặt shouldReloadFollowing về false để tránh việc load liên tục
                setShouldReloadFollowing(false);
            }
        }, [delayDebounce, shouldReloadFollowing]);
    
    

    const handleChange = (value: string) => {
        setInput(value);
    };
    return (
        <>
            <ModalContainer show={show} onClose={onClose} width="medium" full>
                <div className=" min-h-[400px] flex flex-col w-full max-h-screen overflow-auto" >
                    <div className="border-b-4 border-gray-300 h-12 flex items-center justify-center w-full">
                        <h1 className="font-semibold text-lg">Following</h1>
                    </div>
                    <div className="border-2 border-transparent rounded-lg mx-7  mt-4 mb-6 bg-gray-200 group">
                        <input
                            className="w-full bg-transparent px-4 py-1 text-lg outline-none"
                            placeholder="Search ..."
                            value={input}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {input && (
                        <button
                        className="absolute top-20 right-10 text-gray-500 cursor-pointer"
                        onClick={() => setInput('')}
                        >
                            X
                        </button>
                        )}
                    </div>
                    <div className="max-h-[456px] overflow-y-scroll mx-5">
                    {results.map((user) => (
                    <FollowItem key={user.id} user={user} setShouldReloadFollowing={setShouldReloadFollowing}/>
                ))}
                    </div>
                </div>
            </ModalContainer>
        </>
    );
}

export default FollowModal;

// import ModalContainer from '../ModalContainer/ModalContainer';
// import FollowItem from './FollowItem/FollowItem';
// export interface FollowModalProps {
//     show: boolean;
//     onClose: () => void;
// }

// function FollowModal(props: FollowModalProps) {
//     const { show, onClose } = props;

//     return (
//         <>
//             <ModalContainer show={show} onClose={onClose} width="medium" full>
//                 <div className=" min-h-[400px] flex flex-col w-full">
//                     <div className="border-b-4 border-gray-300 h-12 flex items-center justify-center w-full">
//                         <h1 className="font-semibold text-lg">Following</h1>
//                     </div>
//                     <div className="border-2 border-transparent rounded-lg mx-7  mt-4 mb-6 bg-gray-200 group">
//                         <input
//                             className="w-full bg-transparent px-4 py-1 text-lg outline-none"
//                             placeholder="Search ..."
//                         />
//                     </div>
//                     <div className="max-h-[456px] overflow-y-scroll mx-5">
//                         <FollowItem />
//                         <FollowItem />
//                         <FollowItem />
//                         <FollowItem />
//                         <FollowItem />
//                         <FollowItem />
//                         <FollowItem />
//                         <FollowItem />
//                         <FollowItem />
//                     </div>
//                 </div>
//             </ModalContainer>
//         </>
//     );
// }

// export default FollowModal;
