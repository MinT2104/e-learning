import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { RootState } from '@/redux/store';
import { GroupType, UserType } from '@/redux/StoreType';
import UserService from '@/services/user.service';
import { X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UpdateFormGroup = ({
    triggerElement,
    className,
    isOpen,
    close,
    activeData,

}: {
    triggerElement: ReactNode
    className?: string;
    isOpen: boolean;
    close: () => void;
    activeData: GroupType | undefined;
    reload?: () => void

}) => {
    const userService = new UserService('user')
    const [searchValue] = useState('')
    const { users } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const handleSearch = () => {

    }

    const [activeTeacher, setActiveTeacher] = useState<UserType | undefined>()

    const handleChangeItem = async (item: UserType, groupId: string) => {
        console.log(item)
        if (groupId) {
            const userData = {
                userId: item._id
            }
            console.log(groupId, userData)

            await dispatch(globalThis.$action.updateGroup({ _id: groupId, teacherData: userData }))
            setActiveTeacher(item)
            handleGetActiveTeacher(item._id)
        }
    }

    const handleGetActiveTeacher = async (id: string | undefined) => {

        if (!id) {
            return
        }
        const res = await userService.getById(id)
        setActiveTeacher(res as UserType)
    }

    const handleLoadUsers = async () => {
        const query = {
            page: 1,
            limit: 1000,
            query: {
                role: 'teacher'
            }
        }
        await dispatch(globalThis.$action.loadUsers(query))
    }

    useEffect(() => {
        handleLoadUsers()
    }, [])

    useEffect(() => {
        if (!activeData) return
        const id = activeData?.teacherData?.userId
        if (id) {
            handleGetActiveTeacher(id)
        } else {
            setActiveTeacher(undefined)
        }
    }, [])

    const handleClose = () => {
        setActiveTeacher(undefined)
        close()
    }

    return (
        <Dialog open={isOpen}>
            <DialogOverlay className='z-[9998]' />
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-1g text-black rounded-[20px] z-[9995]">
                <div className='flex justify-end w-full cursor-pointer'>
                    <X onClick={handleClose} />
                </div>
                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Chỉnh sửa group
                    </DialogTitle>
                    <DialogDescription className="text-base text-left">
                        Vui lòng chọn một giảng viên để giảng dạy nhóm học phần này
                    </DialogDescription>
                </DialogHeader>
                <div className='w-full flex flex-col gap-2'>

                    <div className='h-[56px] w-full border bg-slate-200 rounded-sm flex items-center px-2 gap-2'>
                        {activeTeacher
                            ?
                            <>
                                <div className='w-10 h-10 rounded-full bg-secondary text-xl flex items-center justify-center border relative cursor-pointer'>
                                    {
                                        activeTeacher?.image ?
                                            <img src={activeTeacher?.image} className="w-10 h-10 rounded-full" alt="" />
                                            : <p className="font-semibold text-primary uppercase">{activeTeacher?.userName?.slice(0, 1)}</p>
                                    }
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-bold text-sm'>{activeTeacher?.userName}</span>
                                    <span className='text-[12px] text-slate-500'>{activeTeacher?.email}</span>
                                </div>
                            </>
                            :
                            <div className='text-red-500 text-[12px] text-center flex justify-center w-full'>
                                <span>Không có giảng viên được chọn</span>
                            </div>
                        }

                    </div>
                    <div >
                        <Input
                            className="w-full h-[56px]"
                            onChange={handleSearch}
                            placeholder='Nhập vào tên giảng viên'
                            value={searchValue}
                        />
                    </div>
                    <div className="min-h-[330px] max-h-[330px] h-fit p-0 overflow-y-auto z-[9999] bg-slate-200 rounded-sm">
                        <ul className='p-2 flex flex-col gap-2'>
                            {users && users.length > 0 && users.map((dropdownItem) => (
                                <li
                                    onClick={() => handleChangeItem(dropdownItem, activeData ? activeData._id : '')}
                                    key={dropdownItem._id}
                                    className="h-[56px] flex gap-2 text-[#21272A] hover:bg-secondary items-start py-2 px-4 rounded-sm text-sm cursor-pointer bg-white"
                                >
                                    <div className='w-10 h-10 rounded-full bg-secondary text-xl flex items-center justify-center border relative cursor-pointer'>
                                        {
                                            dropdownItem?.image ?
                                                <img src={dropdownItem?.image} className="w-10 h-10 rounded-full" alt="" />
                                                : <p className="font-semibold text-primary uppercase">{dropdownItem?.userName?.slice(0, 1)}</p>
                                        }
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-sm'>{dropdownItem?.userName}</span>
                                        <span className='text-[12px] text-slate-500'>{dropdownItem?.email}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </DialogContent >
        </Dialog >
    )
};

export default UpdateFormGroup;
