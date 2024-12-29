import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Lesson } from '@/redux/StoreType';

function CourseVideo() {
    const param = useParams();
    const dispatch = useDispatch();
    const regex = /c=(\d+)&l=(\d+)/;

    const initLesson = {
        duration: '',
        title: '',
        url: '',
        _id: ''
    }

    const [activeLesson, setActiveLeson] = useState<Lesson>(initLesson);

    const { chapter } = useSelector((state: RootState) => state.chapter);

    const handleGetIndex = (str: string) => {
        const result = str.match(regex);
        return result ? [+result[1], +result[2]] : null;
    };

    const handleCall: any = async () => {
        await dispatch(globalThis.$action.getChapter(param.id))
    }

    useEffect(() => {
        const index: number[] | null = handleGetIndex(location.search);
        console.log(index)
        console.log(chapter)

        if (index && chapter) {
            const { lessons } = chapter;
            setActiveLeson(lessons ? lessons[index[1]] : initLesson);
        }
    }, [chapter]);


    useEffect(() => {
        handleCall();
    }, []);

    return (
        <div className='container mx-auto px-4 py-6'>
            <div className='space-y-6'>
                <div className='max-w-5xl mx-auto'>
                    <div className='aspect-video rounded-xl overflow-hidden shadow-lg bg-slate-200'>
                        <iframe
                            className='h-full w-full border-0'
                            src={activeLesson?.url || ''}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {/* <div className='max-w-5xl mx-auto space-y-4'>
                    {isLoading ? (
                        <div className='space-y-3'>
                            <div className='w-2/3 h-8 rounded-lg bg-slate-200 animate-pulse' />
                            <div className='w-1/3 h-4 rounded-lg bg-slate-200 animate-pulse' />
                        </div>
                    ) : (
                        <>
                            <h1 className='text-2xl font-semibold text-slate-900'>
                                {activeLesson?.title}
                            </h1>
                            <p className='text-sm text-slate-600'>
                                Thời lượng: {activeLesson?.duration}
                            </p>
                        </>
                    )}
                </div> */}
            </div>
        </div>
    );
}

export default CourseVideo
