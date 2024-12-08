"use client";
import Heading from "@/components/common/Heading";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from 'react-router-dom';
import CreateExamFormStep1 from "@/components/application/Exam/CreateExamFormStep1";
import CreateExamFormStep2 from "@/components/application/Exam/CreateExamFormStep2";
import { QuestionType } from "@/redux/StoreType";
import ExamService from "@/services/exam.service";


const CreateExamView = () => {
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
        const res = await examService.createExam(dataRequest)
        if (res) {
            navigate('/examinations')
        }
        // data.forEach((item) => {
        //     const { answer } = item
        //     answer.forEach((element: any) => {
        //         if (element.isTrue === true) {
        //             listCorrectAnswer.push({
        //                 answerId: item._id,
        //                 correctId: element.id

        //             })
        //         }
        //     });
        // })
    }

    return (
        <div>
            <div className="flex gap-4 items-center">
                <ArrowLeft className="cursor-pointer" onClick={() => navigate('/examinations')} size={30} />
                <Heading title='Tạo bài kiểm tra mới' />
            </div>
            {
                step === 1 ?
                    <CreateExamFormStep1 data={dataStep1} onChange={handleChangeStep1} />
                    : null
            }

            {
                step === 2 ?
                    <CreateExamFormStep2 dataStep1={dataStep1} onChange={handleChangeStep2} />
                    : null
            }
        </div>
    )
};

export default CreateExamView;
