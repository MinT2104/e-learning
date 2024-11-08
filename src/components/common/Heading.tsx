import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type HeadingProps = {
    title?: string;
    className?: string;
    rightIcon?: ReactNode
};

const Heading = ({ title, className, rightIcon }: HeadingProps) => {
    // Retrieve authUser from Redux store
    const { authUser } = useSelector((state: RootState) => state.auth);

    const [currentPath, setCurrentPath] = useState<string | undefined>("");

    const mockDataHeading = [
        { id: 1, name: `Chào mừng quay trở lại, ${authUser?.userName || ''}!👋`, path: "/" },
        { id: 3, name: "Bài tập của bạn", path: "/tasks" },
        { id: 4, name: "Instructors", path: "/instructors" },
        { id: 5, name: "Trang cá nhân", path: "/profile" },
        { id: 6, name: "Activity", path: "/activity" },
        { id: 7, name: "Nội dung khóa học", path: "/coursedetail" },
    ];

    useEffect(() => {
        const currentPath = location.pathname;
        const currentHeading = mockDataHeading.find(item => item.path === currentPath);
        setCurrentPath(currentHeading?.name);
    }, [location.pathname, authUser]);

    if (!authUser) {
        return null;
    }

    return (
        <div className={cn('text-[30px] font-bold justify-between flex items-center', className)}>
            <span>
                {currentPath || title}

            </span>
            {rightIcon}
        </div>
    );
};

export default Heading;
