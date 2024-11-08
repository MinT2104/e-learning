import CreateFormTeacherManagement from "@/components/application/admin/TeacherManagement/CreateFormTeacherManagement";
import CustomFormTeacherManagement from "@/components/application/admin/TeacherManagement/CustomFormTeacherManagement";
import CustomPagination from "@/components/common/CustomPagination";
import CustomTable from "@/components/common/CustomTable";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { UserType } from "@/redux/StoreType";
import { ColumnDef } from "@tanstack/react-table";
import { FileDown, Import, MoreHorizontal, Pen, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TeacherManagement = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState<string>('');
    const { isLoading, users, total } = useSelector((state: RootState) => state.user);
    const [activeUser, setActiveUser] = useState<UserType>();
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreation, setIsOpenCreation] = useState(false)

    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        query: { role: 'teacher' }
    })


    const handleGetData = async () => {
        await dispatch(globalThis.$action.loadUsers(query));
    };

    const handleChangePage = (value: string) => {
        setQuery((prev: any) => {
            return {
                ...prev,
                page: prev.page + value
            }
        })
    }

    useEffect(() => {
        handleGetData();
    }, [query]);

    const columns: ColumnDef<typeof users[0], string>[] = [
        {
            header: 'STT',
            accessorKey: 'stt',
            cell: ({ row }) => (
                <div className="cursor-pointer flex justify-start items-center h-[40px]">
                    {row.index + 1}
                </div>
            ),
        },
        {
            header: 'Họ tên',
            accessorKey: 'userName',

        },
        {
            header: 'Email',
            accessorKey: 'email',

        },
        {
            id: "actions",
            cell: ({ row }) => {
                const id = row.original._id
                return (
                    <div className="cursor-pointer flex justify-center items-center h-[40px]">

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-8 h-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setIsOpen(true);
                                        setActiveUser(row.original);
                                        handleGetData();
                                    }}

                                >
                                    <div className="w-full h-[48px] cursor-pointer hover:bg-secondary flex items-center justify-center">
                                        <span>Chỉnh sửa</span>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ];

    const handleClose = () => setIsOpen(false)
    const handleCloseCreation = () => setIsOpenCreation(false)
    return (
        <div>
            <Heading title="Quản lý Giảng viên" />
            <div className="flex h-[56px] w-full justify-between mt-10">
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
                    <div className="border-l border-slate-200 aspect-square h-[56px] flex items-center justify-center text-slate-500">
                        <Search size={20} />
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <Button className="h-[48px]">
                        <FileDown />
                        <span>Xuất danh sách</span>
                    </Button>
                    <Button className="h-[48px]" onClick={() => setIsOpenCreation(true)}>
                        <Plus />
                        <span>Tạo mới</span>
                    </Button>
                    <Button className="h-[48px]">
                        <Import />
                        <span>Nhập dữ liệu</span>
                    </Button>
                </div>
            </div>
            <CustomTable columns={columns} data={users} loading={isLoading} />

            <CustomFormTeacherManagement
                triggerElement={null}
                className="custom-form"
                isOpen={isOpen}
                close={handleClose}
                activeData={activeUser}
                reload={handleGetData}
            />
            <CreateFormTeacherManagement close={handleCloseCreation} isOpen={isOpenCreation} className="w-full" triggerElement={<></>} />
            <CustomPagination onChange={handleChangePage} total={total} currentPage={query.page} pageSize={query.limit} />

        </div>
    );
};


export default TeacherManagement;
