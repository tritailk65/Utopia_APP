import logo1 from '../../assets/image/logo/logo1.png';
import '../Login/Login.css';
import useInput from '../../hooks/useInput';
import { Link } from 'react-router-dom';

function Register() {
    const { formData, handleInputChange } = useInput({
        phone: '',
        fullname: '',
        username: '',
        password: '',
    });

    return (
        <div className="min-h-full w-full">
            <div className="w-[570px] h-[645px]  m-auto mt-14  border-slate-600 med-border ">
                <img src={logo1} className="w-[428px] h-[220px] m-auto" alt="img" />
                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-6 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="phone"
                        placeholder="Phone number, username or email"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-6 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="fullname"
                        placeholder="Full name"
                        value={formData.fullname}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-6 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="group bg-[#efeeee] w-[420px]  m-auto mb-6 h-[50px]  px-4 py-1  transition-all sm-border">
                    <input
                        className="bg-transparent w-full h-full text-xl outline-none"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="bg-dark-blue border-dark-blue transition sm-border text-white text-2xl w-[420px] m-auto  h-14 mt-5 hover:bg-white hover:text-dark-blue">
                    Sign up
                </button>
            </div>
            <div className="w-[570px] h-[100px]  m-auto mt-10 rounded-2xl border-slate-600 border-2 flex-all-center">
                <span className="text-xl mr-2">Have an account?</span>
                <Link to={'/login'}>
                    <span className="text-xl font-semibold cursor-pointer">Log in</span>
                </Link>
            </div>
        </div>
    );
}

export default Register;
