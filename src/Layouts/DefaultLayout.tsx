import Heading from '../components/common/Heading';
import Sidebar from '../components/common/SideBar';
import React from 'react';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen font-lato">
            <Sidebar />
            <div className="flex-grow">
                <header className="w-full h-20 bg-red-500 px-4 flex items-center">
                    <h1 className="text-white text-2xl">Header Section</h1>
                </header>
                <main className="p-4 max-w-[1200px] mx-auto">
                    <Heading />
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
