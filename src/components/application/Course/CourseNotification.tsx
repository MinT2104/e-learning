import { Button } from "@/components/ui/button";
import { NotificationType } from "@/redux/StoreType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomPagination from "@/components/common/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import moment from "moment";
import NotificationDialogView from "../Notification/NotificationDialogView";

const CourseMember = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const { notifications, total } = useSelector((state: RootState) => state.notification)
    const [activeNotification, setActiveNotification] = useState<NotificationType | null>(null)
    const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        query: {
            groupId: id,
            status: true
        }
    })

    const handleGetData = async () => {
        try {
            const queryWithSearch = {
                ...query,
                query: {
                    ...query.query,
                },
            };
            const res: any = await dispatch(globalThis.$action.loadNotifications(queryWithSearch));
            console.log(res)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetData();
    }, [query]);


    const handleChangePage = (value: string) => {
        setQuery((prev: any) => {
            return {
                ...prev,
                page: prev.page + value
            }
        })
    }

    const handleViewNotification = (notification: NotificationType) => {
        setActiveNotification(notification)
    }

    return (
        <div className='mx-auto pb-8 h-fit w-full flex flex-col gap-4'>
            <div className="relative truncate mb-6 w-full flex flex-col gap-4">

                <div className="flex flex-col gap-4">
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <div
                                key={notification._id || index}
                                className="border p-4 rounded-lg flex justify-between bg-gray-50 items-center hover:border-primary transition-all duration-300"
                            >
                                <div className="flex flex-col gap-1">
                                    <h3
                                        onClick={() => handleViewNotification(notification)}
                                        className="text-lg font-semibold text-gray-800 text-wrap cursor-pointer hover:text-primary transition-all duration-300">
                                        {notification.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {notification.teacherData.userName}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Ngày tạo: {moment(notification.updatedAt).format('DD/MM/YYYY')}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" onClick={() => handleViewNotification(notification)}>
                                        Xem thông báo
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Không có thông báo nào.</p>
                    )}
                </div>

                <CustomPagination onChange={handleChangePage} total={total} currentPage={query.page} pageSize={query.limit} />
            </div>
            {activeNotification && <NotificationDialogView data={activeNotification} close={() => setActiveNotification(null)} />}
        </div >
    )
};

export default CourseMember;
