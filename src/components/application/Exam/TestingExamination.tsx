import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useParams, useNavigate } from "react-router-dom";
import ExamService from "@/services/exam.service";
import { useEffect, useState } from "react";
import { ExamType, QuestionType } from "@/redux/StoreType";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "@/hooks/use-toast";

interface AnswerData {
    answerId: string;
    correctId: string;
}

interface ExamAnswer {
    examId: string;
    data: AnswerData[];
}

export const TestingExamination = () => {
    const examService = new ExamService('exam');
    const { id } = useParams();
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [exam, setExam] = useState<ExamType | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(() => {
        const savedTime = localStorage.getItem(`exam_time_${id}`);
        return savedTime ? parseInt(savedTime) : 0;
    });
    const navigate = useNavigate();
    const [userAnswers, setUserAnswers] = useState<ExamAnswer>({
        examId: id || '',
        data: []
    });

    const getExam = async () => {
        const res = await examService.getById(id || '');
        console.log(res);
        if (res) {
            setExam(res as ExamType);
            localStorage.setItem('current_exam_id', id || '');

            if (!localStorage.getItem(`exam_time_${id}`)) {
                const examTime = (res as ExamType).time;
                setTimeLeft(examTime * 60);
                localStorage.setItem(`exam_time_${id}`, (examTime * 60).toString());
            }
        }
    }

    useEffect(() => {
        getExam();
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) return;

        localStorage.setItem(`exam_time_${id}`, timeLeft.toString());

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime <= 1 ? 0 : prevTime - 1;
                localStorage.setItem(`exam_time_${id}`, newTime.toString());
                if (newTime <= 0) {
                    clearInterval(intervalId);
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, id]);

    useEffect(() => {
        return () => {
            localStorage.removeItem('current_exam_id');
        };
    }, []);

    useEffect(() => {
        const savedAnswers = localStorage.getItem(`exam_answers_${id}`);
        if (savedAnswers) {
            setUserAnswers(JSON.parse(savedAnswers));
        }
    }, [id]);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };


    const handleExit = () => {
        localStorage.removeItem(`exam_time_${id}`);
        localStorage.removeItem(`exam_answers_${id}`);
        localStorage.removeItem('current_exam_id');
        navigate('/examinations');
    };

    const ANSWER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

    const handleAnswerSelect = (questionId: string, answer: string) => {
        console.log('Question ID:', questionId);
        console.log('Selected Answer:', answer);

        const newData = [...userAnswers.data];
        const existingAnswerIndex = newData.findIndex(a => a.answerId === questionId);

        if (existingAnswerIndex !== -1) {
            newData[existingAnswerIndex].correctId = answer;
        } else {
            newData.push({
                answerId: questionId,
                correctId: answer
            });
        }

        const updatedAnswers = {
            examId: id || '',
            data: newData
        };

        setUserAnswers(updatedAnswers);
        localStorage.setItem(`exam_answers_${id}`, JSON.stringify(updatedAnswers));

    };

    const handleClearAnswer = (questionId: string) => {
        const newData = userAnswers.data.filter(a => a.answerId !== questionId);
        const updatedAnswers = {
            examId: id || '',
            data: newData
        };
        setUserAnswers(updatedAnswers);
        localStorage.setItem(`exam_answers_${id}`, JSON.stringify(updatedAnswers));
    };

    const handleSubmit = async () => {
        const studentExamData = {
            ...exam,
            submittedTime: exam?.time ? exam.time - (timeLeft / 60) : 0,
            totalScore: 0,
            userId: "",
            studentId: authUser?._id,
        }
        const res: any = await examService.createStudentExam({ studentExamData, userAnswers });
        if (res.message) {
            toast({
                title: res.message,
                variant: 'default',
            });
            handleExit();
        }
    };

    const TimerComponent = () => {
        return (
            <span className="text-sm text-gray-500">
                Thời gian còn lại: {formatTime(timeLeft)}
            </span>
        );
    };

    return (
        <div className="h-screen w-[100vw] overflow-y-auto bg-slate-200 pt-20 px-4">
            <div className="h-20 bg-white px-4 flex items-center fixed top-0 left-0 z-50 p-2 shadow-[0_2px_10px_rgba(0,0,0,0.1)] w-full">
                <div className="flex-1 flex items-center gap-4 justify-between max-w-[1200px] mx-auto">
                    <Button variant={'destructive'} className="" onClick={handleExit}>
                        <ArrowLeft />
                        <span>Thoát</span>
                    </Button>
                    <div className="flex items-center gap-2">
                        <p className="text-xl font-semibold">{exam?.name} ({exam?.groupData?.title})</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <TimerComponent />
                        <Button variant={'default'} className="" onClick={handleSubmit}>
                            Nộp bài
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto mt-4 flex items-start justify-between gap-2 mb-10">
                <div className="flex items-center gap-2 w-2/3 h-fit bg-transparent flex-col">
                    {
                        exam && exam?.examData && exam?.examData?.length > 0 && exam?.examData.map((item: QuestionType, index: number) => {
                            return (
                                <div className="flex flex-col gap-2 w-full bg-white rounded-sm pt-4 truncate">
                                    <div className="flex gap-1 items-start text-base font-medium mb-2 px-4">
                                        <span className=" text-nowrap">{index + 1}.</span>
                                        <span dangerouslySetInnerHTML={{ __html: item.content || '' }} />
                                    </div>
                                    {item && item.answer.length > 0 && item?.answer?.map((data: any, index: number) => {
                                        return (
                                            <div className="flex items-center justify-start h-fit gap-2 text-sm px-4">
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
                                    <div className="flex items-center gap-4 w-full bg-primary p-2 px-4">
                                        <span className="text-sm font-medium text-white">Đáp án của bạn: </span>
                                        <div className="h-fit mt-1 flex gap-2">
                                            {ANSWER_LETTERS.slice(0, item.answer.length).map((letter, index) => (
                                                <div
                                                    key={index}
                                                    className={`font-normal h-8 w-8 min-w-8 aspect-square rounded-full flex items-center cursor-pointer justify-center border
                                                        ${userAnswers?.data?.find(a => a.answerId === item._id)?.correctId === item.answer[index].id
                                                            ? 'bg-orange-300 text-white border-orange-300'
                                                            : 'bg-white hover:bg-orange-300 hover:text-white border-gray-300'
                                                        }`}
                                                    onClick={() => handleAnswerSelect(item._id!, item.answer[index].id)}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={userAnswers?.data?.find(a => a.answerId === item._id)?.correctId === item.answer[index].id}
                                                        onChange={() => { }}
                                                    />
                                                    <div className="flex items-center justify-center">
                                                        {letter}
                                                    </div>
                                                </div>
                                            ))}
                                            {userAnswers?.data?.find(a => a.answerId === item._id) && (
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 px-2 text-white hover:text-red-500 hover:bg-white"
                                                    onClick={() => handleClearAnswer(item._id!)}
                                                >
                                                    Xóa
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="items-center gap-2 w-1/3 bg-white p-4 rounded-sm sticky right-0 top-4 grid grid-cols-5">
                    {
                        exam && exam?.examData && exam?.examData?.length > 0 && exam?.examData.map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-2 p-1 justify-center rounded-sm cursor-pointer border w-full border-primary
                                    ${userAnswers?.data?.find(a => a.answerId === item._id)
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-primary'
                                    }`}
                            >
                                <p className="text-sm font-normal">{index + 1}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}