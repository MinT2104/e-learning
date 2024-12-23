import CustomTable from "@/components/common/CustomTable";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Filter, Plus, Send, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "@/components/common/CustomPagination";
import { GroupType, NotificationType } from "@/redux/StoreType";
import moment from "moment";
import NotificationDialogView from "@/components/application/Notification/NotificationDialogView";
import PublishDialogNotificationComfirm from "@/components/application/Notification/PublishDialogNotificationComfirm";
import CreateNotificationDialog from "@/components/application/Notification/CreateNotificationDialog";
import EditNotificationDialog from "@/components/application/Notification/EditNotificationDialog";
import DeleteNotificationDialog from "@/components/application/Notification/DeleteNotificationDialog";
import CustomDropDown from "@/components/common/CustomDropDown";
import GroupService from "@/services/group.service";

const NotificationView = () => {
    const { authUser } = useSelector((state: RootState) => state.auth)
    const [query, setQuery] = useState({
        page: 1, limit: 5, query: {}
    })
    const [groupData, setGroupData] = useState<{ key: string, name: string }[]>()
    const groupService = new GroupService('group')
    const dispatch = useDispatch();
    const { notifications, isLoading, total } = useSelector((state: RootState) => state.notification);

    const [activeData, setActiveData] = useState<NotificationType | null>(null)
    const [isOpenView, setIsOpenView] = useState(false)
    const [isOpenPublish, setIsOpenPublish] = useState(false)
    const [isOpenCreation, setIsOpenCreation] = useState(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [groups, setGroups] = useState<GroupType[]>([])

    const handleLoadNotifications = async () => {
        await dispatch(globalThis.$action.loadNotifications({
            ...query, query: {
                ...query.query,
                'teacherData.userId': authUser._id
            }
        }))
    }

    const handleDelete = (data: NotificationType | null) => {
        if (!data) return
        setActiveData(data)
        setIsOpenDelete(true)
    }

    const handleUpdate = (data: NotificationType | null) => {
        if (!data) return
        setActiveData(data)
        setIsOpenUpdate(true)

    }

    useEffect(() => {
        if (authUser.role === 'teacher') {
            handleLoadGroup()
        }
    }, [])

    const columns: ColumnDef<NotificationType>[] = [
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
            header: "Tiêu đề",
            accessorKey: "title", // Nội dung câu hỏi
            cell: ({ row }) => (
                <div className="cursor-pointer flex justify-start items-center h-[40px] gap-2 text-wrap">
                    {row.original.title}
                </div>
            ),
            size: 100,
            maxSize: 100,
        },
        {
            header: "Nhóm học phần",
            accessorKey: "groupId", // Nội dung câu hỏi
            cell: ({ row }) => {
                const groupId = row.original.groupId
                const existedGroup = groups.find((item: any) => item._id === groupId)
                return groups && groups.length > 0 ? (
                    <div className="cursor-pointer flex justify-start items-center h-[40px] gap-2 text-wrap">
                        {existedGroup ? existedGroup.courseData.title + ' - ' + existedGroup.title : ''}
                    </div>)
                    : ""
            },
            size: 100,
            maxSize: 100,
        },
        {
            header: "Trạng thái",
            accessorKey: "status", // Độ khó của câu hỏi
            cell: ({ row }) => (
                <div className="flex items-center h-[40px] text-nowrap">
                    {row.original.status ?
                        <span className="text-green-500 px-2 text-[12px] py-1 rounded-md bg-green-100">Đã gửi</span>
                        :
                        <span className="text-red-500 px-2 text-[12px] py-1 rounded-md bg-red-100">Chưa gửi</span>
                    }
                </div>
            ),
        },
        {
            header: "Thời gian tạo",
            accessorKey: "createdAt", // Độ khó của câu hỏi
            cell: ({ row }) => (
                <div className="flex items-center h-[40px] text-nowrap">
                    {row.original.createdAt ? moment(row.original.createdAt).format('DD/MM/YYYY HH:mm') : ''}
                </div>
            ),
        },
        {
            header: "Thời gian chỉnh sửa",
            accessorKey: "updatedAt", // Độ khó của câu hỏi
            cell: ({ row }) => (
                <div className="flex items-center h-[40px] text-nowrap">
                    {row.original.updatedAt ? moment(row.original.updatedAt).format('DD/MM/YYYY HH:mm') : ''}
                </div>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const status: boolean = row.original.status || false;
                return (
                    <div className="cursor-pointer flex justify-end items-center h-[40px] gap-2">
                        {!status ?
                            <Button
                                onClick={() => handlePublish(row.original || null)}
                                variant="outline" className="h-[32px] border-0 shadow-none px-0">
                                <Send />
                            </Button> :
                            null
                        }
                        <Button
                            onClick={() => handleView(row.original || null)}
                            variant="outline" className="h-[32px] border-0 shadow-none px-0">
                            <Eye />
                        </Button>
                        {!status ?
                            <>
                                <Button onClick={() => handleUpdate(row.original || null)} variant="outline" className="h-[32px] border-0 shadow-none px-0">
                                    <Edit />
                                </Button>
                                <Button
                                    onClick={() => handleDelete(row.original || null)}
                                    variant="outline" className="h-[32px] border-0 shadow-none px-0">
                                    <Trash />
                                </Button>
                            </> :
                            null
                        }

                    </div>
                );
            },
            size: 50,
            minSize: 50,
        },
    ];

    const handleCloseCreation = () => setIsOpenCreation(false)
    const handleCloseUpdate = () => setIsOpenUpdate(false)

    const handleReload = () => {
        handleLoadNotifications()
    }

    const handleView = (data: NotificationType | null) => {
        if (!data) return;

        setActiveData(data)
        setIsOpenView(true)
    }

    const handlePublish = (data: NotificationType | null) => {
        if (!data) return;

        setActiveData(data)
        setIsOpenPublish(true)
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
        }
        const res: any = await groupService.loadAllWithPaging(query)
        if (res?.records) {
            const group: GroupType[] = res?.records?.rows
            setGroups(group)
            const formatData: { name: string, key: string }[] = []
            group.map((item) => {
                const { title } = item.courseData
                const name = title + " (" + item.title + ")"
                const key = item._id
                formatData.push({
                    name, key
                })
            })
            setGroupData(formatData)
        }
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

    const handleGroupChange = (data: { key: string, name: string }) => {
        setQuery((prev: any) => {
            return {
                ...prev,
                query: {
                    ...prev.query,
                    'groupId': data.key || ''
                }
            }
        })
    }

    useEffect(() => {
        handleLoadNotifications();
    }, [query]);

    useEffect(() => {
        handleLoadGroup()
    }, [])

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
            <Heading title='Quản lý thông báo' />
            <div className='flex h-[56px] w-full justify-between mt-10 mb-5'>
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
                <div className="flex items-center gap-3 mb-2">
                    <Button onClick={() => setIsOpenCreation(true)} className="h-[48px]">
                        <Plus />
                        <span>Tạo mới</span>
                    </Button>
                </div>
            </div>
            <CustomTable columns={columns} data={notifications || []} loading={isLoading} />
            <CustomPagination onChange={handleChangePage} total={total} currentPage={query.page} pageSize={query.limit} />
            {
                activeData && isOpenUpdate && <EditNotificationDialog reload={handleReload} close={handleCloseUpdate} data={activeData} />
            }
            {
                isOpenCreation && <CreateNotificationDialog close={handleCloseCreation} reload={handleReload} />
            }
            {activeData && isOpenView && <NotificationDialogView data={activeData} close={() => { setActiveData(null); setIsOpenView(false) }} />}
            {activeData && isOpenPublish && <PublishDialogNotificationComfirm data={activeData} reload={handleReload} groups={groups} close={() => { setActiveData(null); setIsOpenPublish(false) }} />}
            {activeData && isOpenDelete && <DeleteNotificationDialog data={activeData} reload={handleReload} close={() => { setActiveData(null); setIsOpenDelete(false) }} />}
        </div>
    )
};

export default NotificationView;
