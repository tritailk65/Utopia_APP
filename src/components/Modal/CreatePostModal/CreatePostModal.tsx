import React, { useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import camera from '../../../assets/image/icon/camera.png';
import avt from '../../../assets/image/avatar.png';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Switch } from '@headlessui/react';
import { PostCreate } from '../../../types/post-type';
import { Response } from '../../../types/api-type';
import { createNewPost } from '../../../services/post-service';
import useCreatePostModal from '../../../hooks/useCreatePostModal';
import { uploadPostImage } from '../../../services/post-service';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UserInfo } from '../../../types/user-type';
import useGetUserInfo from '../../../hooks/useGetUserInfo';
const settings: Settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots',
};

interface PostImage {
    file: File;
    image: string;
}

function CreatePostModal() {
    const user: UserInfo = useGetUserInfo();
    const [files, setFiles] = useState<PostImage[]>([]);
    const [title, setTitle] = useState<string>('');
    const [like, setLike] = useState<boolean>(false);
    const [comment, setComment] = useState<boolean>(false);
    const { createPostModalState, closeCreatePostModal } = useCreatePostModal();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const newItems: PostImage[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    const newItem: PostImage = {
                        file: file,
                        image: e.target.result as string,
                    };
                    newItems.push(newItem);
                    if (i === files.length - 1) {
                        setFiles((prevTmp) => (prevTmp ? [...prevTmp, ...newItems] : newItems));
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const closeModal = () => {
        closeCreatePostModal();
        setTimeout(function () {
            setLike(false);
            setComment(false);
            setFiles([]);
        }, 1000);
    };

    const onPosting = async () => {
        const newPost: PostCreate = {
            userId: user.id,
            title: title,
            content: title,
            commentStat: comment ? 1 : 0,
            isHideLike: like ? 1 : 0,
        };
        const res: Response<number> = await createNewPost(newPost);
        if (res.Status === 200) {
            files.map(async (val) => {
                const tmp = await uploadPostImage(res.Data, val.file);
            });
            alert('thành công');
            window.location.reload();
        } else {
            alert('thất bại');
        }
        closeModal();
    };

    return (
        <ModalContainer show={createPostModalState.show} onClose={closeModal} width="extra-large" full>
            <div className=" min-h-[400px] flex flex-col w-full">
                <div className="border-b-2 border-gray-300 h-14 flex items-center justify-between w-full px-4">
                    <h1
                        onClick={closeModal}
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
                    <div
                        className={`w-[721px] h-full ${
                            files.length <= 0 && 'flex flex-col items-center justify-center '
                        } border-r-2 border-gray-200 `}
                    >
                        {files.length <= 0 && (
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
                                        multiple
                                    />
                                </label>
                            </>
                        )}
                        {files!.length > 0 && (
                            <Slider {...settings}>
                                {files!.map((item) => (
                                    <div className="!flex !items-center !justify-center !h-[720.98px]">
                                        <img
                                            src={item.image!}
                                            alt="selected img"
                                            className="max-w-[721px] max-h-[721px]"
                                        />
                                    </div>
                                ))}
                            </Slider>
                            //<img src={tmp[1].image!} alt="selected img" className="max-w-[721px] max-h-[721px]" />
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
