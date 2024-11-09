
import CustomTooltip from '@/components/common/CustomTooltip'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Info, X } from 'lucide-react'
import { FormEvent, ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const CreateFormClassManagement = ({
    triggerElement,
    className,
    isOpen,
    close,
}: {
    triggerElement: ReactNode
    className?: string;
    isOpen: boolean;
    close: () => void;
}) => {

    let initValue = {
        title: '',
        description: '',
        courseId: '',
    }

    const [classDetail, setClassDetail] = useState(initValue);

    const handleChangeClassDetail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setClassDetail((prev) => ({ ...prev, [name]: value }));
    };

    const [error, setError] = useState({
        title: false,
        description: false,
        courseId: false,
        groupIds: false
    });

    const dispatch = useDispatch();

    const handleGetData: any = async () => {
        dispatch(globalThis.$action.loadCourses({ page: 1, limit: 5 }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(classDetail)
        const res = await dispatch(globalThis.$action.createCourse(classDetail))
        console.log(res)
        if (res.payload) {
            handleGetData()
            close()
            setClassDetail(initValue)
        }
    }

    useEffect(() => {
        if (isOpen) {
            setClassDetail(initValue)
        }
    }, [isOpen])

    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-1g text-black rounded-[20px] z-[9995]">
                <div className='flex justify-end w-full cursor-pointer'>
                    <X onClick={close} />
                </div>

                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Thêm học phần
                    </DialogTitle>
                    <DialogDescription className="text-lg text-left">
                        Tạo thông tin học phần
                    </DialogDescription>
                </DialogHeader>
                <div className='w-full'>
                    <form onSubmit={(handleSubmit)} className="w-full grid grid-cols-1 gap-2 gap-x-10  p-0 px-0" action="#" method="POST">
                        <div className="w-full">
                            <span className="text-sm text-slate-600">Tên học phần *</span>
                            <div className="mt-2 relative truncate mb-6">
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    defaultValue={classDetail.title}
                                    autoComplete="title"
                                    onChange={handleChangeClassDetail}
                                    className={cn('authInput', error.title && 'redBorder')}
                                    placeholder="Nhập tên học phần"
                                />
                                <CustomTooltip
                                    isHidden={!error.title}
                                    triggerElement={
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    }
                                    message="Tên học phần không được để trống"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <span className="text-sm text-slate-600">Mã học phần *</span>
                            <div className="mt-2 relative truncate mb-6">
                                <Input
                                    id="courseId"
                                    name="courseId"
                                    type="text"
                                    autoComplete="courseId"
                                    defaultValue={classDetail.courseId}
                                    onChange={handleChangeClassDetail}
                                    className={cn('authInput', error.courseId && 'redBorder')}
                                    placeholder="Nhập mã học phần"
                                />
                                <CustomTooltip
                                    isHidden={!error.courseId}
                                    triggerElement={
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    }
                                    message="Mã học phần không được để trống"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <span className="text-sm text-slate-600">Mô tả học phần *</span>
                            <div className="mt-2 relative truncate mb-6">
                                <Textarea
                                    defaultValue={classDetail.description}
                                    rows={4}
                                    id="description"
                                    name="description"
                                    onFocus={() => setError((prev) => ({ ...prev, description: false }))}
                                    autoComplete="description"
                                    onChange={handleChangeClassDetail}
                                    className={cn('authInput')}
                                    placeholder="Nhập vào mô tả học phần"
                                />
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <Button>Xác nhận</Button>
                        </div>
                    </form>
                </div>
            </DialogContent >
        </Dialog >
    )
}

export default CreateFormClassManagement
