import { cn } from "@/lib/utils";
import { AlarmClockPlus, Hourglass, Layers } from "lucide-react";
import { ExamType } from "@/redux/StoreType";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
type ExamStudentCardType = {
    item: ExamType,
    isClosed: boolean,
    isActive: boolean,
    isNotStarted: boolean,
    mappedDate: (date: string) => string,
    mappedName: string,
}

export const ExamStudentCard = ({ item, isClosed, isActive, isNotStarted, mappedDate, mappedName }: ExamStudentCardType) => {

    const navigate = useNavigate();
    return (
        <div
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 4px'
            }}
            className={cn(
                "h-full w-full bg-white rounded-sm border border-l-4 py-[30px] px-[25px] flex justify-between",
                isClosed ? 'border-l-red-500' : isActive ? 'border-l-green-500' : 'border-l-gray-500'
            )}
            key={item._id}
        >
            <div className="flex flex-col gap-1 justify-between w-full">
                <div className="flex flex-col gap-2 items-start mb-4">
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
                    <h1 className="font-medium text-xl">{item?.name || ''}</h1>

                </div>
                <div className="flex items-center gap-2 text-sm mb-2">
                    <Layers size={14} />
                    <span className="font-bold">{mappedName}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                    <div className="pt-1">
                        <AlarmClockPlus size={14} />
                    </div>
                    <span>Diễn ra từ {mappedDate(item.dateStart)}<br /> đến {mappedDate(item.dateEnd)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                    <Hourglass size={14} />
                    <span className="text-primary font-medium">{item.time} phút làm bài</span>
                </div>
                {
                    !item.studentId ? (
                        <Button onClick={() => navigate(`/examinations/testing/${item._id}`)} disabled={isClosed} className="w-full mt-4">
                            Bắt đầu làm bài
                        </Button>
                    ) : (
                        <Button onClick={() => navigate(`/examinations/result/${item._id}`)} variant="outline" className="w-full mt-4">
                            Xem chi tiết
                        </Button>
                    )
                }

            </div>
        </div>
    )
};
