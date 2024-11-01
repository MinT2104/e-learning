import { ReactNode } from "react";
import LoginBg from '@/assets/images/login_bg.jpg';
import Banner from '@/assets/images/banner.svg';

const AuthLayout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div>
            <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 z-50 
                flex items-center justify-center space-x-2"
                style={{
                    backgroundImage: `url(${Banner})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}>
                <b>Are you a teacher?</b>
                <span>We just launched W3Schools Academy.</span>
                <a href="//w3schools.com/academy/teachers/index.php" target="_blank" className="text-yellow-300 underline hover:text-yellow-500">
                    Check it out here
                </a>
            </div>
            <section className="grid grid-cols-2 w-full h-fit">

                <div
                    style={{
                        backgroundImage: `url(${LoginBg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                    className="bg-sky-500/20 min-h-screen sticky top-0"
                />
                {children}
            </section></div>

    );
};

export default AuthLayout;
