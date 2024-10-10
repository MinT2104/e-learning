import { useEffect, useState } from 'react'

const Heading = () => {
    const [currentPath, setCurrentPath] = useState<string | undefined>("");
    console.log(location.pathname)
    const mockDataHeading = [
        // { id: 1, name: "Khóa học của bạn", path: "/" },
        // { id: 2, name: "Course", path: "/courses" },
        { id: 3, name: "Tasks", path: "/tasks" },
        { id: 4, name: "Instructors", path: "/instructors" },
        { id: 5, name: "Profile", path: "/profile" },
        { id: 6, name: "Activity", path: "/activity" },
    ]
    useEffect(() => {
        const currentPath = location.pathname
        const currentHeading = mockDataHeading.find(item => item.path === currentPath)
        setCurrentPath(currentHeading?.name)
    })
    return currentPath && (
        <div className='text-[30px] font-bold'>
            {currentPath}
        </div>
    )
}

export default Heading
