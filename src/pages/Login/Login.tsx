import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../EditProfile/CustomModal';
import useInput from '../../hooks/useInput';
import logo1 from '../../assets/image/logo/logo1.png';
import './Login.css';
import {login} from '../../services/user-service';

function Login() {
    const navigate = useNavigate();
    const { formData, formError, handleInputChange, setFormError } = useInput({
        value: '',
        password: '',
    });

    const [fieldType, setFieldType] = useState<'userName' | 'phone' | 'email'>('userName');

    const determineFieldType = (value: string): 'userName' | 'phone' | 'email' => {
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (emailRegex.test(value)) {
            return 'email';
        } else if (phoneRegex.test(value)) {
            return 'phone';
        } else {
            return 'userName';
        }
    };

    const handleInputValueChange = (value: string) => {
        const newFieldType = determineFieldType(value);
        setFieldType(newFieldType);
    };

    const handleLogin = () => {
        const error: { [key: string]: string } = {};

        if (!formData.value) {
            error.value = "Username, phone, or email is required";
        }

        if (!formData.password) {
            error.password = "Password is required";
        }

        setFormError(error); // Set the errors

        if (Object.keys(error).length === 0) {
          // Validation passed, make the API call
          const loginData = {
              [fieldType]: formData.value,
              password: formData.password,
          };
      
          login(loginData)
              .then((response) => {
                  if (response.Status === 200) {
                      localStorage.setItem('userData', JSON.stringify(response.Data));
                      navigate('/');
                  } else if (response.Status === 404) {
                      setSuccessMessage('Đăng nhập thất bại, kiểm tra lại thông tin đăng nhập!');
                      setIsModalOpen(true);
                      setIsCheck(false);
                  } 
              })
              .catch(() => {
                  console.error('Đăng nhập thất bại');
              });
      }
    }
    const [isModalOpen, setIsModalOpen] = useState(false); // Thêm trạng thái modal
    const [successMessage, setSuccessMessage] = useState('');
    const [check, setIsCheck] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };
  return (
    <div className="min-h-full w-full">
      <div className="w-[570px] h-[625px]  m-auto mt-16  border-slate-600 med-border ">
        <img src={logo1} className="w-[428px] h-[220px] m-auto" alt="img" />
        <div className="group bg-[#efeeee] w-[420px]  m-auto mb-8 h-[50px]  px-4 py-1  transition-all sm-border">
          <input
            className="bg-transparent w-full h-full text-xl outline-none"
            type="text"
            name="value"
            placeholder="Name, email, or phone"
            value={formData.value}
            onChange={(e) => {
                handleInputValueChange(e.target.value);
                handleInputChange(e);
            }}
          />
          {formError.value && <div className="error-messag text-red-600 mt-2">{formError.value}</div>}
        </div>

        <div className="group bg-[#efeeee] w-[420px]  m-auto mb-8 h-[50px]  px-4 py-1  transition-all sm-border">
          <input
            className="bg-transparent w-full h-full text-xl outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formError.password && <div className="error-messag text-red-600 mt-2">{formError.password}</div>}
        </div>

        <button 
          className="bg-dark-blue border-dark-blue transition sm-border text-white text-2xl w-[420px] m-auto  h-14 mt-7 ml-20 hover:bg-white hover:text-dark-blue"
          onClick={handleLogin}
        >
          Login
        </button>
        <Link to={'/forget-password'}>
          <h3 className="text-xl ml-20 mt-10 opacity-80 cursor-pointer hover:opacity-100 ">
            Forgot password?
          </h3>
        </Link>
      </div>
      <div className="w-[570px] h-[100px]  m-auto mt-10 rounded-2xl border-slate-600 border-2 flex-all-center">
        <span className="text-xl mr-2">Don't have an account?</span>
        <Link to={'/register'}>
          <span className="text-xl font-semibold cursor-pointer">Sign up</span>
        </Link>
      </div>
      <CustomModal isOpen={isModalOpen} check= {check} message={successMessage} onClose={closeModal} />
    </div>
    
  );
}

export default Login;
