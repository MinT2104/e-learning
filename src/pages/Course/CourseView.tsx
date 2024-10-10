// CourseView.tsx
import React from 'react';
import CourseCard from './CourseCard';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card';

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
        <div className="container mx-auto pb-8 h-fit">


            <Carousel className='mb-20'>
                <CarouselContent className='w-full'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex h-60 items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>


            <h1 className="text-[24px] font-bold mb-6">Các khóa học nổi bật</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
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


            <h1 className="text-[24px] font-bold mb-6">Khóa học miễn phí</h1>
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
