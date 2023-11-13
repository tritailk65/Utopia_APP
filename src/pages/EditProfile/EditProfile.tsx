import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import none_avatar from '../../assets/image/none_avatar.jpg';
import useInput from '../../hooks/useInput';
import CustomModal from './CustomModal'; // Import Modal
import { editprofile, getUserDataById, getUserDataByName, uploadAvatar } from '../../services/user-service';
import { backend_utils } from '../../utils/api-utils';
import { UserInfo } from '../../types/user-type';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import AlertDialog from '../../components/Dialog/AlertDialog/AlertDialog';

function EditProfile() {
    const userData: UserInfo = useGetUserInfo();

    const { formData, formError, handleInputChange, setFormError } = useInput({
        website: '',
        blo: '',
        gender: '',
        fullName: '',
    });

    //kiem tra blog
    const [blog, setBlog] = useState('');
    const maxCharacters = 150;
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Thêm trạng thái modal
    // kiem tra hien bang gi
    const [isCheck, setIsCheck] = useState(false);
    const id = userData?.id;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFilePreview, setSelectedFilePreview] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleLinkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            setSelectedFilePreview(URL.createObjectURL(e.target.files[0]));
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleBlogChange = (e: { target: { value: any } }) => {
        const inputText = e.target.value;
        if (inputText.length <= maxCharacters) {
            setBlog(inputText);
            formData.blo = inputText;
        }
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        handleInputChange(e);
    };

    const handleSubmit = () => {
        const data = {
            fullName: formData.fullName || (userData ? userData.fullName : ''),
            gender: formData.gender || (userData ? userData.gender : ''),
            bio: formData.blo || (userData ? userData.bio : ''),
            website: formData.website || (userData ? userData.website : ''),
        };

        if (selectedFile) {
            uploadAvatar(userData.id, selectedFile);
        }

        editprofile(id, data)
            .then((response) => {
                if (response.Status === 200) {
                    setSuccessMessage('Cập nhật thành công !');
                    setIsModalOpen(true);
                    setIsCheck(true);
                }
            })
            .catch((error) => {
                setSuccessMessage('Cập nhật thất bại!');
                setIsModalOpen(true);
                setIsCheck(false);
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        getUserDataById(userData.id).then((res) => {
            if (res.Status == 200) {
                console.log(res.Data);
                localStorage.setItem('userData', JSON.stringify(res.Data));
            }
        });
    };

    return (
        <div className="w-[100%]  p-6 rounded-md">
            <h1 className="text-2xl font-bold mt-[80px]">Edit Profile</h1>

            <div className="ml-[200px] mt-[80px]">
                <div className="mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-[20%] rounded-full overflow-hidden">
                            {selectedFilePreview != '' ? (
                                <img src={selectedFilePreview} className="rounded-full h-[70px] w-[70px] " alt="img" />
                            ) : (
                                <img
                                    src={backend_utils.imagePath + userData?.avatarPath}
                                    className="rounded-full h-[70px] w-[70px]"
                                    alt="img"
                                />
                            )}
                        </div>
                        <div className="">
                            <div className="bg-white w-full h-5 ">
                                <h2 className="w-full text-base font-semibold text-black">{userData?.userName}</h2>
                            </div>

                            <a href="/" className="text-blue-600 hover:underline  float-left" onClick={handleLinkClick}>
                                Change Profile Photo
                            </a>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="flex space-x-2">
                        <label htmlFor="website" className="block text-[20px] font-bold">
                            Website
                        </label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            className="w-[350px] rounded-md border-gray-900 shadow-sm border-2 font-extrabold"
                            placeholder={userData?.website}
                            value={formData.website}
                            onChange={handleInputChange}
                        />
                        {formError.website && (
                            <div className="error-messag text-red-600 mt-2 text-[14px]">{formError.website}</div>
                        )}
                    </div>

                    <div className="flex space-x-[42px]">
                        <label htmlFor="blog" className="block text-[20px] font-bold">
                            Blog
                        </label>
                        <input
                            type="text"
                            id="blog"
                            name="blog"
                            className="w-[350px] h-[100px] rounded-md border-gray-900 shadow-sm border-2 font-extrabold"
                            placeholder={userData?.bio}
                            value={blog}
                            onChange={handleBlogChange}
                        />
                        {formError.blog && (
                            <div className="error-messag text-red-600 mt-2 text-[14px]">{formError.blog}</div>
                        )}
                    </div>
                    <span className="text-gray-500 text-sm ml-[85px]">
                        {blog.length}/{maxCharacters}
                    </span>

                    <div className="flex space-x-4">
                        <label htmlFor="gender" className="block text-[20px] font-bold">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            className="w-[350px] rounded-md border-gray-900 shadow-sm border-2"
                            value={formData.gender ? formData.gender : userData?.gender}
                            onChange={handleGenderChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="ml-[82px]">
                        <button
                            type="submit"
                            className="bg-blue-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <AlertDialog
                    title="Thông báo"
                    message={successMessage}
                    show={isModalOpen}
                    result={isCheck}
                    onClose={() => closeModal()}
                />
            </div>
        </div>
    );
}

export default EditProfile;
