import React, { useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CourseCard from './CourseCard';
import { CourseType } from '@/redux/StoreType';

const CourseView: React.FC = () => {
    const dispatch = useDispatch();
    const { courses, isLoading } = useSelector((state: RootState) => state.course);

    const handleGetData: any = async () => {
        const res = await dispatch(globalThis.$action.loadCourses({ page: 1, limit: 5 }));
        console.log(res);
    };

    useEffect(() => {
        handleGetData();
    }, []);

    if (isLoading) {
        return <div className='flex items-center justify-center mt-20'>...loading</div>;
    } else return (
        <div className="container mx-auto pb-8 h-fit">
            <h1 className="text-[24px] font-bold mb-6">Các khóa học nổi bật</h1>

            <Carousel className="mb-20">
                <CarouselContent className="w-full">
                    {courses.map((course) => (
                        <CarouselItem key={course._id}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex flex-col h-60 items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{course._id + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <h1 className="text-[24px] font-bold mb-6">Khóa học miễn phí</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course: CourseType) => (
                    <CourseCard {...course} key={course._id} />
                ))}
            </div>
        </div>
    );
};

export default CourseView;
