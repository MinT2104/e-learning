import CustomTable from "@/components/common/CustomTable";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { UserType } from "@/redux/StoreType";
import UserService from "@/services/user.service";
import { ColumnDef } from "@tanstack/react-table";
import { FileDown, MoreHorizontal, Plus, Search, Settings } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AddStudentToGroupForm from "./AddStudentToGroupForm";
import CustomPagination from "@/components/common/CustomPagination";
import { useSelector } from "react-redux";

const CourseMember = () => {
    const userService = new UserService('user')
    const { id } = useParams();
    const { authUser } = useSelector((state: RootState) => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [isAddStudentFormOpen, setIsAddStudentFormOpen] = useState(false)
    const [studentData, setStudentData] = useState<
        {
            students: UserType[],
            total: number
        }
    >({
        students: [],
        total: 0
    })
    const [search, setSearch] = useState<string>('')

    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        query: {
            role: 'student', courseIds: {
                $in: [id]
            }
        }
    })

    const timeoutId = useRef<any>()

    const debounce = (func: any, delay: number) => {
        return (...args: any) => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current)
            }
            timeoutId.current = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }

    const handleGetData = async () => {
        setIsLoading(true);
        try {
            const queryWithSearch = {
                ...query,
                query: {
                    ...query.query,
                    ...(search ? { userName: { $regex: search, $options: "i" } } : {}),
                },
            };
            const res: any = await userService.loadAllWithPaging(queryWithSearch);
            if (res.records) {
                setStudentData({
                    students: res.records.rows,
                    total: res.records.total,
                });
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearch(value);
        }, 700),
        []
    );

    useEffect(() => {
        handleGetData();
    }, [query, search]);

    const handleOpenAddStudentForm = () => setIsAddStudentFormOpen(true)

    const handleCloseAddStudentForm = () => setIsAddStudentFormOpen(false)

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
                const image: string = row.getValue('image');
                const userName: string = row.getValue('userName');
                return (
                    <div className="w-10 h-10 rounded-full bg-secondary text-xl flex items-center justify-center border relative cursor-pointer">
                        {image ? (
                            <img src={image} className="w-10 h-10 rounded-full" alt="" />
                        ) : (
                            <p className="font-semibold text-primary uppercase border-none">
                                {userName?.slice(0, 1)}
                            </p>
                        )}
                    </div>
                );
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
        ...(authUser.role === 'teacher'
            ? [
                {
                    id: 'actions',
                    cell: () => (
                        <div className="cursor-pointer flex justify-center items-center h-[40px]">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="w-8 h-8 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <div className="w-full h-[48px] cursor-pointer hover:bg-secondary flex items-center justify-center">
                                            <span>Chỉnh sửa</span>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ),
                },
            ]
            : [])
    ];


    const handleChangePage = (value: string) => {
        setQuery((prev: any) => {
            return {
                ...prev,
                page: prev.page + value
            }
        })
    }

    return (
        <div className='mx-auto pb-8 h-fit w-full flex flex-col gap-4'>
            <div className="relative truncate mb-6 w-full flex flex-col gap-4">
                <div className='flex h-[56px] w-full justify-between'>
                    <div className="w-1/3 border border-border rounded-lg truncate flex h-[48px] items-center">
                        <Input
                            id="search"
                            type="text"
                            disabled={isLoading}
                            defaultValue={search}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            className={cn("border-none rounded-none h-[48px]")}
                            placeholder="Tìm kiếm sinh viên"
                        />

                        <div className='border-l border-slate-200 aspect-square h-[56px] flex items-center justify-center text-slate-500'>
                            <Search size={20} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button className="h-[48px]">
                            <FileDown />
                            <span>Nhập danh sách sinh viên</span>
                        </Button>
                        {
                            authUser.role === 'teacher' ?
                                <Button
                                    onClick={handleOpenAddStudentForm}
                                    className="h-[48px]">
                                    <Plus />
                                    <span>Thêm sinh viên</span>
                                </Button> : null
                        }
                        {
                            authUser.role === 'teacher' ?
                                <Button className="h-[48px] w-[48px]">
                                    <Settings />
                                </Button>
                                : null
                        }

                    </div>


                </div>
                <CustomTable columns={columns} data={studentData.students} loading={false} />
                <CustomPagination onChange={handleChangePage} total={studentData.total} currentPage={query.page} pageSize={query.limit} />
                {
                    isAddStudentFormOpen ?
                        <AddStudentToGroupForm
                            reload={handleGetData}
                            close={handleCloseAddStudentForm}
                            isOpen={isAddStudentFormOpen}
                            triggerElement={<></>}
                        />
                        :
                        null
                }
            </div>
        </div >
    )
};

export default CourseMember;
