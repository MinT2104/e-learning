import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CourseType } from '@/redux/StoreType';
import { Skeleton } from '@/components/ui/skeleton';
import CourseCard from '../Course/CourseCard';

const MyCourseView = () => {

    const { userCourses, isLoading } = useSelector((state: RootState) => state.course);

    if (isLoading) {
        return (
            <div className="flex flex-col container mx-auto pb-8 h-fit">
                <div className="grid grid-cols-1mb-16 md:grid-cols-3 gap-6">
                    {userCourses && userCourses.length > 0 ? (
                        userCourses.map((_, index) => (
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
                        Array(6).fill(0).map((_, index) => ((<div key={index} className="flex flex-col space-y-3">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userCourses.map((course: CourseType) => (
                    <CourseCard {...course} key={course._id} />
                ))}
            </div>
        </div>
    );
};

export default MyCourseView;
