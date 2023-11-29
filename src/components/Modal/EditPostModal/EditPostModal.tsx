import ModalContainer from '../ModalContainer/ModalContainer';
import useEditPostModal from '../../../hooks/useEditPostModal';
import { Switch } from '@headlessui/react';
import { useState, useEffect } from 'react';
import useCommentModal from '../../../hooks/useCommentModal';
import { Response } from '../../../types/api-type';
import { editPostService } from '../../../services/post-service';
import { PostEdit } from '../../../types/post-type';
import { useNavigate } from 'react-router-dom';

function EditPostModal() {
    const { editPostState, closeEditModal } = useEditPostModal();
    const [input, setInput] = useState<string>(editPostState.title);
    const [like, setLike] = useState<boolean>(editPostState.isHideLike === 0 ? false : true);
    const [comment, setComment] = useState<boolean>(editPostState.commentStat === 0 ? false : true);

    useEffect(() => {
        setInput(editPostState.title);
        setLike(editPostState.isHideLike === 0 ? false : true);
        setComment(editPostState.commentStat === 0 ? false : true);
    }, [editPostState]);

    const handleConfirm = async () => {
        const model: PostEdit = {
            postId: editPostState.postId,
            title: input,
            isHideLike: like === true ? 1 : 0,
            commentStat: comment === true ? 1 : 0,
        };
        const res: Response<null> = await editPostService(model);
        if (res.Status === 200) {
            setTimeout(() => {
                window.location.href = `/post/${editPostState.postId}`;
            }, 1500);
        }
    };

    const handleCancel = () => {
        closeEditModal();
    };

    return (
        <ModalContainer show={editPostState.show} onClose={handleCancel} width="tiny" full zIndex="z-50">
            <div className="flex flex-col w-full">
                <div className="border-b-4 border-gray-300 h-12 flex items-center justify-center w-full">
                    <h1 className="font-semibold text-lg">Edit post</h1>
                </div>
                <div className="flex-1 flex flex-col">
                    <p className="font-semibold mt-2 ml-4">Title</p>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-20 px-4 py-1 outline-none border-b-2 border-gray-200"
                        placeholder="Write a caption ..."
                    ></textarea>
                    <div className="flex justify-between items-center border-b-2 border-gray-200 h-11 pl-4">
                        <h2 className="font-semibold tracking-wide">Hide like</h2>
                        <Switch
                            checked={like}
                            onChange={setLike}
                            className={`${like ? 'bg-blue-500' : 'bg-gray-400'}
                                mr-4 relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={`${like ? 'translate-x-6' : 'translate-x-0'}
                                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                    </div>
                    <div className="flex justify-between items-center h-10 pl-4 mb-[-6px]">
                        <h2 className="font-semibold tracking-wide">Turn off commenting</h2>
                        <Switch
                            checked={comment}
                            onChange={setComment}
                            className={`${comment ? 'bg-blue-500' : 'bg-gray-400'}
                               mr-4  relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={`${comment ? 'translate-x-6' : 'translate-x-0'}
                                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                    </div>
                </div>
                <div className="text-center">
                    {input.length > 0 && (
                        <div
                            className="h-11 mt-3 flex items-center justify-center border-t-2 border-gray-400 px-6 text-lg font-semibold text-red-500 cursor-pointer hover:bg-slate-100 transition"
                            onClick={handleConfirm}
                        >
                            <h1>Confirm</h1>
                        </div>
                    )}
                    {input.length <= 0 && (
                        <div className="h-11 mt-3 flex items-center justify-center border-t-2 border-gray-400 px-6 text-lg font-semibold text-red-500 opacity-80">
                            <h1>Confirm</h1>
                        </div>
                    )}
                    <div
                        className="h-10 flex items-center justify-center cursor-pointer border-t-2 border-gray-400 px-6 text-lg hover:bg-slate-100 transition"
                        onClick={handleCancel}
                    >
                        <h1>Cancel</h1>
                    </div>
                </div>
            </div>
        </ModalContainer>
    );
}

export default EditPostModal;
