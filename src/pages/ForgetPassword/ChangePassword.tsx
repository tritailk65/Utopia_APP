import logo1 from '../../assets/image/logo/logo1.png';
import khoa from '../../assets/image/khoa.png'
import './ForgetPassword.css';
import useInput from '../../hooks/useInput';
import { Link,useNavigate } from 'react-router-dom';
import { userChangePassword } from '../../services/user-service';
import AlertDialog from '../../components/Dialog/AlertDialog/AlertDialog';
import  {  useState } from 'react';
import { useLocation  } from 'react-router-dom';

function ChangePassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const { formData, formError, handleInputChange,setFormError } = useInput({
        password: '',
        re_password:'',
        showError:'',
    });
    const [check, setIsCheck] = useState(false);
    const [checkSuccess, setIsSuccess] = useState(false); // check khi đổi mk thành công thì load lại trang
    const [isModalOpen, setIsModalOpen] = useState(false); // Thêm trạng thái modal
    const [successMessage, setSuccessMessage] = useState('');
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{8,15})/; // Kiểm tra password có ít nhất 1 chữ hoa, 1 kí tự đặt biệt và số, ít nhất 8 kí tự

    const closeModal = () => {
            setIsModalOpen(false);
            if(checkSuccess){
                navigate('/login');
            }
    };


    const handleClickButton = () =>{
        const error: { [key: string]: string } = {};
        if (!formData.password) {
            error.password = 'Enter password!';
        }else if(!passwordRegex.test(formData.password)){
            error.password = 'Password must have at least 1 uppercase letter, 1 special character, 1 number, and be at least 8 characters long!';
        }else if (!formData.re_password) {
            error.re_password = 'Re-enter password!';
        }else if(formData.password != formData.re_password){
            error.showError= 'Password and re-enter password is incorrect ';
        }
        setFormError(error);
        if (Object.keys(error).length === 0) {
            const dataChangePassword = {
                token: token,
                password: formData.re_password,
            };
            console.log(token);
            userChangePassword(dataChangePassword)
                .then((response) => {
                    if (response.Status === 200) {
                        setSuccessMessage('Thiết lập mật khẩu mới thành công !');
                        setIsModalOpen(true);
                        setIsCheck(true);
                        setIsSuccess(true); // chuyển hướng trang
                    } else if (response.Status === 400) {
                        const errorMessage: string = response.Message;
                        const startIndex: number = errorMessage.indexOf(":") + 2;
                        const extractedMessage: string = errorMessage.substring(startIndex).trim();
                        setSuccessMessage(extractedMessage);
                        setIsModalOpen(true);
                        setIsCheck(false);
                    }
                })
                .catch(() => {
                    console.error('Mời bạn nhập lại');
                });
        }
    }

    return (

        <div className="min-h-full w-full">
            <img src={logo1} className="w-[400px] h-[200px]" alt="img" />
            <div className="border-t border-gray-400 mt-0"></div>
            <div className="w-[570px] h-[660px]  m-auto mt-16  border-slate-600 med-border ">
                <img src={khoa} className="w-[100px] h-[100px] m-auto" alt="img" />
                <div>
                  <h1 className="text-2xl flex items-center justify-center">Change password</h1>
                </div>
                <div>
                  <p className="ml-[125px] mt-5 mb-10 w-[400px]">Enter the password and re-enter it correctly.</p>
                </div>
                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-8 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="password"
                        name="password"
                        placeholder="enter your newpassword"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    
                </div>
                {formError.password && (
                    <div className="error-messag text-red-600 text-[14px]">
                        <h2 className="ml-20 my-1.5">{formError.password}</h2>
                    </div>
                )}
                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-8 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="password"
                        name="re_password"
                        placeholder="Re-enter your newpassword"
                        value={formData.re_password}
                        onChange={handleInputChange}
                    />
                </div>
                {formError.re_password && (
                    <div className="error-messag text-red-600 text-[14px]">
                        <h2 className="ml-20"> {formError.re_password}</h2>
                    </div>
                )}
                {formError.showError && (
                    <div className="error-messag text-red-600 text-[14px]">
                        <h2 className="ml-20"> {formError.showError}</h2>
                    </div>
                )}
                <button 
                className="bg-dark-blue border-dark-blue transition sm-border text-white text-2xl w-[410px] m-auto  h-14 mt-7 ml-20 hover:bg-white hover:text-dark-blue"
                onClick={handleClickButton}
                >
                    Change password
                </button>
                
                <div className="flex items-center mt-20 ml-20">
                  <div className="w-40 border-t border-gray-900"></div>
                  <div className="mx-7 text-1xl">OR</div>
                  <div className="w-40 border-t border-gray-900"></div>
                </div>

                <Link to={'/register'} className="flex items-center justify-center mr-24">
                    <h3 className="text-xl ml-20 mt-10 opacity-80 cursor-pointer hover:opacity-100 ">Create New Account</h3>
                </Link>
                <div className="border-t border-gray-700 mt-4 bg-gray-300 h-16 rounded-b-xl">
                  <Link to='/login' className="flex items-center justify-center mr-24">
                  <h1 className='ml-20 mt-2 text-2xl opacity-80 cursor-pointer hover:opacity-100'>Back to login</h1>
                  </Link>
                </div>

            </div>
            <AlertDialog
                show={isModalOpen}
                result={check}
                message={successMessage}
                onClose={closeModal}
                title="Thông báo"
            />
            
        </div>
    );
}

export default ChangePassword;
