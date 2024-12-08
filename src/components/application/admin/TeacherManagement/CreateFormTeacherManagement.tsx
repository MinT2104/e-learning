
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
import { cn } from '@/lib/utils'
import { Info, X } from 'lucide-react'
import { FormEvent, ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const CreateFormTeacherManagement = ({
    triggerElement,
    className,
    isOpen,
    close,
    reload
}: {
    triggerElement: ReactNode
    className?: string;
    isOpen: boolean;
    close: () => void;
    reload: () => void
}) => {

    const initValue = {
        userName: '',
        password: '',
        phoneNumber: '',
        email: '',
        address: '',
        role: 'teacher',
        ID: ''
    };

    const [teacherDetails, setteacherDetails] = useState(initValue);

    const handleChangeteacherDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setteacherDetails((prev) => ({ ...prev, [name]: value }));
    };

    const [error, setError] = useState({
        userName: false,
        password: false,
        phoneNumber: false,
        email: false,
        ID: false
    });

    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await dispatch(globalThis.$action.createUsers(teacherDetails))
        if (res.payload) {
            reload()
            close()
            setteacherDetails(initValue)
        }
    }

    useEffect(() => {
        if (isOpen) {
            setteacherDetails(initValue)
        }
    }, [isOpen])

    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-2xl text-black rounded-[20px] z-[9995]">
                <div className='flex justify-end w-full cursor-pointer'>
                    <X onClick={close} />
                </div>

                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Tạo giảng viên
                    </DialogTitle>
                    <DialogDescription className="text-lg text-left">
                        Vui lòng điền đầy đủ những trường bắt buộc
                    </DialogDescription>
                </DialogHeader>
                <div className='w-full'>
                    <form onSubmit={(handleSubmit)} className="w-full grid grid-cols-2 gap-2 gap-x-10 h-fit p-0 px-0" action="#" method="POST">
                        <div className="w-full">
                            <span className="text-sm text-slate-600">Tên giảng viên *</span>
                            <div className="mt-2 relative truncate mb-6">
                                <Input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    defaultValue={teacherDetails.userName}
                                    autoComplete="userName"
                                    onChange={handleChangeteacherDetails}
                                    onFocus={() => setError((prev) => ({ ...prev, userName: false }))}
                                    className={cn('authInput', error.userName && 'redBorder')}
                                    placeholder="Nhập tên giảng viên"
                                />
                                <CustomTooltip
                                    isHidden={!error.userName}
                                    triggerElement={
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    }
                                    message="Tên giảng viên không được để trống"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <span className="text-sm text-slate-600">Mật khẩu *</span>
                            <div className="mt-2 relative truncate mb-6">
                                <Input
                                    id="password"
                                    name="password"
                                    type="text"
                                    autoComplete="password"
                                    onFocus={() => setError((prev) => ({ ...prev, password: false }))}
                                    defaultValue={teacherDetails.password}
                                    onChange={handleChangeteacherDetails}
                                    className={cn('authInput', error.password && 'redBorder')}
                                    placeholder="Nhập mật khẩu"
                                />
                                <CustomTooltip
                                    isHidden={!error.password}
                                    triggerElement={
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    }
                                    message="Mật khẩu không được để trống"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <span className="text-sm text-slate-600">Địa chỉ</span>
                            <div className="mt-2 relative truncate mb-6">
                                <Input
                                    id="address"
                                    name="address"
                                    type="text"
                                    autoComplete="address"
                                    defaultValue={teacherDetails.address}
                                    onChange={handleChangeteacherDetails}
                                    className={cn('authInput')}
                                    placeholder="Nhập địa chỉ"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <span className="text-sm text-slate-600">Email *</span>
                            <div className="mt-2 relative truncate mb-6">
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    defaultValue={teacherDetails.email}
                                    onChange={handleChangeteacherDetails}
                                    onFocus={() => setError((prev) => ({ ...prev, email: false }))}
                                    className={cn('authInput', error.email && 'redBorder')}
                                    placeholder="Nhập email"
                                />
                                <CustomTooltip
                                    isHidden={!error.email}
                                    triggerElement={
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    }
                                    message="Địa chỉ email không được để trống"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <span className="text-sm text-slate-600">Số điện thoại *</span>
                            <div className="mt-2 relative truncate mb-6">
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    autoComplete="phoneNumber"
                                    defaultValue={teacherDetails.phoneNumber}
                                    onFocus={() => setError((prev) => ({ ...prev, phoneNumber: false }))}
                                    onChange={handleChangeteacherDetails}
                                    className={cn('authInput', error.phoneNumber && 'redBorder')}
                                    placeholder="Nhập số điện thoại"
                                />
                                <CustomTooltip
                                    isHidden={!error.phoneNumber}
                                    triggerElement={
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    }
                                    message="Số điện thoại không được để trống"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <span className="text-sm text-slate-600">ID của giảng viên *</span>
                            <div className="mt-2 relative truncate mb-6">
                                <Input
                                    id="ID"
                                    name="ID"
                                    type="text"
                                    autoComplete="ID"
                                    defaultValue={teacherDetails.ID}
                                    onChange={handleChangeteacherDetails}
                                    onFocus={() => setError((prev) => ({ ...prev, ID: false }))}
                                    className={cn('authInput', error.ID && 'redBorder')}
                                    placeholder="Nhập ID của giảng viên"
                                />
                                <CustomTooltip
                                    isHidden={!error.ID}
                                    triggerElement={
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    }
                                    message="ID không được để trống"
                                />
                            </div>
                        </div>

                        {/* <div className="w-full">
                            <span className="text-sm text-slate-600">Mô tả học phần *</span>
                            <div className="mt-2 relative truncate mb-6">
                                <Textarea
                                    defaultValue={teacherDetails.email}
                                    rows={4}
                                    id="description"
                                    name="description"
                                    onFocus={() => setError((prev) => ({ ...prev, email: false }))}
                                    autoComplete="description"
                                    onChange={handleChangeteacherDetails}
                                    className={cn('authInput')}
                                    placeholder="Nhập vào mô tả học phần"
                                />
                            </div>
                        </div> */}

                        <div className='flex justify-end col-span-2'>
                            <Button>Xác nhận</Button>
                        </div>
                    </form>
                </div>
            </DialogContent >
        </Dialog >
    )
}

export default CreateFormTeacherManagement
