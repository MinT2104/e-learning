import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CourseCard from '../Course/CourseCard';
import { useEffect, useState } from 'react';
import Heading from '@/components/common/Heading';
import { GroupType } from '@/redux/StoreType';
import GroupService from '@/services/group.service';
import { Navigate } from 'react-router-dom';

const MyCourseView = () => {
    const groupService = new GroupService('group')
    const { authUser } = useSelector((state: RootState) => state.auth)
    const [query] = useState({
        page: 1, limit: 100, query: {}
    })
    const [groups, setGroups] = useState<GroupType[]>([])
    const [coursess, setCoursess] = useState<GroupType[][]>([])

    const handleLoadGroup = async () => {
        const loadQuery = {
            page: 1,
            limit: 100,
            query: {
                ...query.query,
                'teacherData.userId': authUser?._id
            }
        }
        const res: any = await groupService.loadAllWithPaging(loadQuery)
        if (res?.records) {
            const group: GroupType[] = res?.records?.rows
            setGroups(group)
        }
    }

    const handleLoadGroupStudent = async () => {
        const loadQuery = {
            page: 1,
            limit: 100,
            query: {
                _id: {
                    $in: authUser.courseIds
                }
            }
        }
        const res: any = await groupService.loadAllWithPaging(loadQuery)
        if (res?.records) {
            const group: GroupType[] = res?.records?.rows
            setGroups(group)
        }
    }

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


    if (authUser?.role === 'admin') {
        return <Navigate to="/class-management" />
    }

    return (
        <div className='mx-auto pb-8 h-fit w-full flex flex-col gap-4'>
            <Heading title='Lớp học phần' />
            {/* <div className="relative truncate mb-6 w-2/3">
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
            </div> */}
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
