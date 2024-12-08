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
import { cn } from '@/lib/utils';
import { Info, X } from 'lucide-react';
import { FormEvent, ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const AddFormChapter = ({
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
    const { id } = useParams();
    const initValue = {
        name: '',
        title: '',
        lessons: [],
        groupId: id,

    };

    const [error, setError] = useState({
        name: false,
        title: false
    });

    const [chapterDetails, setchapterDetails] = useState(initValue);

    const dispatch = useDispatch()

    const handleClose = () => {
        close()
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await dispatch(globalThis.$action.createChapter(chapterDetails))
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



    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-md text-black rounded-[20px] z-[9995]">
                <div className='flex justify-end w-full cursor-pointer'>
                    <X onClick={handleClose} />
                </div>
                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Thêm tên chương
                    </DialogTitle>
                    <DialogDescription className="text-base text-left">
                        Vui lòng thêm chương vào nhóm học phần
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={(handleSubmit)} className="w-full flex flex-col gap-2 gap-x-10 h-fit p-0 px-0" action="#" method="POST">
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Tên chương *</span>
                        <div className="mt-2 relative truncate mb-6">
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                defaultValue={chapterDetails.name}
                                autoComplete="name"
                                onChange={handleChangeChapter}
                                onFocus={() => setError((prev) => ({ ...prev, name: false }))}
                                className={cn('authInput', error.name && 'redBorder')}
                                placeholder="Nhập tên chương"
                            />
                            <CustomTooltip
                                isHidden={!error.name}
                                triggerElement={
                                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                                        <Info className="text-red-500" size={18} />
                                    </div>
                                }
                                message="Tên chương không được để trống"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Mô tả chương *</span>
                        <div className="mt-2 relative truncate mb-6">
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                autoComplete="title"
                                // defaultValue={chapterDetails.title}
                                onFocus={() => setError((prev) => ({ ...prev, title: false }))}
                                onChange={handleChangeChapter}
                                className={cn('authInput', error.title && 'redBorder')}
                                placeholder="Nhập mô tả chương"
                            />
                            <CustomTooltip
                                isHidden={!error.title}
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

export default AddFormChapter;
