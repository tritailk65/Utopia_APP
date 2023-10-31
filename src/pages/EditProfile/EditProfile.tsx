import React, { useState, useRef,useEffect } from 'react';
import hinhdaidien from '../../assets/image/hinhdaidien.png';
import useInput from '../../hooks/useInput';
import CustomModal from './CustomModal'; // Import Modal
import {editprofile,getAvatar,uploadAvatar} from '../../services/user-service';


interface UserData {
    id: BigInteger,
    userName: string,
    phone: string,
    email: string,
    fullName: string,
    gender: string,
    bio: string,
    website: string,
    avatarPath: string
}

function EditProfile() {
    const [userData, setUserData] = useState<UserData | null>(null);
        useEffect(() => {
            // Truy cập Local Storage để lấy thông tin người dùng
            const userFromLocalStorage = localStorage.getItem('userData');
            if (userFromLocalStorage) {
                const userData = JSON.parse(userFromLocalStorage);
                setUserData(userData);
                fetchAvatar(userData.id);
            }
            // mỗi lần load trang ảnh hưởng tới trạng thái nên cần lưu url hình vô local r gán cho trạng thái để xuất hình
            const storedAvatarUrl = localStorage.getItem('avatarUrl');
            if (storedAvatarUrl) {
                setAvatarUrl(storedAvatarUrl);
            }
        }, []);

    const { formData, formError, handleInputChange, setFormError } = useInput({
        website: '',
        blo: '',
        gender: '',
        fullName:'',
    });
    const id = userData?.id;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
     // Thêm state để lưu trữ tệp người dùng đã chọn
     const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleLinkClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của liên kết (chuyển trang)
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Khi ấn vào link, kích hoạt sự kiện click cho file input
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                setSelectedFileName(file.name); // lưu trữ tên file đã chọn
                setSelectedFile(file); // lưu trữ file đã chọn
            }
        }
    };
    const handleFileUpload = () => {
        if (selectedFile) {
            uploadAvatar(userData?.id, selectedFile)
                .then((response) => {
                    setAvatarUrl(response);
                })
                .catch((error) => {
                    console.error('File upload failed', error);
                });
        }
    };
    
      const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
      const fetchAvatar = (id: any) => {
        getAvatar(id)
          .then((avatarUrl) => {
            if (avatarUrl !== undefined) 
            {
            localStorage.setItem('avatarUrl', avatarUrl);
            setAvatarUrl(avatarUrl);
            }     
          })
      };
      

    //kiem tra blog
    const [blog, setBlog] = useState('');
    const maxCharacters = 150;
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Thêm trạng thái modal
    // kiem tra hien bang gi
    const [isCheck, setIsCheck]= useState(false);

    const handleBlogChange = (e: { target: { value: any } }) => {
        const inputText = e.target.value;
        if (inputText.length <= maxCharacters) {
            setBlog(inputText);
            formData.blo = inputText;
        }
    };

    // Xử lý sự kiện khi giá trị "Gender" thay đổi
    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        //const selectedValue = e.target.value;
        handleInputChange(e); // Cập nhật giá trị 'gender' trong 'formData'
    };
     // Xử lí cập nhật
    const handleSubmit = () => {
        const error: { [key: string]: string } = {};
        const data = {
            fullName: formData.fullName || (userData ? userData.fullName : ''),
            gender: formData.gender || (userData ? userData.gender : ''),
            bio: formData.blo || (userData ? userData.bio : ''),
            website: formData.website || (userData ? userData.website : ''),
        };
  
        editprofile(id,data)
                .then((response) => {
                    if (response.data.Status === 200) {
                        setSuccessMessage('Cập nhật thành công !');
                        setIsModalOpen(true);
                        setIsCheck(true);
                        const userUpdate = {
                            id: userData?.id,
                            userName: userData?.userName,
                            phone: userData?.phone,
                            email: userData?.email,
                            fullName: formData.fullName || (userData ? userData.fullName : ''),
                            gender: formData.gender || (userData ? userData.gender : ''),
                            bio: formData.blo || (userData ? userData.bio : ''),
                            website: formData.website || (userData ? userData.website : ''),
                        };
                        localStorage.setItem('userData', JSON.stringify(userUpdate));
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
        window.location.reload();
    };

    const handleCombinedClick = () => {
        handleSubmit();
        if(selectedFileName){
        handleFileUpload();
        }
      };
    return (
        <div className="w-[700px]  p-6 rounded-md">
            <h1 className="text-2xl font-bold mt-[150px]">Edit Profile</h1>

            <div className="ml-[200px] mt-[100px]">
                <div className="mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                            <img src={avatarUrl || hinhdaidien} className="object-cover w-full h-full" alt="img" />
                        </div>
                        <div className="">
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="w-[350px] rounded-md border-gray-900 shadow-sm border-2 ml-[35px] font-extrabold"
                            value={formData.fullName}
                            placeholder={userData?.fullName}
                            onChange={handleInputChange}
                        />
                            <a href="/" className="text-blue-600 hover:underline ml-[35px]" onClick={handleLinkClick}>
                                Change Profile Photo
                            </a>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            {selectedFileName && <p className="ml-[35px]">Selected file: {selectedFileName}</p>}
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
                        {formError.website && <div className="error-messag text-red-600 mt-2 text-[14px]">{formError.website}</div>}
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
                        {formError.blog && <div className="error-messag text-red-600 mt-2 text-[14px]">{formError.blog}</div>}
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
                            value={ formData.gender ? formData.gender :userData?.gender }
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
                            onClick={handleCombinedClick}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <CustomModal isOpen={isModalOpen} check= {isCheck} message={successMessage} onClose={closeModal} />
            </div>
        </div>
    );
}

export default EditProfile;
