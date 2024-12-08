import { ExamType, QuestionType } from "@/redux/StoreType";
import ExamService from "@/services/exam.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailExamView = () => {

    const { id: examId } = useParams()
    const examService = new ExamService('exam')
    const [exam, setExam] = useState<ExamType>()

    const handleLoadExamData = async (examId: string) => {
        const res: any = await examService.getById(examId)
        console.log(res)
        if (res) {
            const exam: ExamType = res
            setExam(exam)
        }
    }

    useEffect(() => {
        if (!examId) return

        handleLoadExamData(examId)
    }, [examId])

    return <div className="w-full h-fit">
        <div className="w-full justify-center flex"><h1 className="text-2xl font-bold">Đề kiểm tra</h1></div>
        <div className="max-w-3xl mx-auto my-10 flex flex-col gap-6">
            {
                exam && exam?.examData && exam?.examData?.length > 0 && exam?.examData.map((item: QuestionType, index: number) => {
                    return (
                        <div key={index} className="flex gap-2">
                            <ul className="flex flex-col gap-1 flex-1">
                                <div className="flex gap-1 items-start text-base font-medium mb-2">
                                    <span className=" text-nowrap">{index + 1}.</span>
                                    <span dangerouslySetInnerHTML={{ __html: item.content || '' }} />
                                </div>
                                {item && item.answer.length > 0 && item?.answer?.map((data: any, index: number) => {
                                    return (
                                        <div className="flex items-center justify-start h-fit gap-2 text-sm">
                                            <div className="h-fit mt-1">
                                                {index === 0 && <span className="font-medium">A.</span>}
                                                {index === 1 && <span className="font-medium">B.</span>}
                                                {index === 2 && <span className="font-medium">C.</span>}
                                                {index === 3 && <span className="font-medium">D.</span>}
                                                {index === 4 && <span className="font-medium">E.</span>}
                                                {index === 5 && <span className="font-medium">F.</span>}
                                            </div>
                                            <div className="h-fit">
                                                <span className="text-base font-light" dangerouslySetInnerHTML={{ __html: data.value || '' }} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>

                    )
                })


            }
        </div>
    </div>;
};

export default DetailExamView;
