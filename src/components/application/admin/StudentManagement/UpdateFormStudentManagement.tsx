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
import { UserType } from '@/redux/StoreType'
import { Info, X } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const UpdateFormTeacherManagement = ({
    triggerElement,
    className,
    isOpen,
    close,
    activeData,
    reload
}: {
    triggerElement: ReactNode;
    className?: string;
    isOpen: boolean;
    close: () => void;
    activeData: UserType | undefined;
    reload: () => void;
}) => {

    const initValue: Partial<UserType> = {
        userName: '',
        phoneNumber: '',
        email: '',
        address: '',
    };

    const dispatch = useDispatch();
    // const { user } = useSelector((state: RootState) => state.user);
    const [teacherDetails, setTeacherDetails] = useState<Partial<UserType>>(initValue);
    const [error, setError] = useState({
        userName: false,
        email: false,
    });

    const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTeacherDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateTeacher = async () => {
        const updatedTeacherData = {
            _id: activeData?._id,
            userName: teacherDetails.userName,
            email: teacherDetails.email,
            phoneNumber: teacherDetails.phoneNumber,
            address: teacherDetails.address,
        };

        await dispatch(globalThis.$action.updateUser({ ...updatedTeacherData }));
        reload();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleUpdateTeacher();
    };



    useEffect(() => {
        if (isOpen) {
            setTeacherDetails(activeData || initValue);
        }
    }, [isOpen, activeData]);

    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-2xl text-black rounded-[20px] z-[9995]">
                <div className="flex justify-end w-full cursor-pointer">
                    <X onClick={close} />
                </div>
                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Chỉnh sửa thông tin học viên
                    </DialogTitle>
                    <DialogDescription className="text-lg text-left">
                        Vui lòng điền đầy đủ những trường bắt buộc
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="w-full rid grid-cols-1 gap-2 gap-x-10 p-4">
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Tên giáo viên *</span>
                        <div className="mt-2 relative truncate mb-6">
                            <Input
                                name="userName"
                                value={teacherDetails.userName || ''}
                                onChange={handleTeacherChange}
                                onFocus={() => setError((prev) => ({ ...prev, userName: false }))}
                                placeholder="Nhập tên giáo viên"
                                className={cn(error.userName && 'redBorder')}
                            />
                            <CustomTooltip
                                isHidden={!error.userName}
                                triggerElement={<Info className="text-red-500" size={18} />}
                                message="Tên giáo viên không được để trống"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <span className="text-sm text-slate-600">Số điện thoại</span>
                        <div className="mt-2 relative truncate mb-6">
                            <Input
                                name="phoneNumber"
                                value={teacherDetails.phoneNumber || ''}
                                onChange={handleTeacherChange}
                                placeholder="Nhập số điện thoại"
                                className={cn('')}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <span className="text-sm text-slate-600">Email *</span>
                        <div className="mt-2 relative truncate mb-6">
                            <Input
                                name="email"
                                value={teacherDetails.email || ''}
                                onChange={handleTeacherChange}
                                placeholder="Nhập email"
                                onFocus={() => setError((prev) => ({ ...prev, email: false }))}
                                className={cn(error.email && 'redBorder')}
                            />
                            <CustomTooltip
                                isHidden={!error.email}
                                triggerElement={<Info className="text-red-500" size={18} />}
                                message="Email không được để trống"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <span className="text-sm text-slate-600">Địa chỉ</span>
                        <div className="mt-2 relative truncate mb-6">
                            <Input
                                name="address"
                                value={teacherDetails.address || ''}
                                onChange={handleTeacherChange}
                                placeholder="Nhập địa chỉ"
                                className={cn('')}
                            />
                        </div>
                    </div>

                    <div className="w-full flex justify-end col-span-2">
                        <Button type="submit">Lưu</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateFormTeacherManagement;

