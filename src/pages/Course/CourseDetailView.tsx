import Heading from '@/components/common/Heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { FileVideo, Layers3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const CourseContent = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { course, isLoading } = useSelector((state: RootState) => state.course);
    const { authUser } = useSelector((state: RootState) => state.user);

    const subscribedCourse = useRef(false)

    const handleCall: any = async () => {
        await dispatch(globalThis.$action.getCourse(param.id));
    };

    useEffect(() => {
        handleCall();
    }, []);

    const [activeChapter, setActiveChapter] = useState<number | null>(0); // Mặc định chọn chương 1

    const handleChapterClick = (index: number) => {
        setActiveChapter(index);
    };

    const handleVideoClick = (c: number, l: number) => {
        navigate(`/course/${param.id}/watch?c=${c}&l=${l}`)
    }

    useEffect(() => {
        if (!authUser) return
        if (!course) return

        const isSubcribed = authUser.courseIds.includes(course._id)

        subscribedCourse.current = isSubcribed

    }, [authUser, course])

    return (
        <div className="flex flex-col mt-2 mx-auto p-2 h-fit">
            {isLoading ? <div className='w-2/3 h-10 bg-slate-200 animate-pulse rounded-sm mb-10' /> : <Heading title={`Khóa học: ${course?.title}`} className='' />}
            <div className='flex gap-2'>
                {
                    isLoading ? <div className='w-2/3 h-[500px] bg-slate-200 animate-pulse rounded-sm' /> :
                        course && course.chapters && course.chapters?.length > 0 ?
                            (
                                <div className='w-2/3 flex border border-primary/20 rounded-sm truncate'>
                                    <div className="w-[100px]  truncate h-full" >
                                        <ul className="overflow-hidden block h-full">
                                            {course.chapters && course.chapters.map((chapter, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleChapterClick(index)}
                                                    className={`px-4 py-4 cursor-pointer border-l-[4px] h-[85px] flex justify-center items-center
                                ${activeChapter === index ? 'bg-white text-gray-900 border-primary' : 'bg-blue-50/80 text-black border-transparent'
                                                        }`}
                                                >
                                                    <span>{chapter.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex-1 bg-white">
                                        {activeChapter !== null && (
                                            <div className=''>
                                                <div className='h-[85px] flex flex-col justify-center px-4 border-b border-gray-200/80'>
                                                    <h2 className="text-lg font-semibold ">{course?.chapters && course?.chapters[activeChapter]?.title}</h2>
                                                    <p className="text-gray-500 ">{course.chapters && course.chapters[activeChapter]?.lessons && course?.chapters[activeChapter]?.lessons.length} bài lập trình</p>
                                                </div>
                                                <ul>
                                                    {course.chapters && course.chapters[activeChapter]?.lessons && course.chapters[activeChapter]?.lessons?.map((lesson, idx) => (
                                                        <li key={idx} className={cn(`h-[85px] flex flex-row items-center gap-4 px-8 border-b border-gray-200/80
                                        cursor-pointer hover:text-primary
                                        `,
                                                            idx === (course.chapters && course.chapters[activeChapter]?.lessons && course.chapters[activeChapter]?.lessons.length - 1) ? 'border-b-0' : '',

                                                        )}>
                                                            <FileVideo className='text-slate-500/80' />
                                                            <span className='flex flex-col'>

                                                                <span
                                                                    onClick={() => handleVideoClick(activeChapter, idx)}
                                                                >{lesson.title}</span>
                                                                <span className="text-gray-500">{lesson.duration}</span>
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className='w-2/3 h-[500px] flex border border-primary/20 rounded-sm truncate justify-center items-center text-slate-500 flex-col gap-4'>
                                    <Layers3 size={45} />
                                    <span className='font-medium text-lg'>Chưa có danh sách bài học</span>
                                </div>
                            )
                }

                {
                    isLoading ? <div className='w-1/3 h-[350px] bg-slate-200 animate-pulse rounded-sm' /> :
                        <div className='w-1/3 pl-4'>
                            <div className="bg-blue-50 text-black border border-primary/20 rounded-sm p-6">
                                <h2 className="text-lg font-semibold mb-4">Khoá học này bao gồm:</h2>
                                <ul className="mb-6">
                                    <li className="flex items-center mb-2">
                                        <i className="fas fa-clock mr-2"></i>
                                        <span>20 giờ học</span>
                                    </li>
                                    <li className="flex items-center mb-2">
                                        <i className="fas fa-code mr-2"></i>
                                        <span>59 bài lập trình</span>
                                    </li>
                                    <li className="flex items-center mb-2">
                                        <i className="fas fa-infinity mr-2"></i>
                                        <span>Truy cập trọn đời</span>
                                    </li>
                                    <li className="flex items-center mb-2">
                                        <i className="fas fa-trophy mr-2"></i>
                                        <span>Chứng chỉ khi hoàn thành 80% khoá học</span>
                                    </li>
                                </ul>

                                {
                                    subscribedCourse.current
                                        ?
                                        (
                                            <Button className=" text-white font-semibold py-2 px-4 rounded-lg">
                                                Tiếp tục học
                                            </Button>
                                        )
                                        :
                                        (
                                            <Button className=" text-white font-semibold py-2 px-4 rounded-lg">
                                                Đăng ký miễn phí
                                            </Button>
                                        )
                                }
                            </div>
                        </div>
                }

            </div>
        </div>
    );
};

export default CourseContent;
