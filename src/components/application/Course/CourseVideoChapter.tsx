import { ChapterType, Lesson } from "@/redux/StoreType";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { AudioLines } from "lucide-react";

type CourseVideoChapterProps = {
    chapter: ChapterType;
    chapterIndex: number;
    activeIndex: number[];
    handleLessonClick: (chapterIndex: number, lessonIndex: number, lesson: Lesson) => void

}

const CourseVideoChapter = ({ chapter, chapterIndex, activeIndex, handleLessonClick }: CourseVideoChapterProps) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={chapterIndex.toString()} className='border-none'>
                <AccordionTrigger isShowIcon={false} className='text-left text-md p-0 hover:no-underline hover:text-primary h-fit border-none flex-1'>
                    <h3 className={`text-md font-semibold p-4`}>
                        {`${chapter.title}`}
                    </h3>
                </AccordionTrigger>
                <AccordionContent className='px-0 pb-0'>
                    <ul>
                        {chapter.lessons?.map((lesson, lessonIndex) => (
                            <li
                                key={lesson._id}
                                onClick={() => handleLessonClick(chapterIndex, lessonIndex, lesson)} // Cập nhật sự kiện click
                                className={cn(`cursor-pointer p-4 hover:text-primary text-slate-500 
                                                    `,
                                    activeIndex[0] === chapterIndex &&
                                        activeIndex[1] === lessonIndex ? 'text-black rounded-none' : ''
                                )}
                            >
                                <div className='flex gap-4 items-center'>
                                    {
                                        activeIndex[0] === chapterIndex &&
                                            activeIndex[1] === lessonIndex ?
                                            <AudioLines className='text-primary w-5' size={20} />
                                            :
                                            <span className='w-5 text-sm'>
                                                {
                                                    lessonIndex + 1
                                                }
                                            </span>

                                    }
                                    <div className={cn('flex gap-4 w-full',
                                        activeIndex[0] === chapterIndex &&
                                            activeIndex[1] === lessonIndex ? 'text-black font-bold' : ''
                                    )}>
                                        <div className='aspect-video h-20 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-center'>
                                        </div>
                                        <div>
                                            <span>
                                                {lesson.title}
                                            </span>
                                            <p className='text-sm font-normal'>
                                                {lesson.duration}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default CourseVideoChapter;


