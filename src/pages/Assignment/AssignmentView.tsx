import CustomTable from "@/components/common/CustomTable";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GroupType, QuestionType } from "@/redux/StoreType";
import CustomPagination from "@/components/common/CustomPagination";
import CreateFormAssignmentManagement from "@/components/application/AssignmentManagement/CreateFormAssignmentManagement";
import UpdateFormAssignmentManagement from "@/components/application/AssignmentManagement/UpdateFormAssignmentManagement";
import GroupService from "@/services/group.service";
import CustomDropDown from "@/components/common/CustomDropDown";

const AssignmentView = () => {
    const groupService = new GroupService('group')
    // const [search, setSearch] = useState<string>('')
    const [query, setQuery] = useState({
        page: 1, limit: 5, query: {}
    })

    const dispatch = useDispatch();
    const { authUser } = useSelector((state: RootState) => state.auth)
    const { questions, isLoading, total } = useSelector((state: RootState) => state.question);

    const [activeData, setActiveData] = useState<QuestionType>()
    const [groupData, setGroupData] = useState<{ key: string, name: string }[]>()

    // const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreation, setIsOpenCreation] = useState(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)

    const mockCategories = [
        {
            label: 'Mới nhất',
            key: "newest"
        },
        {
            label: 'Cũ hơn',
            key: "oldest"
        },
    ]


    const handleLoadQuestions = async () => {
        await dispatch(globalThis.$action.loadQuestions({
            ...query, query: {
                ...query.query,
                'userId': authUser._id
            }
        }))
    }

    const handleDelete = (_id: string) => {
        dispatch(globalThis.$action.deleteQuestion({ _id }))
        handleLoadQuestions();

    }

    const handleUpdate = () => {
        setIsOpenUpdate(true)

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
                <div className="flex items-center h-[40px] text-nowrap">
                    {row.original.difficulty}
                </div>
            ),
        },

        {
            header: () => {
                return (
                    <div className="flex items-center h-[40px] text-nowrap">
                        Mã khóa học
                    </div>
                )
            },
            accessorKey: "courseData.courseId", // Mã khóa học từ courseData
            cell: ({ row }) => (
                <div className="flex items-center h-[40px]">
                    {row.original.courseData.courseId}
                </div>
            ),
        },

        {
            id: "actions",
            header: () => {
                return (
                    <div className="flex items-center h-[40px] text-nowrap">
                        Hành động
                    </div>
                )
            },
            cell: ({ row }) => {
                const id: string = row.original._id || " ";
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
                                        setActiveData(row.original);
                                        handleUpdate()
                                        // setActiveId(id);
                                    }}
                                >
                                    <div className="w-full h-[48px] cursor-pointer hover:bg-secondary flex items-center justify-center">
                                        <span>Chỉnh sửa</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleDelete(id)}
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
    const handleCloseUpdate = () => setIsOpenUpdate(false)

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

    const handleLoadGroup = async () => {
        const query = {
            page: 1,
            limit: 100,
            query: {
                'teacherData.userId': authUser?._id
            }
        };
        const res: any = await groupService.loadAllWithPaging(query);

        if (res?.records) {
            const group: GroupType[] = res?.records?.rows;

            // Sử dụng Map để loại bỏ trùng lặp dựa trên courseId
            const uniqueCourses = new Map<string, { courseId: string; title: string }>();

            group.forEach((item) => {
                const { courseId, title } = item.courseData;
                if (!uniqueCourses.has(courseId)) {
                    uniqueCourses.set(courseId, { courseId, title });
                }
            });

            // Định dạng lại dữ liệu
            const formatData = Array.from(uniqueCourses.values()).map(({ courseId, title }) => ({
                name: title,
                key: courseId,
            }));

            setGroupData(formatData);
        }
    };


    useEffect(() => {
        handleLoadGroup()
    }, [])

    useEffect(() => {
        handleLoadQuestions();
    }, [query]);

    const handleGroupChange = (data: { key: string, name: string }) => {
        setQuery((prev) => {
            return {
                ...prev,
                query: {
                    ...prev.query,
                    'courseData.courseId': data.key || ''
                }
            }
        })
    }

    const handleChangeSort = (data: { key: string, name: string }) => {
        setQuery((prev) => {

            return {
                ...prev,
                query: {
                    ...prev.query,
                    sort: data.key === 'newest' ? JSON.stringify({ createdAt: -1 }) : JSON.stringify({ createdAt: 1 })
                }
            }
        })
    }

    const handleClearFilter = () => {
        const query = {
            page: 1,
            limit: 5,
            query: {}
        }
        setQuery(query)
    }

    return (
        <div>
            <Heading title='Quản lý câu hỏi' />
            <div className='flex h-[56px] w-full justify-between mt-10 mb-2'>
                <div className="flex gap-2 items-center w-2/3">
                    <div
                        onClick={handleClearFilter}
                        className="relative p-2 border rounded-sm  border-red-500 cursor-pointer">
                        <div className="absolute top-0 left-0 w-[2px] h-2/3 translate-y-2 rotate-[90deg] translate-x-5 bg-red-500 z-10" />
                        <Filter />
                    </div>
                    <CustomDropDown onChange={handleGroupChange} className="w-fit" width="w-80" isHiddenSearch dropDownList={groupData || []} mappedKey="key" mappedLabel="name" placeholder="Chọn nhóm học phần" />
                    <CustomDropDown isHiddenSearch onChange={handleChangeSort} className='w-fit' dropDownList={mockCategories} placeholder="Tất cả" />

                    {/* <div className="w-1/3 border border-border rounded-lg truncate flex h-[48px] items-center">
                        <Input
                            id="search"
                            name="search"
                            type="text"
                            autoComplete="search"
                            defaultValue={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={cn('border-none rounded-none h-[48px]')}
                            placeholder="Tìm kiếm đề thì"
                        />

                        <div className='border-l border-slate-200 aspect-square h-[56px] flex items-center justify-center text-slate-500'>
                            <Search size={20} />
                        </div>
                    </div> */}
                </div>
                {/* <div className="w-1/3 border border-border rounded-lg truncate flex h-[48px] items-center">
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
                </div> */}
                <div className="flex items-center gap-3 mb-2">
                    <Button onClick={() => setIsOpenCreation(true)} className="h-[48px]">
                        <Plus />
                        <span>Tạo mới</span>
                    </Button>
                </div>
            </div>
            <CustomTable columns={columns} data={questions || []} loading={isLoading} />
            <CustomPagination onChange={handleChangePage} total={total} currentPage={query.page} pageSize={query.limit} />
            {
                isOpenUpdate && <UpdateFormAssignmentManagement reload={handleReload} close={handleCloseUpdate} isOpen={isOpenUpdate} activeData={activeData} className="w-full" triggerElement={<></>} />
            }
            {
                isOpenCreation && <CreateFormAssignmentManagement close={handleCloseCreation} reload={handleReload} isOpen={isOpenCreation} className="w-full" triggerElement={<></>} />
            }


        </div>
    )
};

export default AssignmentView;
