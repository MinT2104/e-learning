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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { RootState } from '@/redux/store'
import { CourseType, GroupType, UserType } from '@/redux/StoreType'
import { Inbox, Info, Loader, Plus, X } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const CustomFormTeacherManagement = ({
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

    // Initial form values
    const initValue = {
        userName: '',
        country: '',
        phoneNumber: '',
        email: '',
        address: '',
        role: 'teacher'
    };

    const [teacherDetails, setTeacherDetails] = useState<UserType>(initValue);

    const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTeacherDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log(teacherDetails);
    };

    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-3xl text-black rounded-[20px] z-[9995]">
                <div className="flex justify-end w-full cursor-pointer">
                    <X onClick={close} />
                </div>
                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[28px] font-medium">
                        Chỉnh sửa thông tin giáo viên
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="w-full grid grid-cols-2 gap-2 gap-x-10 p-4">
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Tên giáo viên *</span>
                        <Input
                            name="userName"
                            value={teacherDetails.userName}
                            onChange={handleTeacherChange}
                            placeholder="Nhập tên giáo viên"
                            className="mt-2"
                        />
                    </div>
                    {/* <div className="w-full">
                        <span className="text-sm text-slate-600">Quốc gia *</span>
                        <Input
                            name="country"
                            value={teacherDetails.}
                            onChange={handleTeacherChange}
                            placeholder="Nhập quốc gia"
                            className="mt-2"
                        />
                    </div> */}
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Số điện thoại *</span>
                        <Input
                            name="phoneNumber"
                            value={teacherDetails.phoneNumber}
                            onChange={handleTeacherChange}
                            placeholder="Nhập số điện thoại"
                            className="mt-2"
                        />
                    </div>
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Email *</span>
                        <Input
                            name="email"
                            value={teacherDetails.email}
                            onChange={handleTeacherChange}
                            placeholder="Nhập email"
                            className="mt-2"
                        />
                    </div>
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Địa chỉ *</span>
                        <Input
                            name="address"
                            value={teacherDetails.address}
                            onChange={handleTeacherChange}
                            placeholder="Nhập địa chỉ"
                            className="mt-2"
                        />
                    </div>
                    <div className="w-full flex justify-end col-span-2">
                        <Button type="submit">Lưu</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CustomFormTeacherManagement;