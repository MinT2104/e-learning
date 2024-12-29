import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { FileVideo, Layers3, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AddFormChapter from "./AddFormChapter";
import AddFormLesson from "./AddFormLesson";


const CourseStudy = () => {
    const { chapters } = useSelector((state: RootState) => state.chapter)
    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth)
    const param = useParams();
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state: RootState) => state.group);
    const [activeChapter, setActiveChapter] = useState<number | null>(0);

    const handleVideoClick = (chapterId: string, c: number, l: number) => {
        navigate(`/course/${chapterId}/watch?c=${c}&l=${l}`)
    }

    const handleChapterClick = (index: number) => {
        setActiveChapter(index);
    };

    const [isAddFormChapter, setIsAddFormChapter] = useState(false)
    const [isAddFormLesson, setIsAddFormLesson] = useState(false)

    const handleCloseAddChapter = () => setIsAddFormChapter(false)
    const handleCloseAddLesson = () => setIsAddFormLesson(false)

    const handleGetData = async () => {
        await dispatch(globalThis.$action.loadChapters({
            query: {
                groupId: param.id,

            }
        }))

    }
    const handleOpenFormChapter = () => {
        setIsAddFormChapter(true)
    }
    const handleOpenFormLesson = () => {
        setIsAddFormLesson(true)
    }

    useEffect(() => {
        handleGetData()
    }, [])
    return (
        <div className="flex flex-col gap-4">
            {
                authUser?.role === 'teacher' ?
                    (
                        <div className='flex h-[56px] w-full justify-end'>
                            <div className="flex items-center gap-2">
                                <Button className="h-[48px]"
                                    onClick={handleOpenFormChapter}>
                                    <Plus />
                                    <span>Thêm chương</span>
                                </Button>
                                <Button className="h-[48px]"
                                    onClick={handleOpenFormLesson}>
                                    <Plus />
                                    <span>Thêm bài giảng</span>
                                </Button>
                            </div>
                        </div>
                    )
                    : null
            }
            <div className='flex gap-2'>
                {
                    isLoading ? <div className='w-full h-[500px] bg-slate-200 animate-pulse rounded-sm' /> :
                        chapters && chapters.length > 0 ?
                            (
                                <div className='w-full flex border border-primary/20 rounded-sm truncate'>
                                    <div className="w-[100px]  truncate h-full" >
                                        <ul className="overflow-hidden block h-full">
                                            {chapters.map((chapter, index) => (
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
                                                    <h2 className="text-lg font-semibold ">{chapters?.[activeChapter]?.title}</h2>
                                                    <p className="text-gray-500 ">{chapters[activeChapter]?.lessons && chapters[activeChapter]?.lessons.length} bài giảng</p>
                                                </div>
                                                <ul>
                                                    {chapters[activeChapter]?.lessons && chapters[activeChapter]?.lessons?.map((lesson, idx) => (
                                                        <li key={idx} className={cn(`h-[85px] flex flex-row items-center gap-4 px-8 border-b border-gray-200/80
                                        cursor-pointer hover:text-primary
                                        `,
                                                            idx === (chapters[activeChapter]?.lessons && chapters[activeChapter]?.lessons.length - 1) ? 'border-b-0' : '',

                                                        )}>
                                                            <FileVideo className='text-slate-500/80' />
                                                            <span className='flex flex-col'>

                                                                <span
                                                                    onClick={() => handleVideoClick(chapters[activeChapter]._id, activeChapter, idx)}
                                                                >{lesson.title}</span>
                                                                <span className="text-gray-500">{lesson.duration} phút</span>
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
                                <div className='w-full h-[500px] flex border border-primary/20 rounded-sm truncate justify-center items-center text-slate-500 flex-col gap-4'>
                                    <Layers3 size={45} />
                                    <span className='font-medium text-lg'>Chưa có danh sách bài học</span>
                                </div>
                            )
                }
            </div>
            {
                isAddFormChapter ?
                    <AddFormChapter
                        reload={handleGetData}
                        close={handleCloseAddChapter}
                        isOpen={isAddFormChapter}
                        triggerElement={<></>}
                    /> : null
            }
            {
                isAddFormLesson ?
                    <AddFormLesson
                        reload={handleGetData}
                        close={handleCloseAddLesson}
                        isOpen={isAddFormLesson}
                        triggerElement={<></>}
                    /> : null
            }
        </div>
    )
};

export default CourseStudy;
