import { useEffect, useState } from "react";
import bgImage from "../assets/login1.png";
import logo from "../assets/logofull.svg";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/auth.actions";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    console.log("Client ID:", CLIENT_ID);
    
    function handleGoogleResponse(response) {
        const token = response.credential;

        console.log("JWT Google:", token);
        navigate("/dashboard");
    }

    const [form, setForm] = useState({
        identifier: "",
        password: "",
    });

    const handleLogin = async () => {
        try {
            const result = await login(form);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const start = () => {
            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: handleGoogleResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById("googleSignInDiv"),
                {
                    theme: "outline",
                    size: "large",
                    width: 450,
                    shape: "pill",
                }
            );
        };

        if (window.google) {
            start();
        } else {
            const interval = setInterval(() => {
                if (window.google) {
                    start();
                    clearInterval(interval);
                }
            }, 100);
        }
    }, []);

    return (
        <div className="w-full min-h-screen flex bg-gray-100 relative">
            <img src={logo} alt="Logo" className="absolute top-4 left-4 w-42 md:w-52 z-20" />

            <div className="hidden md:block w-1/2 relative bg-black">
                <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-blue-600 opacity-30"></div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center px-10 lg:px-24">
                <div className="relative w-fit">
                    <Link to="/" className="flex items-center gap-2 mb-6 text-xl hover:scale-110 transition-transform duration-500">
                        <IoArrowBackCircleOutline />
                        Kembali
                    </Link>
                </div>
                <h1 className="text-4xl font-bold mb-2 text-center">Selamat Datang Kembali!</h1>
                <p className="text-gray-600 text-xl mb-8 text-center">Masuk untuk mengakses Dashboard Anda dan melanjutkan pemantauan.</p>
                <div className="flex flex-col gap-4">
                    <label className="ml-3 font-semibold">Email / Username</label>
                    <div className="relative shadow-md rounded-xl">
                        <FaUser size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                        <input type="email" placeholder="" value={form.identifier} onChange={(e) => setForm({ ...form, identifier: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <label className="ml-3 font-semibold">Password</label>
                    <div className="relative shadow-md rounded-xl">
                        <MdLockOutline size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                        <input type="password" placeholder="" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <button onClick={handleLogin} className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 text-center">Masuk</button>
                <div className="flex items-center my-6 gap-4">
                    <div className="border-t border-gray-300 w-full" />
                    <span className="text-sm text-gray-500">atau</span>
                    <div className="border-t border-gray-300 w-full" />
                </div>
                <div className="w-full flex justify-center" id="googleWrapper">
                    <div id="googleSignInDiv"></div>
                </div>
                <p className="text-center mt-6 text-gray-600">
                    Tidak memiliki akun? <Link to="/register" className="text-blue-custom font-bold hover:text-blue-700 hover:underline">Daftar Sekarang</Link>
                </p>
            </div>
            <script src="https://apis.google.com/js/platform.js" async defer></script>
        </div>
    );
}