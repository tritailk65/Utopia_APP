import React, { useState, useRef } from 'react';
import hinhdaidien from '../../assets/image/hinhdaidien.png';
import useInput from '../../hooks/useInput';
import CustomModal from './CustomModal'; // Import Modal

function EditProfile() {
    const { formData, handleInputChange } = useInput({
        website: '',
        blo: '',
        gender: '',
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
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
                setSelectedFileName(file.name);
            }
        }
    };

    //kiem tra blog
    const [blog, setBlog] = useState('');
    const maxCharacters = 150;
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Thêm trạng thái modal

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
        // Thực hiện các xử lý khác nếu cần
    };

    const handleSubmit = () => {
        // Thực hiện xử lý gửi dữ liệu
        // Sau khi gửi thành công, thiết lập giá trị `successMessage`
        // và mở modal
        setSuccessMessage('Cập nhật thành công!');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="w-[700px]  p-6 rounded-md">
            <h1 className="text-2xl font-bold mt-[150px]">Edit Profile</h1>

            <div className="ml-[200px] mt-[100px]">
                <div className="mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                            <img src={hinhdaidien} className="object-cover w-full h-full" alt="img" />
                        </div>
                        <div className="">
                            <h1 className="ml-5">hello</h1>
                            <a href="/" className="text-blue-600 hover:underline ml-5" onClick={handleLinkClick}>
                                Change Profile Photo
                            </a>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            {selectedFileName && <p className="ml-[20px]">Selected file: {selectedFileName}</p>}
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
                            className="w-[350px] rounded-md border-gray-900 shadow-sm border-2"
                            placeholder="Website"
                            value={formData.website}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex space-x-[42px]">
                        <label htmlFor="blog" className="block text-[20px] font-bold">
                            Blog
                        </label>
                        <input
                            type="text"
                            id="blog"
                            name="blog"
                            className="w-[350px] h-[100px] rounded-md border-gray-900 shadow-sm border-2"
                            placeholder="Blog"
                            value={blog}
                            onChange={handleBlogChange}
                        />
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
                            value={formData.gender}
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
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <CustomModal isOpen={isModalOpen} message={successMessage} onClose={closeModal} />
            </div>
        </div>
    );
}

export default EditProfile;
