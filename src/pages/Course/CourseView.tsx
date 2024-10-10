// CourseView.tsx
import React from 'react';
import CourseCard from './CourseCard';

const courses = [
    {
        title: "Kiến Thức Nhập Môn IT",
        description: "Kiến thức nhập môn",
        price: "Miễn phí",
        participants: 130550,
        lessons: 9,
        duration: "3h12p",
        gradient: "from-red-500 to-purple-500",
        category: "Kiến Thức Nền Tảng",
    },
    {
        title: "Lập trình C++ cơ bản, nâng cao",
        description: "C++",
        price: "Miễn phí",
        participants: 29844,
        lessons: 55,
        duration: "10h18p",
        gradient: "from-teal-400 to-blue-500",
        category: "Từ cơ bản đến nâng cao",
    },
    {
        title: "HTML CSS từ Zero đến Hero",
        description: "từ zero đến hero",
        price: "Miễn phí",
        participants: 201285,
        lessons: 117,
        duration: "29h5p",
        gradient: "from-blue-500 to-indigo-500",
        category: "HTML, CSS",
    },

];

const CourseView: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Khóa học miễn phí</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        title={course.title}
                        description={course.description}
                        price={course.price}
                        participants={course.participants}
                        lessons={course.lessons}
                        duration={course.duration}
                        gradient={course.gradient}
                        category={course.category}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseView;
