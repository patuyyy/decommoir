import { useEffect, useState } from "react";
import bgImage from "../assets/login1.png";
import logo from "../assets/logofull.svg";
import { FaUser } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getAllSchools } from "../actions/schools.actions";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function FillSchoolPage() {
    const { googleToken } = useAuth();
    const [schools, setSchools] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("Nama");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        school_id: "",
        google_id: "",
        password: null,
    });

    const filteredSchools = schools.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleSubmit() {
        console.log(form);
        //navigate("/login");
    }

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

    useEffect(() => {
        if (!googleToken) return;

        try {
            const decoded = jwtDecode(googleToken);

            const updated = {
                email: decoded?.email || "",
                username: decoded?.email?.split("@")[0] || "", 
                name: decoded?.name || "",
                google_id: decoded?.sub || "",
            };

            setForm(prev => ({
                ...prev,
                ...updated
            }));

            if (decoded?.name) setName(decoded.name);

        } catch (err) {
            console.error("Error decoding JWT:", err);
        }
    }, [googleToken]);



    return (
        <div className="w-full min-h-screen flex bg-gray-100 relative">
            <img src={logo} alt="Logo" className="absolute top-4 right-4 w-42 md:w-52 z-20" />

            <div className="w-full md:w-1/2 flex flex-col justify-center px-10 lg:px-24">
                <h1 className="text-4xl font-bold mb-2 text-start">Halo {name}!</h1>
                <p className="text-gray-600 text-xl mb-8 text-start">Masukkan detail sekolah mu untuk lanjut</p>
                <div className="flex flex-col gap-4">
                    <label className="ml-3 font-semibold">Sekolah</label>
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
                </div>
                <button onClick={handleSubmit} className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 text-center">Lanjut</button>
            </div>

            <div className="hidden md:block w-1/2 relative bg-black">
                <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-blue-600 opacity-30"></div>
            </div>
        </div>
    );
}