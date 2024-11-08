import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserTie, faBars, faLayerGroup, faClipboardList,
    faGraduationCap
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function SideBar() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    const { authUser } = useSelector((state: RootState) => state.auth)

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const mockDataSidebar = [
        {
            id: 1,
            label: "Lớp học phần",
            icon: faLayerGroup,
            path: "/courses", // Add path for navigation
            allowRoles: ['admin', 'teacher', 'student']
        },
        {
            id: 2, // Changed from 5 to 4 for sequential ID
            label: "Quản lý lớp học phần",
            icon: faClipboardList,
            path: "/class-management", // Add path for navigation
            allowRoles: ['admin']
        },
        {
            id: 3, // Changed from 5 to 4 for sequential ID
            label: "Quản lý Giảng viên",
            icon: faUserTie,
            path: "/teacher-management", // Add path for navigation
            allowRoles: ['admin']
        },
        {
            id: 4, // Changed from 5 to 4 for sequential ID
            label: "Quản lý Sinh viên",
            icon: faGraduationCap,
            path: "/student-management", // Add path for navigation
            allowRoles: ['admin']
        },
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
                        <span className="text-primary font-bold">EL</span>earning
                    </h1>
                </div>

                <nav className="mt-6 mx-4">
                    <ul>
                        {authUser && mockDataSidebar.map((menuItem) => {
                            return menuItem.allowRoles.includes(authUser?.role) && (
                                <li
                                    key={menuItem.id}
                                    className={cn("flex items-center p-4 text-gray-700 rounded-lg mb-2 cursor-pointer hover:bg-slate-100",
                                        location.pathname.includes(menuItem.path) && 'bg-primary text-white hover:bg-primary'
                                    )}
                                    onClick={() => {
                                        navigate(menuItem.path); // Navigate on click
                                    }}
                                >
                                    <FontAwesomeIcon icon={menuItem.icon} className="mr-3" />
                                    <span>{menuItem.label}</span>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default SideBar;
