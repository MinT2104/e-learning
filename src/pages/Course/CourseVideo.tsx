import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import CourseVideoChapter from '@/components/application/Course/CourseVideoChapter';
import { Lesson } from '@/redux/StoreType';

function CourseVideo() {
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const regex = /c=(\d+)&l=(\d+)/;

    const initLesson = {
        duration: '',
        title: '',
        url: '',
        _id: ''
    }

    const [activeLesson, setActiveLeson] = useState<Lesson>(initLesson);
    const [activeIndex, setActiveIndex] = useState([0, 0])

    const { course, isLoading } = useSelector((state: RootState) => state.course);

    const handleGetIndex = (str: string) => {
        const result = str.match(regex);
        return result ? [+result[1], +result[2]] : null;
    };

    const handleCall: any = async () => {
        await dispatch(globalThis.$action.getCourse(param.id));
    };

    useEffect(() => {
        const index: number[] | null = handleGetIndex(location.search);
        if (index && course?.chapters) {
            const { lessons } = course.chapters[index[0]];
            setActiveLeson(lessons ? lessons[index[1]] : initLesson);
        }
    }, [course]);

    useEffect(() => {
        handleCall();
    }, []);

    const handleLessonClick = (chapterIndex: number, lessonIndex: number, lesson: any) => {
        setActiveLeson(lesson);
        navigate(`?c=${chapterIndex}&l=${lessonIndex}`);
        setActiveIndex([chapterIndex, lessonIndex])
    };

    return (
        <div className='w-full h-fit grid grid-cols-5 gap-4'>
            <div className='col-span-3'>
                <div className='aspect-video rounded-xl truncate bg-slate-200'>
                    <iframe
                        className='h-full w-full border-0'
                        height="100%"
                        width="100%"
                        src={activeLesson ? activeLesson?.url : ''}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className='py-4 flex flex-col gap-4'>
                    {/* <h1 className='font-medium text-xl'>
                        {activeLesson && activeLesson.title}
                    </h1> */}
                    {isLoading ? (
                        <div className='w-96 h-6 rounded-lg bg-slate-200 animate-pulse' />
                    ) : (
                        <h1 className='font-medium text-xl'>
                            {activeLesson && activeLesson.title}
                        </h1>
                    )}
                    <div className='flex gap-4'>
                        <div className='w-16 h-16 rounded-full bg-slate-200 animate-pulse' />
                        {
                            !isLoading && course && course.instructor ?
                                <div className='space-y-1'>
                                    <h1 className='font-medium'>{course?.instructor?.name}</h1>
                                    <Button className='h-8 px-2 py-1 text-[12px]'> Theo dõi</Button>
                                </div>
                                :
                                <div className='space-y-1'>
                                    <div className='w-40 h-6 rounded-lg bg-slate-200 animate-pulse' />
                                    <div className='w-20 h-8 rounded-lg bg-slate-200 animate-pulse' />
                                </div>
                        }

                    </div>
                </div>
            </div>
            <div className='col-span-2 rounded-xl border-[2px] border-gray-100/80 shadow-sm border-spacing-1'>
                <div className='w-full min-h-[60px] flex items-start p-4'>
                    {
                        !isLoading && course && course.instructor ?
                            <div className='space-y-1'>
                                <h2 className="text-md font-bold">{course?.title}</h2>
                                <span className="text-[12px] font-normal">{course?.instructor?.name} <span className='text-slate-500'> - bài {activeIndex[1] + 1} - phần {activeIndex[0] + 1}</span></span>
                                <div className="text-[12px] font-normal">Tổng số video: {course.totalVideos}</div>
                            </div>
                            :
                            <div className='space-y-1'>
                                <div className='w-40 h-4 rounded-lg bg-slate-200 animate-pulse' />
                                <div className='w-20 h-6 rounded-lg bg-slate-200 animate-pulse' />
                                <div className='w-24 h-4 rounded-lg bg-slate-200 animate-pulse' />
                            </div>
                    }
                </div>
                {/* <ul className="max-h-[80vh] overflow-y-scroll p-2 scrollbar">
                    {course?.chapters?.map((chapter, chapterIndex) => (
                        <li key={chapter._id} className={`mb-4 p-0  border w-full rounded border-slate-200 hover:border-primary overflow-hidden`}>
                            <CourseVideoChapter
                                chapter={chapter}
                                chapterIndex={chapterIndex}
                                handleLessonClick={handleLessonClick}
                                activeIndex={activeIndex}
                                isLoading={!isLoading} />
                        </li>
                    ))}
                </ul> */}
                <ul className="max-h-[80vh] overflow-y-scroll p-2 scrollbar">
                    {isLoading ? (
                        Array(4).fill(0).map((_, index) => (
                            <li key={index} className={`mb-4 p-0 border w-full rounded border-slate-200 overflow-hidden`}>
                                <div className="animate-pulse p-4">
                                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                                </div>
                            </li>
                        ))
                    ) : (
                        course?.chapters?.map((chapter, chapterIndex) => (
                            <li key={chapter._id} className={`mb-4 p-0 border w-full rounded border-slate-200 hover:border-primary overflow-hidden`}>
                                <CourseVideoChapter
                                    chapter={chapter}
                                    chapterIndex={chapterIndex}
                                    handleLessonClick={handleLessonClick}
                                    activeIndex={activeIndex}
                                // isLoading={isLoading}
                                />
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default CourseVideo;
