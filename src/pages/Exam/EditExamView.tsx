"use client";
import Heading from "@/components/common/Heading";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ExamType, QuestionType } from "@/redux/StoreType";
import ExamService from "@/services/exam.service";
import EditExamFormStep1 from "@/components/application/Exam/EditExamForm.step1";
import EditExamFormStep2 from "@/components/application/Exam/EditExamFormStep2";


const EditExamView = () => {
    const { id: examId } = useParams()
    const examService = new ExamService('exam')
    const navigate = useNavigate()
    const params = useSearchParams()
    const [step, setStep] = useState(0)
    const [dataStep1, setDataStep1] = useState<any>()

    function getStepValue(search: string) {
        const regex = /[?&]step=(\d+)/; // Hỗ trợ cả ?step= và &step=
        const match = search.match(regex);
        return match ? match[1] : null; // Trả về giá trị hoặc null nếu không tìm thấy
    }

    useEffect(() => {
        if (params) {
            const step = getStepValue(location.search)
            if (step) {
                setStep(+step)
            }
        }
    }, [params])

    useEffect(() => {
        if (!getStepValue(location.search)) {
            navigate(location.pathname + '?step=1')
        }
    }, [])

    const handleChangeStep1 = (data: any) => {
        if (!data) return
        setDataStep1(data)
        navigate(location.pathname + '?step=2')
    }

    const handleChangeStep2 = async (data: QuestionType[]) => {
        if (!data) return
        const dataRequest = {
            ...dataStep1,
            examData: [...data]
        }
        console.log(dataRequest)
        const resUpdateStudentExam = await examService.updateStudentExam(dataRequest)
        if (resUpdateStudentExam) {
            navigate('/examinations')
        }
    }

    const handleLoadExamData = async (examId: string) => {
        const res: any = await examService.getById(examId)
        console.log(res)
        if (res) {
            const exam: ExamType = res
            setDataStep1(exam)
        }
    }

    useEffect(() => {
        if (!examId) return

        handleLoadExamData(examId)
    }, [examId])

    return (
        <div>
            <div className="flex gap-4 items-center">
                <ArrowLeft className="cursor-pointer" onClick={() => navigate('/examinations')} size={30} />
                <Heading title='Chỉnh sửa bài kiểm tra' />
            </div>
            {
                step === 1 ?
                    <EditExamFormStep1 data={dataStep1} onChange={handleChangeStep1} />
                    : null
            }

            {
                step === 2 ?
                    <EditExamFormStep2 dataStep1={dataStep1} dataStep2={dataStep1.examData || undefined} onChange={handleChangeStep2} />
                    : null
            }
        </div>
    )
};

export default EditExamView;
