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
import EyeShow from "../icons/EyeShow"
import EyeNotShow from "../icons/EyeNotShow";

export default function LoginPage() {
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { login, checkGoogleUserContext, setGoogleAuthToken } = useAuth();
    const navigate = useNavigate();
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const [errors, setErrors] = useState({
        identifier: false,
        password: false,
    });


    function handleGoogleResponse(response) {
        const token = response.credential;
        setGoogleAuthToken(token);
        handleGoogleLogin(token);
    }

    const handleGoogleLogin = async (token) => {
        const isUser = await checkGoogleUserContext(token);
        if (isUser == null) {
            navigate("/fillschool");
        }
        else {
            navigate("/dashboard");
        }
    };

    const [form, setForm] = useState({
        identifier: "",
        password: "",
    });

    const handleLogin = async () => {
        setError("");
        const newErrors = {
            identifier: form.identifier.trim() === "",
            password: form.password.trim() === "",
        };
        setErrors(newErrors);
        if (newErrors.identifier || newErrors.password) {
            return;
        }

        try {
            const result = await login(form);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            if (error.response.status === 401) {
                setError("Email/Username atau password salah.");
            } else {
                setError("Terjadi kesalahan saat login. Silakan coba lagi.");
            }
        }
    };

    const handleKeyPressed = (event) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    };

    useEffect(() => {
        const start = () => {
            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: handleGoogleResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById("googleSignInDivMd"),
                {
                    theme: "outline",
                    size: "large",
                    width: "500",
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
                    width: 300,
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
            <img src={logo} alt="Logo" className="absolute hidden md:block top-4 left-4 w-42 md:w-52 z-20" />

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
                        <input
                            type="email"
                            onKeyDown={handleKeyPressed}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow-sm border 
                            ${errors.identifier ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"}`}
                            value={form.identifier}
                            onChange={(e) => {
                                setForm({ ...form, identifier: e.target.value });
                                setErrors({ ...errors, identifier: false });
                            }}
                        />

                    </div>
                    <label className="ml-3 font-semibold">Password</label>
                    <div className="relative shadow-md rounded-xl">
                        <MdLockOutline size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                        <input
                            type={showPassword ? "text" : "password"}
                            onKeyDown={handleKeyPressed}
                            className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white shadow-sm border 
                            ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"}`}
                            onChange={(e) => {
                                setForm({ ...form, password: e.target.value });
                                setErrors({ ...errors, password: false });
                            }}
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                        >
                            {showPassword ? (
                                <EyeShow />
                            ) : (
                                <EyeNotShow />
                            )}
                        </button>
                    </div>
                </div>
                <button onClick={handleLogin} className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 text-center">Masuk</button>
                {error && (
                    <p className="text-red-600 mt-3 text-center font-semibold">
                        {error}
                    </p>
                )}
                <div className="flex items-center my-6 gap-4">
                    <div className="border-t border-gray-300 w-full" />
                    <span className="text-sm text-gray-500">atau</span>
                    <div className="border-t border-gray-300 w-full" />
                </div>
                <div className="w-full hidden md:flex justify-center" id="googleWrapper">
                    <div id="googleSignInDivMd"></div>
                </div>
                <div className="w-full flex md:hidden justify-center" id="googleWrapper">
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