import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CourseCard from '../Course/CourseCard';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import CustomDropDown from '@/components/common/CustomDropDown';
import { Plus } from 'lucide-react';
import Heading from '@/components/common/Heading';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { GroupType } from '@/redux/StoreType';

const MyCourseView = () => {
    const { authUser } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch();

    const [search, setSearch] = useState<string>('')

    const [coursess, setCoursess] = useState<GroupType[][]>([])
    const [loadingState] = useState<boolean>(false);


    const handleLoadGroup = async () => {
        const query = {
            page: 1,
            limit: 100,
            query: {
                'teacherData.userId': authUser?._id
            }
        }
        await dispatch(globalThis.$action.loadGroups(query))
    }

    const handleLoadGroupStudent = async () => {
        const query = {
            page: 1,
            limit: 100,
            query: {
                _id: {
                    $in: authUser.courseIds
                }
            }
        }
        await dispatch(globalThis.$action.loadGroups(query))
    }

    const { groups } = useSelector((state: RootState) => state.group)

    const handleSplit = () => {
        const groupedByCourseId: any = [];
        const uniqueCourseIds = [...new Set(groups.map(item => item.courseData.courseId))]; // Lấy các courseId duy nhất

        uniqueCourseIds.forEach(courseId => {
            const group = groups.filter(item => item.courseData?.courseId === courseId);
            groupedByCourseId.push(group);
        });
        setCoursess(groupedByCourseId)
        console.log(groupedByCourseId);
    }

    useEffect(() => {
        if (authUser.role === 'teacher') {
            handleLoadGroup()
        } else {
            if (!authUser.courseIds || authUser.courseIds.length === 0) {
                return
            }
            handleLoadGroupStudent()
        }
    }, [])
    useEffect(() => {
        if (groups.length > 0) {
            handleSplit()
        }
    }, [groups])


    // const { isLoading } = useSelector((state: RootState) => state.course);


    // else return (
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

    if (loadingState) {
        return (
            <div className="container mx-auto pb-8 h-fit">
                <div className="flex flex-col">
                    <div className='grid grid-cols-2 gap-2'>
                        <Skeleton className="h-[48px] w-[200px] rounded-lg animate-pulse" />
                        <Skeleton className="h-[48px] w-[160px] rounded-lg animate-pulse ml-auto" />
                    </div>
                    <div className='mt-4'>
                        <Skeleton className="h-[48px] w-[450px] rounded-lg animate-pulse" />
                        <Skeleton className="mt-10 h-8 w-[200px]" />

                        {Array.isArray(coursess) && coursess.length > 0 ? (
                            <div className="grid grid-cols-4 gap-6 mt-4">
                                {coursess.map((_, index) => (
                                    <div key={index} className="space-y-2">
                                        <Skeleton className="h-[215px] rounded-lg animate-pulse" />
                                        {/* <Skeleton className="h-[48px] w-[200px] rounded-lg animate-pulse" /> */}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-4 gap-6 mt-4">
                                {Array(8).fill(0).map((_, index) => (
                                    <div key={index} className="space-y-2">
                                        <Skeleton className="h-[215px] rounded-lg animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>
            </div>
        );
    } else return (
        <div className='mx-auto pb-8 h-fit w-full flex flex-col gap-4'>
            <Heading title='Lớp học phần' rightIcon={
                <Button
                    className=''
                >
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
                            disabled={loadingState}
                            autoComplete="youtube"
                            defaultValue={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={cn('border-none rounded-none')}
                            placeholder="Tìm kiếm lớp học phần"
                        />
                    </div>

                </div>
            </div>
            {
                authUser && authUser.role === 'teacher' ? (
                    coursess.map((groupItem: GroupType[]) => {
                        return (
                            < div className='flex flex-col gap-4'>
                                <span className='font-bold text-lg'>
                                    {groupItem[0].courseData.courseId}
                                    {' - '}
                                    {groupItem[0].courseData.title}
                                </span>
                                <div className="container mx-auto pb-8 h-fit">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        {groupItem.map((item: GroupType) => (
                                            <CourseCard {...item} key={item._id} />
                                        ))}
                                    </div>
                                </div>
                            </div>)

                    })

                ) : null
            }

            {
                authUser.role === 'student' ? (
                    <div className="container mx-auto pb-8 h-fit">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {groups.map((item: GroupType) => (
                                <CourseCard {...item} key={item._id} />
                            ))}
                        </div>
                    </div>
                ) : null
            }

        </div >
    )
};

export default MyCourseView;
