import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm useNavigate

function CourseVideo() {
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Khai báo useNavigate
    const regex = /c=(\d+)&l=(\d+)/;

    const [activeURL, setActiveURL] = useState('');

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
            setActiveURL(lessons ? lessons[index[1]].url : '');
        }
    }, [course]);

    useEffect(() => {
        handleCall();
    }, []);

    const handleLessonClick = (chapterIndex: number, lessonIndex: number, url: string) => {
        setActiveURL(url);
        navigate(`?c=${chapterIndex}&l=${lessonIndex}`);
    };
    return (
        <div className='w-full h-fit grid grid-cols-3 gap-4'>
            <div className='col-span-2 aspect-video rounded-xl truncate'>
                <iframe
                    className='h-full w-full'
                    height="100%"
                    width="100%"
                    src={activeURL}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
            <div className='col-span-1 rounded-xl border-[2px] border-t-0 border-gray-100/80 border-spacing-1'>
                <h2 className="text-lg font-bold mb-4">Next Lessons</h2>
                <ul className="max-h-[80vh] overflow-y-scroll p-2 scrollbar">
                    {course?.chapters?.map((chapter, chapterIndex) => (
                        <li key={chapter._id} className={`mb-4 p-0`}>
                            <h3 className={`text-md font-semibold p-4`}>
                                {`${chapter.title}`}
                            </h3>
                            <ul>
                                {chapter.lessons?.map((lesson, lessonIndex) => (
                                    <li
                                        key={lesson._id}
                                        onClick={() => handleLessonClick(chapterIndex, lessonIndex, lesson.url)} // Cập nhật sự kiện click
                                        className={`cursor-pointer p-4 border-b hover:text-primary 
                                        ${lesson.url === activeURL ? 'bg-gray-200 text-black rounded-none' : ''}`}
                                    >
                                        {`${chapterIndex + 1}.${lessonIndex + 1}. ${lesson.title}`}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CourseVideo;
