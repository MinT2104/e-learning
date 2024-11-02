import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CourseType } from '@/redux/StoreType';
import CourseCard from '../Course/CourseCard';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import CustomDropDown from '@/components/common/CustomDropDown';
import { Plus } from 'lucide-react';
import Heading from '@/components/common/Heading';
import { Button } from '@/components/ui/button';

const MyCourseView = () => {
    const { authUser } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch();

    const [search, setSearch] = useState<string>('')

    const [coursess, setCoursess] = useState<CourseType[]>([])

    const handleGetData: any = async () => {

        const body = {
            page: 1,
            limit: 20,
            query: {
                _id: { $in: authUser ? authUser.courseIds : [] }
            }
        }

        if (authUser && authUser.courseIds.length < 1) return

        const res = await dispatch(globalThis.$action.loadUserCourses(body));
        if (res.payload.records.rows) {
            setCoursess(res.payload.records.rows)
        }
    };

    useEffect(() => {
        if (!authUser) return
        handleGetData();
    }, [authUser]);


    const { isLoading } = useSelector((state: RootState) => state.course);

    // if (isLoading) {
    //     return (
    //         <div className="flex flex-col container mx-auto pb-8 h-fit">
    //             <div className="grid grid-cols-1mb-16 md:grid-cols-3 gap-6">
    //                 {coursess && coursess.length > 0 ? (
    //                     coursess.map((_, index) => (
    //                         <div key={index} className="flex flex-col space-y-3">
    //                             <Skeleton className="h-[176px] w-full rounded-lg animate-pulse" />
    //                             <div className="space-y-2">
    //                                 <Skeleton className="h-4 w-[250px]" />
    //                                 <div className='flex
    //                                 justify-between items-center'>
    //                                     <Skeleton className="h-4 w-[100px] animate-pulse" />
    //                                     <Skeleton className="h-4 w-[100px] animate-pulse" />
    //                                     <Skeleton className="h-4 w-[100px] animate-pulse" />

    //                                 </div>
    //                             </div>
    //                         </div>
    //                     ))
    //                 ) :
    //                     Array(6).fill(0).map((_, index) => ((<div key={index} className="flex flex-col space-y-3">
    //                         <Skeleton className="h-[176px] w-full rounded-lg animate-pulse" />
    //                         <div className="space-y-2">
    //                             <Skeleton className="h-4 w-[250px]" />
    //                             <div className='flex
    //                                 justify-between items-center'>
    //                                 <Skeleton className="h-4 w-[100px] animate-pulse" />
    //                                 <Skeleton className="h-4 w-[100px] animate-pulse" />
    //                                 <Skeleton className="h-4 w-[100px] animate-pulse" />

    //                             </div>
    //                         </div>
    //                     </div>)))
    //                 }
    //             </div>
    //         </div>
    //     );
    // } else return (
    //     <div className="container mx-auto pb-8 h-fit">
    //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //             {coursess.map((course: CourseType) => (
    //                 <CourseCard {...course} key={course._id} />
    //             ))}
    //         </div>
    //     </div>
    // );

    const mockCategories = [
        {
            label: 'Mới nhất',
            key: "newest"
        },
        {
            label: 'Cũ hơn',
            key: "oldest"
        },
    ]



    return (
        <div className='mx-auto pb-8 h-fit w-full flex flex-col gap-4'>
            <Heading title='Lớp học phần' rightIcon={
                <Button>
                    <Plus />
                    <span>Thêm nhóm mới</span>
                </Button>
            } />
            <div className="relative truncate mb-6 w-2/3">
                <div className='flex h-[48px] w-full'>
                    <CustomDropDown isHiddenSearch isNotUseAuthInputClass className='w-fit bg-primary text-white h-full min-w-40 rounded-tr-none rounded-br-none border-r-[0px] shadow-none hover:bg-primary border-primary' dropDownList={mockCategories} placeholder="All" />
                    <div className="flex-1 border border-border border-l-0 rounded-tl-none rounded-bl-none rounded-lg truncate flex">
                        <Input
                            id="youtube"
                            name="youtube"
                            type="text"
                            disabled={isLoading}
                            autoComplete="youtube"
                            defaultValue={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={cn('border-none rounded-none')}
                            placeholder="Tìm kiếm lớp học phần"
                        />
                        {/* 
                        <div className='border-l border-slate-200 aspect-square h-[56px] flex items-center justify-center text-slate-500'>
                            <Search />
                        </div> */}
                    </div>

                </div>
            </div>
            {
                authUser.role === 'teacher' ? (
                    <div className='flex flex-col gap-4'>
                        <span className='font-bold text-lg'>
                            21AB4B4 - Lịch Sử Đảng
                        </span>
                        <div className="container mx-auto pb-8 h-fit">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {coursess.map((course: CourseType) => (
                                    <CourseCard {...course} key={course._id} />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null
            }

            {
                authUser.role === 'student' ? (
                    <div className="container mx-auto pb-8 h-fit">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {coursess.map((course: CourseType) => (
                                <CourseCard {...course} key={course._id} />
                            ))}
                        </div>
                    </div>
                ) : null
            }

        </div >
    )
};

export default MyCourseView;
