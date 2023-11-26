import { ReplyComment } from '../../../../types/comment-type';
import { backend_utils as backend } from '../../../../utils/api-utils';
import usePostingComment from '../../../../hooks/usePostingComment';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Menu, Transition } from '@headlessui/react';
import { EditComment } from '../../../../types/comment-type';
import { Response } from '../../../../types/api-type';
import { deleteCommentService, editCommentService } from '../../../../services/comment-service';
import { useState, Fragment } from 'react';
import useGetUserInfo from '../../../../hooks/useGetUserInfo';

interface ReplyItemProps {
    data: ReplyComment;
    fetchData: () => void;
    toast: (result: boolean, message: string) => void;
}

function ReplyItem(props: ReplyItemProps) {
    const [data, setData] = useState<ReplyComment>(props.data);
    const { toast, fetchData } = props;
    const [show, setShow] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [del, setDel] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const { onFocusReply } = usePostingComment();
    const user = useGetUserInfo();

    const handleEdit = async () => {
        try {
            const tmp: EditComment = {
                idUser: user.id,
                comment: input,
            };
            const res: Response<boolean> = await editCommentService(tmp, data.id);
            if (res.Status === 200) {
                const updatedComment: ReplyComment = { ...data };
                updatedComment.comment = input;
                setData(updatedComment);
                setInput('');
                setEdit(false);
                toast(true, 'Edit comment successfully !');
            } else {
                setInput('');
                setEdit(false);
                toast(false, 'Something wrong please try again !');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async () => {
        try {
            const res: Response<boolean> = await deleteCommentService(data.id);
            if (res.Status === 200) {
                setDel(true);
                toast(true, 'Delete comment successfully !');
            } else {
                toast(false, 'Something wrong please try again !');
            }
            fetchData();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={`${del ? 'hidden' : 'flex mb-6'}`}>
            <div className="w-[12%]">
                <img src={backend.imagePath + data.user.avatarPath} alt="avt" className="circle w-9 h-9" />
            </div>
            <div className="text-sm w-[88%] pr-2">
                <div className={`comment-container `}>
                    <div className={`${edit ? 'flex items-center' : 'inline-block'} `}>
                        <span className="font-semibold mr-3">{data.user.userName}</span>
                        {edit ? (
                            <div className="flex-1 mr-2 h-[20px] flex items-center">
                                <textarea
                                    className="h-full flex-1 mr-2 outline-none"
                                    placeholder="Add a comment..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <span
                                    onClick={() => handleEdit()}
                                    className="text-xs mb-[-2px] mr-2 text-blue-500 w-[10%] cursor-pointer font-semibold transition hover:text-blue-700"
                                >
                                    Save
                                </span>
                                <span
                                    onClick={() => setEdit(false)}
                                    className="text-xs mb-[-2px] text-red-500 w-[10%] cursor-pointer font-semibold transition hover:text-red-700"
                                >
                                    Cancel
                                </span>
                            </div>
                        ) : (
                            <span>{data.comment}</span>
                        )}
                    </div>
                    {edit === false && data.cmtOwner === true && (
                        <Menu as="div" className="inline-block">
                            <Menu.Button>
                                <BsThreeDotsVertical className="mb-[-2px] transition cursor-pointer opacity-80 hover:opacity-100 ml-2" />
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute z-50 shadow mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => setEdit(true)}
                                                    className={`${
                                                        active ? 'bg-gray-100 ' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleDelete()}
                                                    className={`${
                                                        active ? 'bg-gray-100 ' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    )}
                </div>
                <div className="mt-1">
                    <span className="text-xs mr-2 cursor-pointer font-semibold opacity-70">27.802</span>
                    <span className="text-xs mr-4 cursor-pointer font-semibold opacity-70 transition hover:opacity-100">
                        Likes
                    </span>
                    <span
                        className="text-xs  cursor-pointer font-semibold opacity-70 transition hover:opacity-100"
                        onClick={() => onFocusReply(data.postId, data.id, data.user.userName)}
                    >
                        Reply
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ReplyItem;
