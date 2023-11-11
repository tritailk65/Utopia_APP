import logo1 from '../../assets/image/logo/logo1.png';
import '../Login/Login.css';
import useInput from '../../hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import CustomModal from '../EditProfile/CustomModal';
import { userRegister } from '../../services/user-service';

function Register() {
    const navigate = useNavigate();
    //Tạo State cho các biến
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [check, setIsCheck] = useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        if (!isRegisterSuccess) {
            setIsModalOpen(false);
        } else {
            navigate('/login');
        }
    };

    // lấy giá trị từ form
    const { formData, formError, handleInputChange, setFormError } = useInput({
        phoneOrEmail: '',
        fullName: '',
        userName: '',
        password: '',
    });

    //check dang ki
    const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const phoneRegex = /^\d{10}$/;
    const userNameRegex = /^[a-zA-Z0-9_-]{6,15}$/; // Kiểm tra userName gồm ký tự lẫn số và hơn 6 kí tự
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{8,15})/; // Kiểm tra password có ít nhất 1 chữ hoa, 1 kí tự đặt biệt và số, ít nhất 8 kí tự
    const fullNameRegex = /^.*[\p{L}A-Za-z0-9\s_-]{3,10}$/u; // Kiểm tra fullName có từ 3 đến 10 ký tự và không chứa ký tự đặc biệt, lấy dấu

    //For check phone or email
    function isNumeric(str: string) {
        if (typeof str != 'string') return false; // we only process strings!
        return (
            !isNaN(parseInt(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str))
        ); // ...and ensure strings of whitespace fail
    }

    const handleRegister = () => {
        const error: { [key: string]: string } = {};

        if (!formData.phoneOrEmail) {
            error.phoneOrEmail = 'Phone or Email is required';
        } else if (!(phoneRegex.test(formData.phoneOrEmail) || emailRegex.test(formData.phoneOrEmail))) {
            error.phoneOrEmail = 'Phone or email is not valid';
        }
        if (!formData.fullName) {
            error.fullName = 'fullName is required';
        } else if (!fullNameRegex.test(formData.fullName)) {
            error.fullName = 'fullName requires 3-10 characters and contains no special characters';
        }
        if (!formData.userName) {
            error.userName = 'userName is required';
        } else if (!userNameRegex.test(formData.userName)) {
            error.userName = 'userName requires 6-15 characters and contains no special characters';
        }
        if (!formData.password) {
            error.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            error.password =
                'Password must have at least 1 uppercase letter, 1 special character, 1 number, and be at least 8 characters long';
        }
        //set gia tri error cho bien setFormError
        setFormError(error);
        // neu khong co loi nao thi chay
        if (Object.keys(error).length === 0) {
            const RgtData = {
                phone: '',
                email: '',
                password: formData.password,
                fullName: formData.fullName,
                userName: formData.userName,
            };
            if (isNumeric(formData.phoneOrEmail)) {
                RgtData.phone = formData.phoneOrEmail;
            } else {
                RgtData.email = formData.phoneOrEmail;
            }

            // goi API
            userRegister(RgtData)
                .then((response) => {
                    if (response.Status === 200) {
                        setSuccessMessage('Đăng ký thành công!');
                        setIsCheck(true);
                        setIsModalOpen(true);
                        setIsRegisterSuccess(true);
                    } else if (response.Status === 400) {
                        const errorMessage = response.Message;
                        const parsedErrorMessage = errorMessage.split(': ')[1];
                        setSuccessMessage(parsedErrorMessage);
                        setIsCheck(false);
                        setIsModalOpen(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="min-h-full w-full">
            <div className="w-[570px] h-fit  m-auto mt-7  border-slate-600 med-border ">
                <img src={logo1} className="w-[428px] h-[220px] m-auto" alt="img" />

                {/* Phone or email */}
                {formError.phoneOrEmail && (
                    <div className="error-messag text-red-600 text-[14px]">
                        <h2 className="ml-20 my-2">&#x2022; {formError.phoneOrEmail}</h2>
                    </div>
                )}
                <div className="group bg-[#efeeee]/30 w-[420px]  m-auto mb-4 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="phoneOrEmail"
                        placeholder="Mobile number or Email "
                        value={formData.phoneOrEmail}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Fullname */}
                {formError.fullName && (
                    <div className="error-messag text-red-600 text-[14px]">
                        <h2 className="ml-20 my-2">&#x2022; {formError.fullName}</h2>
                    </div>
                )}
                <div className="group bg-[#efeeee]/30 w-[420px]  m-auto mb-4 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="fullName"
                        placeholder="Full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                    />
                </div>

                {/* User name */}
                {formError.userName && (
                    <div className="error-messag text-red-600 text-[14px]">
                        <h2 className="ml-20 my-2">&#x2022; {formError.userName}</h2>
                    </div>
                )}
                <div className="group bg-[#efeeee]/30 w-[420px]  m-auto mb-4 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Password */}
                {formError.password && (
                    <div className="error-messag text-red-600 text-[14px]">
                        <h2 className="ml-20 my-2">&#x2022; {formError.password}</h2>
                    </div>
                )}
                <div className="group bg-[#efeeee]/30 w-[420px]  m-auto mb-4 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="w-[420px] mx-auto my-10">
                    <button
                        className="bg-dark-blue border-dark-blue transition sm-border text-white text-2xl w-[420px] m-auto  h-14 mt-5 hover:bg-white hover:text-dark-blue"
                        onClick={handleRegister}
                    >
                        Sign up
                    </button>
                </div>
            </div>
            <div className="w-[570px] h-[100px]  m-auto my-10 rounded-2xl border-slate-600 border-2 flex-all-center">
                <span className="text-xl mr-2">Have an account?</span>
                <Link to={'/login'}>
                    <span className="text-xl font-semibold cursor-pointer">Log in</span>
                </Link>
            </div>
            <CustomModal isOpen={isModalOpen} check={check} message={successMessage} onClose={closeModal} />
        </div>
    );
}

export default Register;
