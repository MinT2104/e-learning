import CustomTable from "@/components/common/CustomTable";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { FileDown, Import, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const TeacherManagement = () => {

    const [search, setSearch] = useState<string>('')
    const { isLoading } = useSelector((state: RootState) => state.user);


    return (
        <div>
            <Heading title='Quản lý Giảng viên' />
            <div className='flex h-[56px] w-full justify-between mt-10'>
                <div className="w-1/3 border border-border rounded-lg truncate flex h-[48px] items-center">
                    <Input
                        id="search"
                        name="search"
                        type="text"
                        disabled={isLoading}
                        autoComplete="search"
                        defaultValue={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={cn('border-none rounded-none h-[48px]')}
                        placeholder="Tìm kiếm sinh viên"
                    />

                    <div className='border-l border-slate-200 aspect-square h-[56px] flex items-center justify-center text-slate-500'>
                        <Search size={20} />
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <Button className="h-[48px]">
                        <FileDown />
                        <span>Xuất danh sách</span>
                    </Button>
                    <Button className="h-[48px]">
                        <Plus />
                        <span>Tạo mới</span>
                    </Button>
                    <Button className="h-[48px]">
                        <Import />
                        <span>Nhập dữ liệu</span>
                    </Button>
                </div>


            </div>
            <CustomTable columns={[]} data={[]} loading={false} />

        </div>
    )
};

export default TeacherManagement;
