import CustomTable from "@/components/common/CustomTable";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { FileDown, Import, MoreHorizontal, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateFormClassManagement from "@/components/application/admin/ClassManagement/UpdateFormClassManagement";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CourseType, QuestionType } from "@/redux/StoreType";
import CustomPagination from "@/components/common/CustomPagination";
import CreateFormAssignmentManagement from "@/components/application/admin/AssignmentManagement/CreateFormAssignmentManagement";
import UpdateFormAssignmentManagement from "@/components/application/admin/AssignmentManagement/UpdateFormAssignmentManagement";

const AssignmentView = () => {

    const [search, setSearch] = useState<string>('')
    const [query, setQuery] = useState({
        page: 1, limit: 5
    })

    const dispatch = useDispatch();
    const { authUser } = useSelector((state: RootState) => state.auth)
    const { questions, isLoading, total } = useSelector((state: RootState) => state.question);

    // const [activeData, setActiveData] = useState<QuestionType>()

    // const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreation, setIsOpenCreation] = useState(false)




    const handleLoadQuestions = async () => {
        await dispatch(globalThis.$action.loadQuestions({
            ...query, query: {
                'userId': authUser._id
            }
        }))
    }

    const columns: ColumnDef<QuestionType>[] = [
        {
            header: 'STT',
            accessorKey: 'index',
            cell: ({ row }) => (
                <div className="cursor-pointer flex justify-start items-center h-[40px]">
                    {(query.page - 1) * query.limit + row.index + 1}
                </div>
            ),
        },

        {
            header: "Nội dung câu hỏi",
            accessorKey: "content", // Nội dung câu hỏi
            cell: ({ row }) => (
                <div dangerouslySetInnerHTML={{ __html: row.original.content || '' }} className="cursor-pointer flex justify-start items-center h-[40px] gap-2">
                </div>
            ),
        },

        {
            header: "Môn học",
            accessorKey: "courseData.title", // Môn học từ courseData
            cell: ({ row }) => (
                <div className="flex items-center h-[40px] truncate max-w-[300px]">
                    {row.original.courseData.title}
                </div>
            ),
        },

        {
            header: "Độ khó",
            accessorKey: "difficulty", // Độ khó của câu hỏi
            cell: ({ row }) => (
                <div className="flex items-center h-[40px]">
                    {row.original.difficulty}
                </div>
            ),
        },

        {
            header: "Mã khóa học",
            accessorKey: "courseData.courseId", // Mã khóa học từ courseData
            cell: ({ row }) => (
                <div className="flex items-center h-[40px]">
                    {row.original.courseData.courseId}
                </div>
            ),
        },

        {
            id: "actions",
            header: "Hành động",
            cell: ({ row }) => {
                const id = row.original._id;
                return (
                    <div className="cursor-pointer flex justify-center items-center h-[40px]">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-8 h-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => {
                                        // setIsOpen(true);
                                        // setActiveData(row.original);
                                        handleLoadQuestions();
                                        // setActiveId(id);
                                    }}
                                >
                                    <div className="w-full h-[48px] cursor-pointer hover:bg-secondary flex items-center justify-center">
                                        <span>Chỉnh sửa</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                // onClick={() => handleDelete(id)}
                                >
                                    <div className="w-full h-[48px] cursor-pointer hover:bg-secondary flex items-center justify-center">
                                        <span>Xóa</span>
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

    const handleCloseCreation = () => setIsOpenCreation(false)

    const handleReload = () => {
        handleLoadQuestions()
    }

    const handleChangePage = (value: string) => {
        setQuery((prev: any) => {
            return {
                ...prev,
                page: prev.page + value
            }
        })
    }

    useEffect(() => {
        handleLoadQuestions();
    }, [query]);

    return (
        <div>
            <Heading title='Quản lý câu hỏi' />
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
                        placeholder="Tìm kiếm câu hỏi"
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
                    <Button onClick={() => setIsOpenCreation(true)} className="h-[48px]">
                        <Plus />
                        <span>Tạo mới</span>
                    </Button>
                    <Button className="h-[48px]">
                        <Import />
                        <span>Nhập dữ liệu</span>
                    </Button>
                </div>


            </div>
            <CustomTable columns={columns} data={questions || []} loading={isLoading} />
            <CustomPagination onChange={handleChangePage} total={total} currentPage={query.page} pageSize={query.limit} />
            {/* <UpdateFormAssignmentManagement reload={handleReload} close={handleClose} isOpen={isOpen} activeData={activeData} className="w-full" triggerElement={<></>} /> */}
            {
                isOpenCreation && <CreateFormAssignmentManagement close={handleCloseCreation} reload={handleReload} isOpen={isOpenCreation} className="w-full" triggerElement={<></>} />
            }


        </div>
    )
};

export default AssignmentView;
