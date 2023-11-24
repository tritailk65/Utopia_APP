import logo1 from '../../assets/image/logo/logo1.png';
import khoa from '../../assets/image/khoa.png'
import './ForgetPassword.css';
import useInput from '../../hooks/useInput';
import { Link } from 'react-router-dom';
import { userForgetPassword } from '../../services/user-service';
import AlertDialog from '../../components/Dialog/AlertDialog/AlertDialog';
import  {  useState } from 'react';
function ForgetPassword() {
    const { formData, formError, handleInputChange,setFormError } = useInput({
        email: '',
    });
    const [check, setIsCheck] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Thêm trạng thái modal
    const [successMessage, setSuccessMessage] = useState('');

    const closeModal = () => {
            setIsModalOpen(false);
    
    };


    const handleClickButton = () =>{
        const error: { [key: string]: string } = {};
        if (!formData.email) {
            error.email = 'Input email!';
        }
        setFormError(error);
        if (Object.keys(error).length === 0) {
            const forgetData = {
                email: formData.email
            };
            userForgetPassword(forgetData)
                .then((response) => {
                    if (response.Status === 200) {
                        setSuccessMessage('Chúng tôi đã gửi qua gmail của bạn, mời bạn check thư gmail !');
                        setIsModalOpen(true);
                        setIsCheck(true);
                    } else if (response.Status === 404) {
                        setSuccessMessage('Kiểm tra lại gmail của bạn!');
                        setIsModalOpen(true);
                        setIsCheck(false);
                    }
                })
                .catch(() => {
                    console.error('Kiểm tra lại gmail');
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
                  <h1 className="text-2xl flex items-center justify-center">Trouble logging in?</h1>
                </div>
                <div>
                  <p className="ml-[100px] mt-5 mb-10 w-[400px]">Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                </div>
                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-8 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="email"
                        placeholder="Input your email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {formError.email && <div className="error-messag text-red-600 mt-2">{formError.email}</div>}
                </div>

                <button 
                className="bg-dark-blue border-dark-blue transition sm-border text-white text-2xl w-[410px] m-auto  h-14 mt-7 ml-20 hover:bg-white hover:text-dark-blue"
                onClick={handleClickButton}
                >
                    Send Login Link
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

export default ForgetPassword;
