import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook, faTasks, faUserTie, faBars
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { cn } from '@/lib/utils';

function SideBar() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const mockDataSidebar = [
        // {
        //     id: 1,
        //     label: "Dashboard",
        //     icon: faTachometerAlt,
        //     path: "/", // Add path for navigation
        // },
        {
            id: 2,
            label: "Trang chủ",
            icon: faBook,
            path: "/", // Add path for navigation
        },
        {
            id: 3,
            label: "Bài tập của bạn",
            icon: faTasks,
            path: "/tasks", // Add path for navigation
        },
        {
            id: 4, // Changed from 5 to 4 for sequential ID
            label: "Người hướng dẫn",
            icon: faUserTie,
            path: "/instructors", // Add path for navigation
        },
        // {
        //     id: 5, // Changed from 6 to 5 for sequential ID
        //     label: "Profile",
        //     icon: faUser,
        //     path: "/profile", // Add path for navigation
        // },
        // {
        //     id: 6, // Changed from 7 to 6 for sequential ID
        //     label: "Activity",
        //     icon: faChartBar,
        //     path: "/activity", // Add path for navigation
        // }
    ];

    return (
        <div className="flex h-screen fixed top-0 left-0 border-r border-slate-500/10 z-[999]">
            <div className="md:hidden p-4">
                <Button
                    className="text-gray-800 focus:outline-none"
                    onClick={toggleSidebar}
                >
                    <FontAwesomeIcon icon={faBars} size="2x" />
                </Button>
            </div>

            {/* Sidebar */}
            <div className={`transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64 h-full bg-white shadow-md`}>
                <div className="p-6">
                    <h1 className="flex justify-items-center text-2xl font-bold text-gray-800">
                        <span className="text-primary">e</span>-Learning
                    </h1>
                </div>

                <nav className="mt-6 mx-4">
                    <ul>
                        {mockDataSidebar.map((menuItem) => (
                            <li
                                key={menuItem.id}
                                className={cn("flex items-center p-4 text-gray-700 rounded-lg mb-2 cursor-pointer hover:bg-slate-100",
                                    menuItem.path === location.pathname && 'bg-primary text-white hover:bg-primary'
                                )}
                                onClick={() => {
                                    console.log(`Navigating to: ${menuItem.path}`); // Log the navigation path
                                    navigate(menuItem.path); // Navigate on click
                                }}
                            >
                                <FontAwesomeIcon icon={menuItem.icon} className="mr-3" />
                                <span>{menuItem.label}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default SideBar;
