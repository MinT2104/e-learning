import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExamType } from "@/redux/StoreType";
import { AlarmClockPlus, Eye, Hourglass, Layers, Pencil, X } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

type ExamListType = {
    exams: ExamType[]
}

const ExamList = ({ exams }: ExamListType) => {

    const navigate = useNavigate();

    const mappedDate = (date: string) => {
        return moment(date || '').format('DD/MM/YYYY, HH:mm A');
    };

    return (
        <div className="w-full my-4 flex flex-col gap-6">
            {
                exams && exams.length > 0 && exams.map((item) => {
                    const { courseData, groupData } = item;
                    const mappedName = courseData.title + " - " + groupData.title;

                    const now = moment();
                    const dateStart = moment(item.dateStart);
                    const dateEnd = moment(item.dateEnd);

                    const isNotStarted = now.isBefore(dateStart); // Trước ngày bắt đầu
                    const isActive = now.isBetween(dateStart, dateEnd, undefined, '[]'); // Trong khoảng ngày bắt đầu và ngày kết thúc
                    const isClosed = now.isAfter(dateEnd); // Sau ngày kết thúc

                    return (
                        <div
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 4px'
                            }}
                            className={cn(
                                "h-fit w-full bg-white rounded-sm border border-l-4 py-[30px] px-[25px] flex justify-between",
                                isClosed ? 'border-l-red-500' : isActive ? 'border-l-green-500' : 'border-l-gray-500'
                            )}
                            key={item._id}
                        >
                            <div className="flex flex-col gap-1 justify-between">
                                <div className="flex gap-2 items-center mb-4">
                                    <h1 className="font-medium text-xl">{item?.name || ''}</h1>
                                    {
                                        isNotStarted ? (
                                            <span className="text-gray-500 bg-gray-200 rounded-full px-4 py-1 text-[12px]">
                                                Chưa mở
                                            </span>
                                        ) : isClosed ? (
                                            <span className="text-red-500 bg-red-200 rounded-full px-4 py-1 text-[12px]">
                                                Đã đóng
                                            </span>
                                        ) : (
                                            <span className="text-green-500 bg-green-200 rounded-full px-4 py-1 text-[12px]">
                                                Đang mở
                                            </span>
                                        )
                                    }
                                </div>
                                <div className="flex items-center gap-2 text-sm mb-2">
                                    <Layers size={14} />
                                    <span>Giao cho nhóm học phần</span>
                                    <span className="font-bold">{mappedName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <AlarmClockPlus size={14} />
                                    <span>Diễn ra từ {mappedDate(item.dateStart)} đến {mappedDate(item.dateEnd)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm mt-2">
                                    <Hourglass size={14} />
                                    <span className="text-primary font-medium">{item.time} phút làm bài</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <Button
                                    onClick={() => navigate("/examinations/" + item._id || '')}
                                    className="h-[32px] rounded-full bg-green-500 hover:bg-green-500">
                                    <Eye size={14} />
                                    <span>Xem chi tiết</span>
                                </Button>
                                <Button
                                    onClick={() => navigate("/examinations/edit/" + item._id || '')}
                                    className="h-[32px] rounded-full">
                                    <Pencil size={14} />
                                    <span>Chỉnh sửa</span>
                                </Button>
                                <Button className="h-[32px] rounded-full bg-red-200 text-red-500 hover:bg-red-200 hover:text-red-500">
                                    <X size={14} />
                                    <span>Xóa đề</span>
                                </Button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ExamList;