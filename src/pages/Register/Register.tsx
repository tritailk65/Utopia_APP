import logo1 from '../../assets/image/logo/logo1.png';
import '../Login/Login.css';
import useInput from '../../hooks/useInput';
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import CustomModal from '../EditProfile/CustomModal'; 
import {register} from '../../services/user-service';

function Register() {
    //Tạo State cho các biến
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [successMessage, setSuccessMessage] = useState('');
    const [check, setIsCheck] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    // lấy giá trị từ form
    const { formData, formError, handleInputChange, setFormError } = useInput({
        phone: '',
        fullName: '',
        userName: '',
        password: '',
        email: '',
    });

    //check dang ki
    const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const phoneRegex = /^\d{10}$/;
    const userNameRegex= /^[a-zA-Z0-9]{6,15}$/;// Kiểm tra userName gồm ký tự lẫn số và hơn 6 kí tự
    const passwordRegex= /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{8,15})/; // Kiểm tra password có ít nhất 1 chữ hoa, 1 kí tự đặt biệt và số, ít nhất 8 kí tự
    const fullNameRegex = /^[\p{L}0-9\s]{3,10}$/u;// Kiểm tra fullName có từ 3 đến 10 ký tự và không chứa ký tự đặc biệt, lấy dấu

    const handleRegister = () => {
        const error: { [key: string]: string } = {};
        if (!formData.phone) {
            error.phone = "Phone is required";
        }else if(!phoneRegex.test(formData.phone)){
            error.phone = "Phone is not valid";
        }
        if (!formData.fullName) {
            error.fullName = "fullName is required";
        }else if(!fullNameRegex.test(formData.fullName)){
            error.fullName = "fullName requires 3-10 characters and contains no special characters";
        }
        if (!formData.userName) {
            error.userName = "userName is required";
        }else if(!userNameRegex.test(formData.userName)){
            error.userName = "userName requires 6-15 characters and contains no special characters";
        }
        if (!formData.email) {
            error.email = "email is required";
        }else if(!emailRegex.test(formData.email)){
            error.email = "email is not valid";
        }

        if (!formData.password) {
            error.password = "Password is required";
        }else if(!passwordRegex.test(formData.password)){
            error.password = "Password must have at least 1 uppercase letter, 1 special character, 1 number, and be at least 8 characters long";
        }
        //set gia tri error cho bien setFormError
        setFormError(error);
        // neu khong co loi nao thi chay
        if (Object.keys(error).length === 0) {
        const RgtData = {
            phone   : formData.phone,
            password: formData.password,
            fullName: formData.fullName,
            userName: formData.userName,
            email   : formData.email,
        };
        // goi API
         register(RgtData)
            .then((response) => {
                if (response.Status === 200) {
                    setSuccessMessage('Đăng ký thành công! Back to <a className="text-blue-700 hover:underline" href="/login">Login</a>');
                    setIsModalOpen(true);
                    setIsCheck(true);
                } 
                else if (response.data.Status === 400) {
                    const errorMessage = response.data.Message;
                    const parsedErrorMessage = errorMessage.split(': ')[1];
                    setSuccessMessage(parsedErrorMessage);
                    setIsModalOpen(true);
                    setIsCheck(false);
                } 
            })
            .catch((error) => {
                console.log(error);
            });            
    };
    }
    return (
        <div className="min-h-full w-full">
            <div className="w-[570px] h-[855px]  m-auto mt-7  border-slate-600 med-border ">
                <img src={logo1} className="w-[428px] h-[220px] m-auto" alt="img" />

                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-14 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="phone"
                        placeholder="Your phone "
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    {formError.phone && <div className="error-messag text-red-600 mt-2 text-[14px]">{formError.phone}</div>}
                </div>

                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-14 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {formError.email && <div className="error-messag text-red-600 mt-2 text-[14px]">{formError.email}</div>}
                </div>

                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-14 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="fullName"
                        placeholder="Full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                    />
                    {formError.fullName && <div className="error-messag text-red-600 mt-2 text-[14px]">{formError.fullName}</div>}
                </div>

                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-14 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                    {formError.userName && <div className="error-messag text-red-600 mt-2 text-[14px]">{formError.userName}</div>}
                </div>

                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-14 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {formError.password && <div className="error-messag text-red-600 mt-2 text-[14px]">{formError.password}</div>}
                </div>
                <div className="w-[420px] mx-auto">
                    <button 
                    className="bg-dark-blue border-dark-blue transition sm-border text-white text-2xl w-[420px] m-auto  h-14 mt-5 hover:bg-white hover:text-dark-blue"
                    onClick={handleRegister}
                    >
                        Sign up
                    </button>
                </div>
            </div>
            <div className="w-[570px] h-[100px]  m-auto mt-10 rounded-2xl border-slate-600 border-2 flex-all-center">
                <span className="text-xl mr-2">Have an account?</span>
                <Link to={'/login'}>
                    <span className="text-xl font-semibold cursor-pointer">Log in</span>
                </Link>
            </div>
            <CustomModal isOpen={isModalOpen} check= {check} message={successMessage} onClose={closeModal} />
        </div>
    );
}

export default Register;
