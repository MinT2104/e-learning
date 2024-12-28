import UserImportDialog from "@/components/application/admin/StudentManagement/UserImportDialog";
import CreateFormTeacherManagement from "@/components/application/admin/TeacherManagement/CreateFormTeacherManagement";
import CustomFormTeacherManagement from "@/components/application/admin/TeacherManagement/UpdateFormTeacherManagement";
import CustomPagination from "@/components/common/CustomPagination";
import CustomTable from "@/components/common/CustomTable";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UserType } from "@/redux/StoreType";
import UserService from "@/services/user.service";
import { ColumnDef } from "@tanstack/react-table";
import { Import, MoreHorizontal, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

const TeacherManagement = () => {
    const userService = new UserService('user')

    const [search, setSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false)
    // const { isLoading, users, total } = useSelector((state: RootState) => state.user);
    const [teacherData, setTeacherData] = useState<
        {
            teachers: UserType[],
            total: number
        }
    >({
        teachers: [],
        total: 0
    })
    const [activeUser, setActiveUser] = useState<UserType>();
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreation, setIsOpenCreation] = useState(false)


    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        query: { role: 'teacher' }
    })


    const handleGetData = async () => {
        setIsLoading(true)
        try {
            const res: any = await userService.loadAllWithPaging((query));
            if (res.records) {
                setTeacherData({
                    teachers: res.records.rows,
                    total: res.records.total
                })
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    };

    const handleChangePage = (value: string) => {
        setQuery((prev: any) => {
            return {
                ...prev,
                page: prev.page + value
            }
        })
    }
    const [isOpenImport, setIsOpenImport] = useState(false)


    useEffect(() => {
        handleGetData();
    }, [query]);

    const columns: ColumnDef<UserType, string>[] = [
        {
            header: 'STT',
            accessorKey: 'stt',
            cell: ({ row }) => (
                <div className="cursor-pointer flex justify-start items-center h-[40px]">
                    {(query.page - 1) * query.limit + row.index + 1}
                </div>
            ),
        },
        {
            header: 'Ảnh cá nhân',
            accessorKey: 'image',
            cell: ({ row }) => {
                const image: string = row.getValue('image')
                const userName: string = row.getValue('userName')
                return (


                    <div className="w-10 h-10 rounded-full bg-secondary text-xl flex items-center justify-center border relative cursor-pointer">
                        {
                            image ?
                                <img src={image} className="w-10 h-10 rounded-full" alt="" />
                                : <p className="font-semibold text-primary uppercase border-none">{userName?.slice(0, 1)}</p>
                        }
                    </div>
                )
            },

        },
        {
            header: 'Họ tên',
            accessorKey: 'userName',

        },
        {
            header: 'ID',
            accessorKey: 'ID',

        },
        {
            header: 'Email',
            accessorKey: 'email',

        },
        {
            header: 'Số điện thoại',
            accessorKey: 'phoneNumber',

        },
        {
            id: "actions",
            cell: ({ row }) => {
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
    const handleCloseImport = () => setIsOpenImport(false)


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
                    <Button className="h-[48px]" onClick={() => setIsOpenCreation(true)}>
                        <Plus />
                        <span>Tạo mới</span>
                    </Button>
                    <Button className="h-[48px]" onClick={() => setIsOpenImport(true)}>
                        <Import />
                        <span>Nhập dữ liệu</span>
                    </Button>
                </div>
            </div>
            <CustomTable columns={columns} data={teacherData.teachers} loading={isLoading} />

            <CustomFormTeacherManagement
                triggerElement={null}
                className="custom-form"
                isOpen={isOpen}
                close={handleClose}
                activeData={activeUser}
                reload={handleGetData}
            />
            <CreateFormTeacherManagement reload={handleGetData} close={handleCloseCreation} isOpen={isOpenCreation} className="w-full" triggerElement={<></>} />
            <CustomPagination onChange={handleChangePage} total={teacherData.total} currentPage={query.page} pageSize={query.limit} />
            {isOpenImport && <UserImportDialog reload={handleGetData} close={handleCloseImport} data={null} />}
        </div>
    );
};


export default TeacherManagement;
