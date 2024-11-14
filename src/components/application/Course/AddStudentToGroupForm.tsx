import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { RootState } from '@/redux/store';
import { UserType } from '@/redux/StoreType';
import { X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AddStudentToGroupForm = ({
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
    const { id: groupId } = useParams()
    const [searchValue, setSearchValue] = useState('')
    const { users } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const [checkedStudent, setCheckedStudent] = useState<string[]>([])
    const [filteredData, setFilterData] = useState<UserType[]>([])

    const handleLoadUsers = async () => {
        const query = {
            page: 1,
            limit: 1000,
            query: {
                role: 'student',
                courseIds: {
                    $nin: groupId
                }
            }
        }
        await dispatch(globalThis.$action.loadUsers(query))
    }

    const handleCheckBox = (id: string | undefined) => {
        if (!id) return

        if (!checkedStudent.includes(id)) {
            setCheckedStudent(prev => [...prev, id])
        } else {
            setCheckedStudent((prev) => prev.filter((studentId) => studentId !== id));
        }
    }

    const handleOk = async () => {
        if (checkedStudent.length === 0) return

        const requestData = {
            courseId: groupId,
            ids: checkedStudent
        }

        const res = await dispatch(globalThis.$action.signCourse(requestData))
        if (res.payload) {
            toast({
                variant: 'success',
                description: 'Thêm sinh viên thành công',
            })
            reload()
            handleLoadUsers()
        }
    }

    const handleClose = () => {
        close()
    }

    useEffect(() => {
        handleLoadUsers()
    }, [])

    useEffect(() => {
        if (!users) return
        const filterData = users.filter((item) => item.userName.toLowerCase().includes(searchValue.toLowerCase()))
        setFilterData(filterData ? filterData : users)
    }, [searchValue, users])

    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-1g text-black rounded-[20px] z-[9995]">
                <div className='flex justify-end w-full cursor-pointer'>
                    <X onClick={handleClose} />
                </div>
                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Thêm sinh viên vào học phần
                    </DialogTitle>
                    <DialogDescription className="text-base text-left">
                        Vui lòng chọn các sinh viên để thêm vào nhóm học phần
                    </DialogDescription>
                </DialogHeader>
                <div className='w-full flex flex-col gap-2'>
                    <div >
                        <Input
                            type='text'
                            defaultValue={searchValue}
                            className="w-full h-[56px]"
                            onChange={handleSearch}
                            placeholder='Nhập vào tên học viên'
                        />
                    </div>
                    <div className="min-h-[290px] max-h-[290px] h-fit p-0 overflow-y-auto z-[9999] bg-slate-200 rounded-sm">
                        <ul className='p-2 flex flex-col gap-2'>
                            {users && users.length > 0 && filteredData.map((dropdownItem) => (
                                <li
                                    onClick={(undefined)}
                                    key={dropdownItem._id}
                                    className="h-[56px] flex gap-2 text-[#21272A] hover:bg-secondary items-center py-2 px-4 rounded-sm text-sm cursor-pointer bg-white"
                                >
                                    <div className='mr-3 flex items-center'>
                                        <Checkbox checked={checkedStudent.includes(dropdownItem._id || '')} onClick={() => handleCheckBox(dropdownItem._id)} />
                                    </div>
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
                <div className='flex justify-end'>
                    <Button disabled={checkedStudent.length === 0} onClick={handleOk}>
                        Hoàn tất
                    </Button>
                </div>
            </DialogContent >
        </Dialog >
    )
};

export default AddStudentToGroupForm;
