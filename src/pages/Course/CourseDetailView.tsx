import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { FileVideo } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const CourseContent = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { course } = useSelector((state: RootState) => state.course);

    const handleCall: any = async () => {
        const res = await dispatch(globalThis.$action.getCourse(param.id));
    };

    useEffect(() => {
        handleCall();
    }, []);

    const [activeChapter, setActiveChapter] = useState<number | null>(0); // Mặc định chọn chương 1

    // const courseData = {
    //     chapters: [
    //         {
    //             name: "Chương 1",
    //             title: "Chương 1: Chương trình đầu tiên và chú thích",
    //             lessons: [
    //                 { title: "Viết chương trình Hello World đầu tiên trong Python", duration: "20 phút" },
    //                 { title: "Bài tập Python cơ bản: câu lệnh print", duration: "10 phút" },
    //                 { title: "Bài tập Python cơ bản: tính tổng hai số", duration: "20 phút" },
    //                 { title: "Bài tập Python cơ bản: tính tổng, hiệu, tích, thương của hai số", duration: "15 phút" },
    //                 { title: "Bài tập Python cơ bản: tính diện tích hình chữ nhật", duration: "15 phút" },
    //                 { title: "Comment trong python", duration: "15 phút" }
    //             ]
    //         },
    //         {
    //             name: "Chương 2",
    //             title: "Chương 2: Kiểu dữ liệu và cấu trúc điều khiển",
    //             lessons: [
    //                 { title: "Kiểu dữ liệu trong Python", duration: "30 phút" },
    //                 { title: "Câu lệnh điều kiện: if-else", duration: "25 phút" },
    //                 { title: "Vòng lặp: for, while", duration: "20 phút" },
    //                 { title: "Bài tập: tính tổng dãy số", duration: "15 phút" }
    //             ]
    //         },
    //         {
    //             name: "Chương 3",
    //             title: "Chương 3: Hàm trong Python",
    //             lessons: [
    //                 { title: "Giới thiệu về hàm", duration: "15 phút" },
    //                 { title: "Định nghĩa và gọi hàm", duration: "20 phút" },
    //                 { title: "Truyền tham số vào hàm", duration: "15 phút" }
    //             ]
    //         },
    //         {
    //             name: "Chương 4",
    //             title: "Chương 4: Toán tử cơ bản",
    //             lessons: [
    //                 { title: "Giới thiệu về hàm", duration: "15 phút" },
    //                 { title: "Định nghĩa và gọi hàm", duration: "20 phút" },
    //                 { title: "Truyền tham số vào hàm", duration: "15 phút" }
    //             ]
    //         },
    //         {
    //             name: "Chương 6",
    //             title: "Chương 6: Câu lệnh lựa chọn",
    //             lessons: [
    //                 { title: "Giới thiệu về hàm", duration: "15 phút" },
    //                 { title: "Định nghĩa và gọi hàm", duration: "20 phút" },
    //                 { title: "Truyền tham số vào hàm", duration: "15 phút" }
    //             ]
    //         },
    //     ]
    // };

    const handleChapterClick = (index: number) => {
        setActiveChapter(index);
    };

    const handleVideoClick = (c: number, l: number) => {
        navigate(`/course/${param.id}/watch?c=${c}&l=${l}`)
    }

    return (
        <div className="flex flex-row mt-2 mx-auto p-2 h-fit ">
            <div className='w-2/3 flex border-[0.5px] border-slate-200 rounded-sm truncate'>
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
                                <h2 className="text-lg font-semibold ">{course.chapters && course.chapters[activeChapter].title}</h2>
                                <p className="text-gray-500 ">{course.chapters && course.chapters[activeChapter].lessons && course.chapters[activeChapter].lessons.length} bài lập trình</p>
                            </div>
                            <ul>
                                {course.chapters && course.chapters[activeChapter].lessons && course.chapters[activeChapter].lessons.map((lesson, idx) => (
                                    <li key={idx} className={cn(`h-[85px] flex flex-row items-center gap-4 px-8 border-b border-gray-200/80
                                        cursor-pointer hover:text-primary
                                        `,
                                        idx === (course.chapters && course.chapters[activeChapter].lessons && course.chapters[activeChapter].lessons.length - 1) ? 'border-b-0' : '',

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
            <div className='w-1/3 pl-4'>
                <div className="bg-blue-900 text-white border-none rounded-sm p-6">
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
                    <Button className=" text-white font-semibold py-2 px-4 rounded-lg">
                        Đăng ký miễn phí
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CourseContent;
