import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import logo from "../../assets/sidebarlogo.png";
import { useAuth } from "../../contexts/AuthContext";

export default function Sidebar() {
    const { logout } = useAuth();
    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
        { name: "Monitoring", path: "/monitoring", icon: <FaCamera /> },
        { name: "Settings", path: "/settings", icon: <FaGear /> },
    ];

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login"); 
    };

    return (
        <div className="sticky top-0 flex h-screen w-64 flex-col bg-blue-custom text-white">
            <div className="flex h-20 items-center justify-start px-4 text-2xl font-bold">
                <img src={logo} alt="DECOMMOIR" className="h-auto max-h-16" />
            </div>

            <nav className="flex-1 px-4 py-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `
                mb-2 flex items-center rounded-lg px-4 py-3 transition-all
                ${isActive
                                ? "bg-[#D9D9D9] bg-opacity-30 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                            }
              `
                        }
                    >
                        <span className="mr-3 text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="px-4 py-4">
                <button className="flex items-center rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-700 w-full">
                    <span className="mr-3 text-xl">
                        <CiLogout />
                    </span>
                    <button onClick={handleLogout} className="font-medium">Log Out</button>
                </button>
            </div>
        </div>
    );
}
