import CustomTable from "@/components/common/CustomTable";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { FileDown, MoreHorizontal, Plus, Search, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomFormClassManagement from "@/components/application/admin/ClassManagement/CustomFormClassManagement";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CourseType } from "@/redux/StoreType";

const ClassManagement = () => {

    const [search, setSearch] = useState<string>('')

    const dispatch = useDispatch();

    const { courses, isLoading } = useSelector((state: RootState) => state.course);

    const { groups } = useSelector((state: RootState) => state.group);

    const handleGetData: any = async () => {
        dispatch(globalThis.$action.loadCourses({ page: 1, limit: 10 }));
    };

    const [activeData, setActiveData] = useState<CourseType>()

    const [isOpen, setIsOpen] = useState(false)

    const [activeId, setActiveId] = useState('')


    const handleLoadGroup = async () => {
        const groupId = activeData?.groupIds || []
        const query = {
            page: 1,
            limit: 100,
            query: {
                _id: {
                    $in: [...groupId]
                }
            }
        }
        await dispatch(globalThis.$action.loadGroups(query))
    }

    const columns: ColumnDef<typeof courses[0]>[] = [
        {
            header: 'STT',
            accessorKey: "stt",
            cell: ({ row }) => {
                return row.index + 1
            }
        },
        {
            header: "Tên học phần",
            accessorKey: "title",
        },
        {
            header: "Mã học phần",
            accessorKey: "courseId",
        },
        {
            header: "Mô tả",
            accessorKey: "description",
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
                                        setIsOpen(true)
                                        setActiveData(row.original)
                                        handleGetData()
                                        setActiveId(id)
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
            size: 200,
        },
    ];

    const handleClose = () => setIsOpen(false)

    const handleReload = () => {
        handleGetData()
    }

    const handleGetCourseDetail: any = async (id: string) => {
        await dispatch(globalThis.$action.getCourse(id));

    };

    useEffect(() => {
        if (activeId) {
            handleGetCourseDetail(activeId)
        }
    }, [activeId])

    useEffect(() => {
        handleGetData();
    }, []);

    useEffect(() => {
        if (activeData && activeData?.groupIds.length > 0) {
            handleLoadGroup()
        }
    }, [activeData])

    return (
        <div>
            <Heading title='Quản lý lớp học phần' />
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
            <CustomTable columns={columns} data={courses || []} loading={false} />
            <CustomFormClassManagement reload={handleReload} close={handleClose} isOpen={isOpen} activeData={activeData} groupActive={groups} className="w-full" triggerElement={<></>} />

        </div>
    )
};

export default ClassManagement;
