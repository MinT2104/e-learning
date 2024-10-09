// CourseView.tsx
import React from 'react';
import CourseCard from './CourseCard';

const mockData = [
    {
        title: "HTML, CSS Pro",
        subtitle: "Cho người mới bắt đầu",
        oldPrice: "2.500.000đ",
        newPrice: "1.299.000đ",
        instructor: "Sơn Đặng",
        views: "590",
        duration: "116h44p",
        gradient: "from-blue-500 to-purple-500",
    },
    {
        title: "Ngôn ngữ Sass",
        subtitle: "Cho Frontend Developer",
        oldPrice: "400.000đ",
        newPrice: "299.000đ",
        instructor: "Sơn Đặng",
        views: "27",
        duration: "6h18p",
        gradient: "from-pink-500 to-pink-400",
    },
    {
        title: "JavaScript Pro",
        subtitle: "Cho người mới bắt đầu",
        oldPrice: "3.299.000đ",
        newPrice: "1.399.000đ",
        instructor: "Sơn Đặng",
        views: "121",
        duration: "21h14p",
        gradient: "from-yellow-500 to-orange-500",
    },
];

const CourseView: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">
                Khóa học Pro
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockData.map((course, index) => (
                    <CourseCard
                        key={index}
                        title={course.title}
                        subtitle={course.subtitle}
                        oldPrice={course.oldPrice}
                        newPrice={course.newPrice}
                        instructor={course.instructor}
                        views={course.views}
                        duration={course.duration}
                        gradient={course.gradient}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseView;
