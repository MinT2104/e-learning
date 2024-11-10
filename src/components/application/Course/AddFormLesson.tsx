import CustomDropDown from '@/components/common/CustomDropDown';
import CustomTooltip from '@/components/common/CustomTooltip';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { Info, X } from 'lucide-react';
import { FormEvent, ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddFormLesson = ({
    triggerElement,
    className,
    isOpen,
    close,
    reload,
}: {
    triggerElement: ReactNode
    className?: string;
    isOpen: boolean;
    close: () => void;
    reload: () => void
}) => {
    const { chapters } = useSelector((state: RootState) => state.chapter)
    let initValue = {
        title: '',
        duration: '',
        url: '',
        _id: '',
    };

    const [error, setError] = useState({
        title: false,
        duration: false,
        url: false
    });

    const [chapterDetails, setchapterDetails] = useState(initValue);

    const dispatch = useDispatch()

    const handleClose = () => {
        close()
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        let cloneData = { ...chapterDetails } as any
        delete cloneData._id
        let dataRequest = {
            _id: chapterDetails._id,
            $addToSet: {
                lessons: cloneData
            }
        }

        e.preventDefault()
        const res = await dispatch(globalThis.$action.updateChapter(dataRequest))
        if (res.payload) {
            reload()
            close()
            setchapterDetails(initValue)
        }
        console.log(chapterDetails)
    }

    const handleChangeChapter = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setchapterDetails((prev) => ({ ...prev, [name]: value }));
    };
    const handleChangeChapterDropDown = (data: { name: string, _id: string }) => {
        setchapterDetails((prev) => ({ ...prev, _id: data._id }));
    };


    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-md text-black rounded-[20px] z-[9995]">
                <div className='flex justify-end w-full cursor-pointer'>
                    <X onClick={handleClose} />
                </div>
                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Thêm tên bài giảng
                    </DialogTitle>
                    <DialogDescription className="text-base text-left">
                        Vui lòng thêm chương vào nhóm học phần
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={(handleSubmit)} className="w-full flex flex-col gap-2 gap-x-10 h-fit p-0 px-0" action="#" method="POST">
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Chọn chương *</span>
                        <div className="mt-2 relative truncate mb-2">
                            <CustomDropDown dropDownList={chapters} mappedKey='_id' mappedLabel='name' placeholder="Chọn chương"
                                onChange={handleChangeChapterDropDown}
                            />

                            {/* <CustomTooltip
                                isHidden={!error.title}
                                triggerElement={
                                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                                        <Info className="text-red-500" size={18} />
                                    </div>
                                }
                                message="Quốc gia không được để trống"
                            /> */}
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Tên chương *</span>
                        <div className="mt-2 relative truncate mb-2">
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                defaultValue={chapterDetails.title}
                                autoComplete="title"
                                onChange={handleChangeChapter}
                                onFocus={() => setError((prev) => ({ ...prev, title: false }))}
                                className={cn('authInput', error.title && 'redBorder')}
                                placeholder="Nhập tên chương"
                            />
                            {/* <CustomTooltip
                                isHidden={!error.name}
                                triggerElement={
                                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                                        <Info className="text-red-500" size={18} />
                                    </div>
                                }
                                message="Tên chương không được để trống"
                            /> */}
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Mô tả chương *</span>
                        <div className="mt-2 relative truncate mb-2">
                            <Input
                                id="duration"
                                name="duration"
                                type="text"
                                autoComplete="duration"
                                defaultValue={chapterDetails.duration}
                                onFocus={() => setError((prev) => ({ ...prev, duration: false }))}
                                onChange={handleChangeChapter}
                                className={cn('authInput', error.duration && 'redBorder')}
                                placeholder="Nhập mô tả chương"
                            />
                            <CustomTooltip
                                isHidden={!error.duration}
                                triggerElement={
                                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                                        <Info className="text-red-500" size={18} />
                                    </div>
                                }
                                message="Mô tả chương không được để trống"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Mô tả chương *</span>
                        <div className="mt-2 relative truncate mb-2">
                            <Input
                                id="url"
                                name="url"
                                type="text"
                                autoComplete="url"
                                defaultValue={chapterDetails.url}
                                onFocus={() => setError((prev) => ({ ...prev, url: false }))}
                                onChange={handleChangeChapter}
                                className={cn('authInput', error.url && 'redBorder')}
                                placeholder="Nhập mô tả chương"
                            />
                            <CustomTooltip
                                isHidden={!error.url}
                                triggerElement={
                                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                                        <Info className="text-red-500" size={18} />
                                    </div>
                                }
                                message="Mô tả chương không được để trống"
                            />
                        </div>
                    </div>
                    <div className='flex justify-end col-span-2'>
                        <Button>Xác nhận</Button>
                    </div>
                </form>
            </DialogContent >
        </Dialog >
    )
};

export default AddFormLesson;
