import { cn } from "@/lib/utils";
import { ExamType } from "@/redux/StoreType";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteExamDialog from "./DeleteExamDialog";
import { ExamTeacherCard } from "./ExamTeacherCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ExamStudentCard } from "./ExamStudentCard";

type ExamListType = {
    exams: ExamType[]
    reload: any
}

const ExamList = ({ exams, reload }: ExamListType) => {

    const navigate = useNavigate();
    const [activeData, setActiveData] = useState<ExamType | null>(null)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const { authUser } = useSelector((state: RootState) => state.auth)

    const mappedDate = (date: string) => {
        return moment(date || '').format('DD/MM/YYYY, HH:mm A');
    };

    const handleDeleteExam = (data: ExamType | null) => {
        if (!data) return
        setActiveData(data)
        setIsOpenDelete(true)
    }

    const handleReload = () => {
        reload()
    }

    return (
        <div className={cn("w-full my-4 gap-6", authUser?.role === 'teacher' ? 'flex flex-col ' : 'grid grid-cols-3')}>
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
                        authUser?.role === 'teacher' ? (
                            <ExamTeacherCard
                                item={item}
                                isClosed={isClosed}
                                isActive={isActive}
                                isNotStarted={isNotStarted}
                                mappedDate={mappedDate}
                                mappedName={mappedName}
                                navigate={navigate}
                                handleDeleteExam={handleDeleteExam}
                            />
                        ) : (
                            <ExamStudentCard
                                item={item}
                                isClosed={isClosed}
                                isActive={isActive}
                                isNotStarted={isNotStarted}
                                mappedDate={mappedDate}
                                mappedName={mappedName}
                            />
                        )
                    );
                })
            }
            {activeData && isOpenDelete && <DeleteExamDialog data={activeData} reload={handleReload} close={() => { setActiveData(null); setIsOpenDelete(false) }} />}
        </div>
    );
};

export default ExamList;