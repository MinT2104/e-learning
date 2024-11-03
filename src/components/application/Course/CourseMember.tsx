import CustomTable from "@/components/common/CustomTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { FileDown, Pen, Plus, Search, Settings } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const CourseMember = () => {

    const [search, setSearch] = useState<string>('')

    const { isLoading } = useSelector((state: RootState) => state.course);

    const columns: ColumnDef<typeof mockDataTable[0]>[] = [
        {
            header: 'STT',
            accessorKey: "stt",
        },
        {
            header: "Họ tên",
            accessorKey: "name",
        },
        {
            header: "Mã số sinh viên",
            accessorKey: "studentID",
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
        },
        {
            header: "Ngày sinh",
            accessorKey: "birth",
        },
        {
            id: "actions",
            cell: () => {
                return (
                    <div className="cursor-pointer flex justify-center items-center h-[40px]">
                        <Pen size={16} />
                    </div>
                );
            },
            size: 200,
        },
    ];

    const mockDataTable = [
        {
            stt: 1,
            name: "Nguyễn Văn A",
            studentID: "SV001",
            gender: "Nam",
            birth: "2000-01-01",
        },
        {
            stt: 2,
            name: "Trần Thị B",
            studentID: "SV002",
            gender: "Nữ",
            birth: "2000-02-01",
        },
        {
            stt: 3,
            name: "Lê Văn C",
            studentID: "SV003",
            gender: "Nam",
            birth: "2000-03-01",
        },
        {
            stt: 4,
            name: "Phạm Thị D",
            studentID: "SV004",
            gender: "Nữ",
            birth: "2000-04-01",
        },
        {
            stt: 5,
            name: "Hoàng Văn E",
            studentID: "SV005",
            gender: "Nam",
            birth: "2000-05-01",
        },
        {
            stt: 6,
            name: "Vũ Thị F",
            studentID: "SV006",
            gender: "Nữ",
            birth: "2000-06-01",
        },
        {
            stt: 7,
            name: "Ngô Văn G",
            studentID: "SV007",
            gender: "Nam",
            birth: "2000-07-01",
        },
        {
            stt: 8,
            name: "Đặng Thị H",
            studentID: "SV008",
            gender: "Nữ",
            birth: "2000-08-01",
        },
        {
            stt: 9,
            name: "Bùi Văn I",
            studentID: "SV009",
            gender: "Nam",
            birth: "2000-09-01",
        },
        {
            stt: 10,
            name: "Phan Thị K",
            studentID: "SV010",
            gender: "Nữ",
            birth: "2000-10-01",
        },
        {
            stt: 11,
            name: "Đinh Văn L",
            studentID: "SV011",
            gender: "Nam",
            birth: "2000-11-01",
        },
        {
            stt: 12,
            name: "Lý Thị M",
            studentID: "SV012",
            gender: "Nữ",
            birth: "2000-12-01",
        },
        {
            stt: 13,
            name: "Hà Văn N",
            studentID: "SV013",
            gender: "Nam",
            birth: "2001-01-01",
        },
        {
            stt: 14,
            name: "Vương Thị O",
            studentID: "SV014",
            gender: "Nữ",
            birth: "2001-02-01",
        },
        {
            stt: 15,
            name: "Tô Văn P",
            studentID: "SV015",
            gender: "Nam",
            birth: "2001-03-01",
        },
    ];



    return (
        <div className='mx-auto pb-8 h-fit w-full flex flex-col gap-4'>
            <div className="relative truncate mb-6 w-full flex flex-col gap-4">
                <div className='flex h-[56px] w-full justify-between'>
                    <div className="w-1/3 border border-border rounded-lg truncate flex h-[48px] items-center">
                        <Input
                            id="youtube"
                            name="youtube"
                            type="text"
                            disabled={isLoading}
                            autoComplete="youtube"
                            defaultValue={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={cn('border-none rounded-none h-[48px]')}
                            placeholder="Tìm kiếm sinh viên"
                        />

                        <div className='border-l border-slate-200 aspect-square h-[56px] flex items-center justify-center text-slate-500'>
                            <Search size={20} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button className="h-[48px]">
                            <FileDown />
                            <span>Xuất danh sách sinh viên</span>
                        </Button>
                        <Button className="h-[48px]">
                            <Plus />
                            <span>Thêm sinh viên</span>
                        </Button>
                        <Button className="h-[48px] w-[48px]">
                            <Settings />
                        </Button>
                    </div>


                </div>
                <CustomTable columns={columns} data={mockDataTable} loading={false} />
            </div>
        </div >
    )
};

export default CourseMember;
