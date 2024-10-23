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
import { Skeleton } from '@/components/ui/skeleton';

const CourseView = () => {
    const dispatch = useDispatch();
    const { courses, isLoading } = useSelector((state: RootState) => state.course);

    const handleGetData: any = async () => {
        dispatch(globalThis.$action.loadCourses({ page: 1, limit: 10 }));
    };

    useEffect(() => {
        handleGetData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col container mx-auto pb-8 h-fit">
                <div className='flex flex-col'>
                    <Skeleton className="h-[250px] w-[1150px] rounded-lg animate-pulse" />
                </div>
                <h1 className="text-[24px] font-bold mt-20 mb-6">Khóa học miễn phí</h1>
                <div className="grid grid-cols-1mb-16 md:grid-cols-3 gap-6">
                    {courses && courses.length > 0 ? (
                        courses.map((_, index) => (
                            <div key={index} className="flex flex-col space-y-3">
                                <Skeleton className="h-[176px] w-full rounded-lg animate-pulse" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <div className='flex
                                    justify-between items-center'>
                                        <Skeleton className="h-4 w-[100px] animate-pulse" />
                                        <Skeleton className="h-4 w-[100px] animate-pulse" />
                                        <Skeleton className="h-4 w-[100px] animate-pulse" />

                                    </div>
                                </div>
                            </div>
                        ))
                    ) :
                        Array(3).fill(0).map((_, index) => ((<div key={index} className="flex flex-col space-y-3">
                            <Skeleton className="h-[176px] w-full rounded-lg animate-pulse" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <div className='flex
                                    justify-between items-center'>
                                    <Skeleton className="h-4 w-[100px] animate-pulse" />
                                    <Skeleton className="h-4 w-[100px] animate-pulse" />
                                    <Skeleton className="h-4 w-[100px] animate-pulse" />

                                </div>
                            </div>
                        </div>)))
                    }
                </div>
            </div>
        );
    } else return (
        <div className="container mx-auto pb-8 h-fit">
            <Carousel className="mb-20">
                <CarouselContent className="w-full">
                    {courses.map((course) => (
                        <CarouselItem key={course._id}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex flex-col h-60 items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{course.title + 1}</span>
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
