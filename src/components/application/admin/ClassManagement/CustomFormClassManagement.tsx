import CustomAlertDialog from '@/components/common/CustomAlertDialog'
import CustomTooltip from '@/components/common/CustomTooltip'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { RootState } from '@/redux/store'
import { CourseType } from '@/redux/StoreType'
import { Inbox, Info, Plus, PlusCircle, X } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

const CustomFormClassManagement = ({
    triggerElement,
    className,
    isOpen,
    close,
    activeData
}: {
    triggerElement: ReactNode
    className?: string;
    isOpen: boolean;
    close: () => void;
    activeData: CourseType | undefined
}) => {

    let initValue = {
        title: '',
        description: '',
        courseId: '',
        groupIds: [] as string[]
    }

    const [classDetail, setClassDetail] = useState(initValue);

    let initGroup = {
        "title": "",
        "courseData":
        {
            "title": activeData?.title,
            "courseId": activeData?.courseId
        },
        "description": "",
        "teacherId": "",
        "Chapters": []
    }

    const [groupData, setGroupData] = useState({
        ...initGroup,
        courseData: {
            "title": activeData?.title,
            "courseId": activeData?.courseId
        },
    });

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

    const { course } = useSelector((state: RootState) => state.course)

    const [activeId, setActiveId] = useState('')

    const [isOpenConfirm, setIsOpenConfirm] = useState(false)


    const dispatch = useDispatch();
    const regex = /[?&]id=([^&]+)/;

    const handleGetIndex = (str: string) => {
        const result = str.match(regex);
        return result && result[1]
    };

    const handleGetData: any = async (id: string) => {
        const res = await dispatch(globalThis.$action.getCourse(id));
        if (res.payload) {
            const { title, groupIds, courseId, description } = res.payload
            setClassDetail({ title, groupIds, courseId, description })
            console.log(res.payload)
        }

    };


    useEffect(() => {
        const id = handleGetIndex(window.location.search)
        if (id) {
            setActiveId(id)
        }
    }, [window.location.search])

    useEffect(() => {
        if (activeId) {
            handleGetData(activeId)
        }
    }, [activeId])

    const handleSubmit = () => {

    }

    useEffect(() => {
        if (isOpen) {
            setClassDetail(initValue)
        }
    }, [isOpen])

    const handleOpenConfirm = (value: boolean) => {
        setIsOpenConfirm(value)
    }

    const handleCreateGroup = () => {
        console.log(groupData)
        handleOpenConfirm(false)

    }

    useEffect(() => {
        setGroupData((prev) => {
            return {
                ...prev,
                "courseData":
                {
                    "title": activeData?.title,
                    "courseId": activeData?.courseId
                },
            }

        })
        console.log(activeData)
    }, [isOpen])

    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-3xl text-black rounded-[20px] z-[9995]">
                <div className='flex justify-end w-full cursor-pointer'>
                    <X onClick={close} />
                </div>

                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[28px] font-medium">
                        Chỉnh sửa học phần
                    </DialogTitle>
                    <DialogDescription className="text-lg text-left">
                        Chỉnh sửa thông tin cơ bản của học phần
                    </DialogDescription>
                </DialogHeader>
                <div className='w-full'>
                    <form onSubmit={handleSubmit} className="w-full grid grid-cols-2 gap-2 gap-x-10 h-fit p-0 px-0" action="#" method="POST">
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

                        <div className='row-span-3'>
                            <div className='flex items-center justify-between relative'>
                                <span className="text-sm text-slate-600">Nhóm học phần *</span>
                                <CustomTooltip className='justify-end cursor-pointer' triggerElement={
                                    <CustomAlertDialog onCancel={() => handleOpenConfirm(false)} onOk={handleCreateGroup} isOpen={isOpenConfirm} title='Bạn có chắc sẽ tạo nhóm học phần mới' triggerElement={
                                        <Plus onClick={() => handleOpenConfirm(true)} className='text-primary' />
                                    } />
                                } message='Tạo nhóm' isHidden={false} />
                            </div>

                            {
                                classDetail.groupIds && classDetail.groupIds.length === 0 ? (
                                    <div className='w-full h-[325px] rounded-sm border border-border flex justify-center items-center flex-col gap-2 mt-2'>
                                        <Inbox size={40} className='text-gray-500' />
                                        <span className='text-gray-500 text-[12px]'>Học phần này chưa có nhóm</span>
                                    </div>
                                )
                                    :
                                    (
                                        <div className='w-full h-[325px] rounded-sm border border-border flex justify-center items-center flex-col gap-2 mt-2'>
                                            <ul className='w-full h-full p-2 flex flex-col gap-2'>
                                                {Array.from({ length: 5 }).map((_, index) => {
                                                    return (
                                                        <li key={index} className='h-[48px] p-2 px-4 flex bg-secondary text-black items-center justify-between'>
                                                            <span className='text-sm'>Nhóm - {index + 1}</span>
                                                            <Button className='h-[32px]'>Giảng viên</Button>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )
                            }
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
                                    id="bio"
                                    name="bio"
                                    onFocus={() => setError((prev) => ({ ...prev, bio: false }))}
                                    autoComplete="bio"
                                    onChange={handleChangeClassDetail}
                                    className={cn('authInput')}
                                    placeholder="Nhập vào mô tả học phần"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent >
        </Dialog >
    )
}

export default CustomFormClassManagement
