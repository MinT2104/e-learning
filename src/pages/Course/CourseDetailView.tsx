
import CourseMaterial from '@/components/application/Course/CourseMaterial';
import CourseMember from '@/components/application/Course/CourseMember';
import CourseStudy from '@/components/application/Course/CourseStudy';
import Heading from '@/components/common/Heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CourseContent = () => {

    const { authUser } = useSelector((state: RootState) => state.auth);
    const { group, isLoading } = useSelector((state: RootState) => state.group);

    const { id } = useParams()
    const dispatch = useDispatch()

    const [activeKey, setActiveKey] = useState('course')

    const handleGetGroupDetail = async () => {
        await dispatch(globalThis.$action.getGroup(id))
    }

    useEffect(() => {
        handleGetGroupDetail()
    }, [])

    return (
        <div className="flex flex-col mt-2 mx-auto p-2 h-fit gap-10">
            {isLoading ?
                <div className='h-10 w-2/3 bg-slate-200' />
                :
                <Heading title={`${group.courseData.courseId} - ${group.courseData.title} - ${group.title}`} />
            }
            <div className='flex gap-4'>
                <Button onClick={() => setActiveKey('course')} variant={activeKey === 'course' ? 'default' : 'outline'} className={cn('w-40 h-[48px]',)}>Bài giảng</Button>
                <Button onClick={() => setActiveKey('material')} variant={activeKey === 'material' ? 'default' : 'outline'} className={cn('w-40 h-[48px]',)}>Tài liệu</Button>
                <Button onClick={() => setActiveKey('member')} variant={activeKey === 'member' ? 'default' : 'outline'} className={cn('w-40 h-[48px]', authUser.role === 'teacher')}>Thành viên</Button>
                <Button onClick={() => setActiveKey('notification')} variant={activeKey === 'notification' ? 'default' : 'outline'} className={cn('w-40 h-[48px]', authUser.role === 'student')}>Thông báo</Button>
            </div>

            <div className={cn('w-full',
                activeKey !== 'course' && 'hidden'
            )}>
                <CourseStudy group={group || []} />
            </div>
            <div className={cn('w-full',
                activeKey !== 'material' && 'hidden'
            )}>
                <CourseMaterial />
            </div>

            <div className={cn('w-full',
                activeKey !== 'member' && 'hidden'
            )}>
                <CourseMember />
            </div>

        </div>
    );
};

export default CourseContent;
