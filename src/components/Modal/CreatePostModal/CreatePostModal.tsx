import React, { useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import camera from '../../../assets/image/icon/camera.png';
import avt from '../../../assets/image/avatar.png';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Switch } from '@headlessui/react';
import { PostCreate } from '../../../types/post-type';
import { Response } from '../../../types/api-type';
import { createNewPost } from '../../../services/post-service';
export interface CreatePostModalProps {
    show: boolean;
    onClose: () => void;
}

function CreatePostModal(props: CreatePostModalProps) {
    const { show, onClose } = props;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [like, setLike] = useState<boolean>(false);
    const [comment, setComment] = useState<boolean>(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setSelectedImage(e.target.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const closeModal = () => {
        onClose();
        setTimeout(function () {
            setSelectedImage(null);
            setLike(false);
            setComment(false);
        }, 1000);
    };

    const onPosting = async () => {
        const newPost: PostCreate = {
            userId: 1,
            title: title,
            content: title,
            commentStat: comment ? 1 : 0,
            isHideLike: like ? 1 : 0,
        };
        const res: Response<null> = await createNewPost(newPost);
        if (res.Status === 200) {
            alert('thành công');
        } else {
            alert('thất bại');
        }
        onClose();
    };

    console.log(like);

    return (
        <ModalContainer show={show} onClose={closeModal} width="extra-large" full>
            <div className=" min-h-[400px] flex flex-col w-full">
                <div className="border-b-2 border-gray-300 h-14 flex items-center justify-between w-full px-4">
                    <h1
                        onClick={onClose}
                        className="text-xl text-gray-500 font-semibold tracking-wide my-14 cursor-pointer hover:text-gray-600 transition"
                    >
                        Back
                    </h1>
                    <h1 className="font-semibold text-xl">Create new post</h1>
                    <h1
                        onClick={onPosting}
                        className="text-xl text-blue-400 font-semibold tracking-wide my-14 cursor-pointer hover:text-blue-500 transition"
                    >
                        Share
                    </h1>
                </div>
                <div className="h-[721px] flex mx-auto ">
                    <div className="w-[721px] h-full flex flex-col items-center justify-center border-r-2 border-gray-200 ">
                        {selectedImage == null && (
                            <>
                                <img src={camera} alt="img" className="w-[213px] h-[160px] mt-[-90px]" />
                                <h1 className="text-xl font-semibold tracking-wide my-14">
                                    Drag photos and videos here
                                </h1>

                                <label className="text-center cursor-pointer text-2xl bg-dark-blue text-white border-2 border-transparent rounded-xl w-96 py-2 opacity-90 transition hover:opacity-100">
                                    Select from computer
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </>
                        )}
                        {selectedImage && (
                            <img src={selectedImage} alt="selected img" className="max-w-[721px] max-h-[721px]" />
                        )}
                    </div>
                    <div className="w-[319px] h-full  pt-4">
                        <div className="flex items-center pl-4">
                            <img src={avt} alt="avt" className="w-12 h-12 circle mr-4" />
                            <h2 className="text-base font-semibold">cr7.ronaldo.official</h2>
                        </div>
                        <div className="mt-4 border-b-2 border-gray-200 pl-4">
                            <textarea
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full h-40 px-2 py-1 outline-none"
                                placeholder="Write a caption ..."
                            ></textarea>
                        </div>
                        <div className="flex justify-between items-center border-b-2 border-gray-200 h-11 pl-4">
                            <h2 className="opacity-80">Add location</h2>
                            <HiOutlineLocationMarker className="text-2xl " />
                        </div>
                        <div className="flex justify-between items-center border-b-2 border-gray-200 h-11 pl-4">
                            <h2 className="font-semibold tracking-wide">Hide like</h2>
                            <Switch
                                checked={like}
                                onChange={setLike}
                                className={`${like ? 'bg-blue-500' : 'bg-gray-400'}
                                relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    className={`${like ? 'translate-x-6' : 'translate-x-0'}
                                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                        </div>
                        <div className="flex justify-between items-center border-b-2 border-gray-200 h-11 pl-4">
                            <h2 className="font-semibold tracking-wide">Turn off commenting</h2>
                            <Switch
                                checked={comment}
                                onChange={setComment}
                                className={`${comment ? 'bg-blue-500' : 'bg-gray-400'}
                                relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
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
                </div>
            </div>
        </ModalContainer>
    );
}

export default CreatePostModal;
