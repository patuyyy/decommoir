import { useEffect, useState } from "react";
import { getAllSchools } from "../actions/schools.actions";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../actions/auth.actions";
import logo from "../assets/logofull.svg";
import bgImage from "../assets/registertest.png";
import { CiMail } from "react-icons/ci";
import { FaSchool, FaUserEdit, FaUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import EyeShow from "../icons/EyeShow"
import EyeNotShow from "../icons/EyeNotShow";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const { googleToken, setGoogleAuthToken } = useAuth();
    const [schools, setSchools] = useState([]);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        school_id: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    function handleGoogleResponse(response) {
        const token = response.credential;
        console.log("JWT Google:", token);
        navigate("/fillschool");
    }

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

    const handleRegister = async () => {
        if (form.password !== confirmPassword) {
            alert("Password tidak sama!");
            return;
        }

        try {
            const result = await registerUser(form);
            console.log("Register success:", result);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const loadSchools = async () => {
            try {
                const data = await getAllSchools();
                setSchools(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        loadSchools();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="w-full min-h-screen flex bg-gray-100 relative">
            <img src={logo} alt="Logo" className="absolute top-4 right-4 w-42 md:w-52 z-20" />

            <div className="w-full md:w-1/2 flex flex-col justify-center px-10 pt-10 pb-10 lg:px-24">
                <div className="relative w-fit">
                    <Link to="/" className="flex items-center gap-2 mb-6 text-xl hover:scale-110 transition-transform duration-500">
                        <IoArrowBackCircleOutline />
                        Back
                    </Link>
                </div>
                <h1 className="text-5xl font-bold mb-2">Create an Account !</h1>
                <p className="text-gray-600 text-sm mb-8">Daftar untuk memulai pengelolaan Program MBG</p>
                <div className="flex flex-col gap-4">
                    <p className="ml-3 mb-1 font-semibold">Nama Lengkap</p>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                        <input type="text" placeholder="" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full pl-10 px-4 py-3 rounded-xl bg-white shadow-sm" />
                    </div>

                    <p className="ml-3 -mb-3 font-semibold">Username</p>
                    <div className="relative">
                        <FaUserEdit size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                        <input type="text" placeholder="" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full pl-10 px-4 py-3 rounded-xl bg-white shadow-sm" />
                    </div>

                    <p className="ml-3 -mb-3 font-semibold">Email</p>
                    <div className="relative">
                        <CiMail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                        <input type="email" placeholder="" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-10 px-4 py-3 rounded-xl bg-white shadow-sm" />
                    </div>

                    <p className="ml-3 -mb-3 font-semibold">Organisasi / Sekolah</p>
                    <div className="relative">
                        <FaSchool size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                        <input
                            type="text"
                            placeholder=""
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                            className="w-full pl-10 px-4 py-3 rounded-xl bg-white shadow-sm"
                        />
                        {isOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                {filteredSchools.length > 0 ? (
                                    filteredSchools.map((school) => (
                                        <div
                                            key={school.id}
                                            onClick={() => {
                                                setSearchTerm(school.name);
                                                setForm({ ...form, school_id: school.id });
                                                setIsOpen(false);
                                            }}
                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {school.name}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-gray-500">Tidak ada hasil</div>
                                )}
                            </div>
                        )}
                    </div>

                    <p className="ml-3 -mb-3 font-semibold">Password</p>
                    <div className="relative">
                        <MdLockOutline size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder=""
                            className="w-full pl-10 pr-10 px-4 py-3 rounded-xl bg-white shadow-sm"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <button
                            type="button"
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
                    <p className="ml-3 -mb-3 font-semibold">Konfirmasi Password</p>
                    <div className="relative">
                        <IoMdLock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder=""
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-10 px-4 py-3 rounded-xl bg-white shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                        >
                            {showConfirmPassword ? (
                                <EyeShow />
                            ) : (
                                <EyeNotShow />
                            )}
                        </button>
                    </div>
                </div>
                <button onClick={handleRegister} className="w-full mt-6 py-3 bg-blue-700 text-white rounded-xl font-semibold">Daftar</button>
                <div className="flex items-center my-6 gap-4">
                    <div className="border-t w-full" />
                    <span className="text-sm text-gray-500">atau</span>
                    <div className="border-t w-full" />
                </div>
                <div className="w-full flex justify-center" id="googleWrapper">
                    <div id="googleSignInDiv"></div>
                </div>
            </div>


            <div className="hidden md:block w-1/2 relative bg-black">
                <img src={bgImage} className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-blue-600 opacity-30"></div>
                <p className="absolute top-1/3 left-10 text-6xl font-bold text-white max-w-md z-10">
                    Bergabung dengan Program Berkelanjutan bersama Kami!
                </p>
            </div>
        </div>
    );
}