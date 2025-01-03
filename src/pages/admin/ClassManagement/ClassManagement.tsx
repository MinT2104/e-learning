import CustomTable from "@/components/common/CustomTable";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, Import, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateFormClassManagement from "@/components/application/admin/ClassManagement/UpdateFormClassManagement";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CourseType } from "@/redux/StoreType";
import CreateFormClassManagement from "@/components/application/admin/ClassManagement/CreateFormManagement";
import CustomPagination from "@/components/common/CustomPagination";
import CustomDropDown from "@/components/common/CustomDropDown";
import { ApiClient } from "@/customFetch/ApiClient";
import { toast } from "@/hooks/use-toast";
import ClassImportDialog from "@/components/application/admin/ClassManagement/ClassImportDialog";
import { Checkbox } from "@/components/ui/checkbox";

function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

const ClassManagement = () => {

    const [search, setSearch] = useState<string>('')
    const [query, setQuery] = useState({
        page: 1, limit: 5, query: {}
    })

    const dispatch = useDispatch();
    const [isOpenImport, setIsOpenImport] = useState(false)
    const { courses, isLoading, total } = useSelector((state: RootState) => state.course);

    const handleGetData: any = async () => {
        dispatch(globalThis.$action.loadCourses(query));
    };
    const [selectedCourse, setSelectedCourse] = useState<string[]>([])
    const [activeData, setActiveData] = useState<CourseType>()

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreation, setIsOpenCreation] = useState(false)

    const [activeId, setActiveId] = useState('')

    const handleLoadGroup = async () => {
        const query = {
            page: 1,
            limit: 100,
            query: {
                'courseData.courseId': activeData?.courseId
            }
        }
        await dispatch(globalThis.$action.loadGroups(query))
    }

    const handleDeleteCourse = async (id: string) => {
        try {
            const res: any = await ApiClient.delete(`/course/${id}`);
            if (res.status === 200) {
                toast({
                    title: "Thành công",
                    description: "Đã xóa lớp học phần thành công",
                    variant: "default",
                });
                handleGetData();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectUser = (userId: string) => {
        setSelectedCourse(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allCourseIds = courses.map(course => course._id).filter((id): id is string => id !== undefined);
            setSelectedCourse(allCourseIds);
        } else {
            setSelectedCourse([]);
        }
    };


    const handleDeleteMultiple = async () => {
        if (selectedCourse.length === 0) {
            toast({
                title: "Lỗi",
                description: "Vui lòng chọn ít nhất một sinh viên để xóa",
                variant: "destructive",
            });
            return;
        }

        try {
            const response = await ApiClient.post(`/course/delete-many`, {
                courseIds: selectedCourse
            });
            if (response) {
                toast({
                    title: "Thành công",
                    description: "Đã xóa lớp học phần thành công",
                    variant: "default",
                });
                setSelectedCourse([]);
                handleGetData()
            } else {
                toast({
                    title: "Lỗi",
                    description: "Có lỗi xảy ra khi xóa lớp học phần",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const columns: ColumnDef<typeof courses[0]>[] = [
        {
            id: "select",
            header: ({ table }: any) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => {
                        if (value) {
                            table.toggleAllPageRowsSelected(true)
                            handleSelectAll(true)
                        } else {
                            table.toggleAllPageRowsSelected(false)
                            handleSelectAll(false)
                        }
                    }}
                    aria-label="Select all"
                    className="translate-y-[2px]"
                />
            ),
            cell: ({ row }: any) => (
                <Checkbox
                    checked={selectedCourse.includes(row.original._id)}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value)
                        handleSelectUser(row.original._id)
                    }}
                    aria-label="Select row"
                    className="translate-y-[2px]"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
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
            header: "Mã học phần",
            accessorKey: "courseId",
        },
        {
            header: "Tên học phần",
            accessorKey: "title",
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
                                <DropdownMenuItem
                                    onClick={() => {
                                        handleDeleteCourse(id);
                                    }}
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

    const handleClose = () => setIsOpen(false)
    const handleCloseCreation = () => setIsOpenCreation(false)

    const handleReload = () => {
        handleLoadGroup()
    }

    const handleGetCourseDetail: any = async (id: string) => {
        await dispatch(globalThis.$action.getCourse(id));
    };

    const handleChangePage = (value: string) => {
        setQuery((prev: any) => {
            return {
                ...prev,
                page: prev.page + value
            }
        })
    }

    const debouncedSearch = useCallback(
        debounce((searchValue: string) => {
            setQuery(prev => ({
                ...prev,
                page: 1,
                query: {
                    ...prev.query,
                    title: {
                        $regex: searchValue,
                        $options: 'i'
                    }
                }
            }));
        }, 500),
        []
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    useEffect(() => {
        if (activeId) {
            handleGetCourseDetail(activeId)
        }
    }, [activeId])

    useEffect(() => {
        handleGetData();
    }, [query, isOpen]);

    useEffect(() => {
        handleLoadGroup()
    }, [activeData])

    const handleClearFilter = () => {
        const query = {
            page: 1,
            limit: 5,
            query: {}
        }
        setQuery(query)
    }

    const handleChangeSort = (data: { key: string, name: string }) => {
        setQuery((prev: any) => {

            return {
                ...prev,
                query: {
                    ...prev.query,
                    sort: data.key === 'newest' ? JSON.stringify({ createdAt: -1 }) : JSON.stringify({ createdAt: 1 })
                }
            }
        })
    }

    const handleCloseImport = () => {
        setIsOpenImport(false)
    }

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

    return (
        <div>
            <Heading title='Quản lý lớp học phần' />
            <div className='flex h-[56px] w-full justify-between mt-10'>
                <div className="flex items-center gap-3 w-2/3">
                    {
                        selectedCourse.length > 0 ?
                            <Button
                                onClick={handleDeleteMultiple}
                                variant="outline"
                                className="h-[48px]">
                                <Trash2 />
                            </Button> : null
                    }
                    <div
                        onClick={handleClearFilter}
                        className="relative p-2 border rounded-sm  border-red-500 cursor-pointer">
                        <div className="absolute top-0 left-0 w-[2px] h-2/3 translate-y-2 rotate-[90deg] translate-x-5 bg-red-500 z-10" />
                        <Filter />
                    </div>
                    <div className="w-1/3 border border-border rounded-lg truncate flex h-[48px] items-center">
                        <Input
                            id="search"
                            name="search"
                            type="text"
                            autoComplete="search"
                            value={search}
                            onChange={handleSearch}
                            className={cn('border-none rounded-none h-[48px]')}
                            placeholder="Tìm kiếm sinh viên"
                        />

                        <div className='border-l border-slate-200 aspect-square h-[56px] flex items-center justify-center text-slate-500'>
                            <Search size={20} />
                        </div>
                    </div>
                    <CustomDropDown isHiddenSearch onChange={handleChangeSort} className='w-fit' dropDownList={mockCategories} placeholder="Tất cả" />

                </div>
                <div className="flex items-center gap-3 mb-2">
                    <Button onClick={() => setIsOpenCreation(true)} className="h-[48px]">
                        <Plus />
                        <span>Tạo mới</span>
                    </Button>
                    <Button className="h-[48px]" onClick={() => setIsOpenImport(true)}>
                        <Import />
                        <span>Nhập dữ liệu</span>
                    </Button>
                </div>


            </div>
            <CustomTable columns={columns} data={courses || []} loading={isLoading} />
            <CustomPagination onChange={handleChangePage} total={total} currentPage={query.page} pageSize={query.limit} />
            <UpdateFormClassManagement reload={handleReload} close={handleClose} isOpen={isOpen} activeData={activeData} className="w-full" triggerElement={<></>} />
            <CreateFormClassManagement close={handleCloseCreation} isOpen={isOpenCreation} className="w-full" triggerElement={<></>} />
            {isOpenImport && <ClassImportDialog reload={handleGetData} close={handleCloseImport} />}
        </div>
    )
};

export default ClassManagement;
