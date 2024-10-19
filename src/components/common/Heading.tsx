import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react'

type HeadingProps = {
    title?: string;
    className?: string
}

const Heading = ({ title, className }: HeadingProps) => {
    const [currentPath, setCurrentPath] = useState<string | undefined>("");

    const mockDataHeading = [
        // { id: 1, name: "Khóa học của bạn", path: "/" },
        // { id: 2, name: "Course", path: "/courses" },
        { id: 3, name: "Bài tập của bạn", path: "/tasks" },
        { id: 4, name: "Instructors", path: "/instructors" },
        { id: 5, name: "Trang cá nhân", path: "/profile" },
        { id: 6, name: "Activity", path: "/activity" },
        { id: 7, name: "Nội dung khóa học", path: "/coursedetail" },
        { id: 8, name: "Khóa học của tôi", path: "/my-course" },
    ]
    useEffect(() => {
        const currentPath = location.pathname
        const currentHeading = mockDataHeading.find(item => item.path === currentPath)
        setCurrentPath(currentHeading?.name)
    })

    return (currentPath || title) && (
        <div className={cn('text-[30px] font-bold mb-10', className)}>
            {currentPath ? currentPath : title}
        </div>
    )
}

export default Heading
