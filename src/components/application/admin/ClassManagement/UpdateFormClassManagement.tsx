import CustomAlertDialog from '@/components/common/CustomAlertDialog'
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
import { RootState } from '@/redux/store'
import { CourseType, GroupType } from '@/redux/StoreType'
import { Inbox, Info, Loader, Plus, X } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UpdateFormGroup from './UpdateFormGroup'

const UpdateFormClassManagement = ({
    triggerElement,
    className,
    isOpen,
    close,
    activeData,
    reload
}: {
    triggerElement: ReactNode
    className?: string;
    isOpen: boolean;
    close: () => void;
    activeData: CourseType | undefined;
    reload: () => void

}) => {

    let initValue = {
        title: '',
        description: '',
        courseId: '',
        groupIds: [] as string[]
    }

    const [classDetail, setClassDetail] = useState(initValue);
    const { course } = useSelector((state: RootState) => state.course)
    const { groups, isLoading: groupLoading } = useSelector((state: RootState) => state.group);


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

    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const dispatch = useDispatch();
    const [isOpenEditGroup, setIsOpenEditGroup] = useState(false)
    const [activeGroup, setActiveGroup] = useState<GroupType>()


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


    const handleCreateGroup = async () => {
        await dispatch(globalThis.$action.createGroup(groupData))
        handleOpenConfirm(false)
        reload()
    }

    useEffect(() => {
        setGroupData((prev) => {
            return {
                ...prev,
                title: `Nhóm - ${groups.length + 1}`,
                description: `Nhóm - ${groups.length + 1}`,
                courseData:
                {
                    title: activeData?.title,
                    courseId: activeData?.courseId
                },
            }

        })
        console.log(activeData)
    }, [isOpen, groups])

    useEffect(() => {
        if (course) {
            const { title, groupIds, courseId, description } = course
            setClassDetail({ title, groupIds, courseId, description })
        }
    }, [course])



    const handleDeleteGroup = async (_id: string) => {
        await dispatch(globalThis.$action.deleteGroup({ _id }))
        reload()
    }

    const handleOpenEditGroup = (item: GroupType) => {
        setActiveGroup(item)
        setIsOpenEditGroup(true)
    }
    const handleCloseGroupForm = () => {
        setIsOpenEditGroup(false)
    }

    console.log(activeGroup)


    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-3xl text-black rounded-[20px] z-[9995]">
                {
                    isOpenEditGroup ?
                        <UpdateFormGroup
                            activeData={activeGroup}
                            close={handleCloseGroupForm}
                            isOpen={isOpenEditGroup}
                            reload={reload}
                            triggerElement={<></>} />
                        :
                        null
                }
                <div className='flex justify-end w-full cursor-pointer'>
                    <X onClick={close} />
                </div>
                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
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
                                    value={course.title}
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
                            <div className='h-full'>
                                <div className='flex items-center justify-between relative'>
                                    <span className="text-sm text-slate-600">Nhóm học phần *</span>
                                    <CustomTooltip className='justify-end cursor-pointer' triggerElement={
                                        <CustomAlertDialog onCancel={() => handleOpenConfirm(false)} onOk={handleCreateGroup} isOpen={isOpenConfirm} title='Bạn có chắc sẽ tạo nhóm học phần mới' triggerElement={
                                            <Plus onClick={() => handleOpenConfirm(true)} className='text-primary' />
                                        } />
                                    } message='Tạo nhóm' isHidden={false} />
                                </div>
                                {!groupLoading ?

                                    (
                                        groups.length === 0 ? (
                                            <div className='w-full h-[325px] rounded-sm border border-border flex justify-center items-center flex-col gap-2 mt-2'>
                                                <Inbox size={40} className='text-gray-500' />
                                                <span className='text-gray-500 text-[12px]'>Học phần này chưa có nhóm</span>
                                            </div>
                                        )
                                            :
                                            (
                                                <div className='w-full h-[325px] max-h-full overflow-auto rounded-sm border border-border flex justify-start items-center flex-col gap-2 mt-2 bg-slate-200'>
                                                    <ul className='w-full h-fit p-2 flex flex-col gap-2'>
                                                        {(groups && groups.length > 0 && groups.map((item, index) => {
                                                            return (
                                                                <li key={index} className='h-[56px] p-2 px-4 flex bg-white rounded-sm text-black items-center justify-start gap-2 relative'>

                                                                    <span className='text-sm flex-1'>{item.title}</span>
                                                                    <Button
                                                                        type='button'
                                                                        onClick={() => handleOpenEditGroup(item)}
                                                                        className='h-[32px]'>sửa</Button>
                                                                    <Button
                                                                        type='button'
                                                                        onClick={() => handleDeleteGroup(item._id)}
                                                                        className='h-[32px]' variant={'destructive'}>xóa</Button>

                                                                </li>
                                                            )
                                                        }))

                                                        }
                                                    </ul>


                                                </div>
                                            )
                                    )
                                    :
                                    <div className='w-full h-[325px] flex items-center justify-center border border-border mt-2'>
                                        <Loader className='animate-spin' />
                                    </div>
                                }
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
                                    value={classDetail.courseId}
                                    defaultValue={course.courseId}
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
                                    value={classDetail.description}
                                    defaultValue={course.description}
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
                    </form>
                </div>
            </DialogContent >
        </Dialog >
    )
}

export default UpdateFormClassManagement
