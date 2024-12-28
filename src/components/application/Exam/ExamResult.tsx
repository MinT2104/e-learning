import { Button } from "@/components/ui/button"
import { useParams, useNavigate } from "react-router-dom";
import ExamService from "@/services/exam.service";
import { useEffect, useState } from "react";
import { ExamType, QuestionType } from "@/redux/StoreType";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AnswerService from "@/services/answer.service";
import { cn } from "@/lib/utils";

interface AnswerData {
    answerId: string;
    correctId: string;
}

interface ExamAnswer {
    examId: string;
    data: AnswerData[];
}

export const ExamResult = () => {
    const examService = new ExamService('exam');
    const answerService = new AnswerService('answer');
    const { id } = useParams();
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [exam, setExam] = useState<ExamType | null>(null);
    const [userAnswers, setUserAnswers] = useState<ExamAnswer[] | null>(null);
    const [teacherAnswers, setTeacherAnswers] = useState<ExamAnswer[] | null>(null);
    const navigate = useNavigate();

    const getExam = async () => {
        const res = await examService.getById(id || '');
        console.log(res);
        if (res) {
            setExam(res as ExamType);

        }
    }

    const getUserAnswers = async () => {
        const res: any = await answerService.loadAllWithPaging({
            query: {
                examId: id || '',
                studentId: authUser?._id
            }
        });
        if (res?.records?.rows) {
            setUserAnswers(res.records.rows as ExamAnswer[]);
        }
    }


    const handleLoadExamAnswers = async () => {
        const res: any = await answerService.loadAllWithPaging({
            query: {
                examId: exam?.examIdCore
            }
        });
        if (res?.records) {
            const data = res.records.rows
            setTeacherAnswers(data as ExamAnswer[]);
        }
    }

    useEffect(() => {
        if (!exam) return;
        handleLoadExamAnswers();
    }, [exam]);

    useEffect(() => {
        getExam();
        getUserAnswers();
    }, []);

    const formatTime = (minutes: number): string => {
        return `${Math.floor(minutes)} phút`;
    };


    const handleExit = () => {
        navigate('/examinations');
    };

    const ANSWER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

    console.log(userAnswers);

    return (
        <div className={cn("h-screen w-[100vw] overflow-y-auto bg-slate-200 pt-20 px-4")}>
            <div className="h-20 bg-white px-4 flex items-center fixed top-0 left-0 z-50 p-2 shadow-[0_2px_10px_rgba(0,0,0,0.1)] w-full">
                <div className="flex-1 flex items-center gap-4 justify-center max-w-[1200px] mx-auto">
                    <div className="flex items-center gap-2">
                        <p className="text-xl font-semibold">{exam?.name} ({exam?.groupData?.title})</p>
                    </div>
                </div>
            </div>
            {
                exam ?
                    <div className={cn("max-w-[1200px] mx-auto mt-4 flex items-start justify-between gap-2 mb-10", exam?.isViewTestAfterExam ? "" : "items-center h-[calc(100vh_-_136px)]")}>
                        {
                            exam?.isViewTestAfterExam ? (
                                <div className="flex items-center gap-2 w-2/3 h-fit bg-transparent flex-col">
                                    {exam?.examData?.map((item: QuestionType, index: number) => (
                                        <div key={index} className="flex flex-col gap-2 w-full bg-white rounded-sm pt-4">
                                            <div className="flex gap-1 items-start text-base font-medium mb-2 px-4">
                                                <span className="text-nowrap">{index + 1}.</span>
                                                <span dangerouslySetInnerHTML={{ __html: item.content || '' }} />
                                            </div>

                                            {item.answer.map((data: any, ansIndex: number) => (
                                                <div key={ansIndex} className="flex items-center justify-start h-fit gap-2 text-sm px-4">
                                                    <div className="h-fit mt-1">
                                                        <span className="font-medium">{ANSWER_LETTERS[ansIndex]}.</span>
                                                    </div>
                                                    <div className="h-fit">
                                                        <span className="text-base font-light" dangerouslySetInnerHTML={{ __html: data.value || '' }} />
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="flex items-center gap-4 w-full bg-primary p-2 px-4">
                                                <span className="text-sm font-medium text-white">Đáp án của bạn: </span>
                                                <div className="h-fit mt-1 flex gap-2">
                                                    {ANSWER_LETTERS.slice(0, item.answer.length).map((letter, answerIndex) => {
                                                        const studentAnswer = userAnswers?.[0]?.data?.find(ans =>
                                                            ans.answerId === item._id
                                                        );
                                                        const teacherAnswer = teacherAnswers?.[0]?.data?.find(ans =>
                                                            ans.answerId === item._id
                                                        );

                                                        const isStudentSelected = studentAnswer?.correctId === item.answer[answerIndex].id;
                                                        const isTeacherSelected = teacherAnswer?.correctId === item.answer[answerIndex].id;

                                                        let buttonStyle = 'bg-white text-gray-700 border-gray-300';

                                                        if (isStudentSelected) {
                                                            if (exam?.isViewAnswerAfterExam) {
                                                                if (isTeacherSelected) {
                                                                    buttonStyle = 'bg-green-500 text-white border-green-500';
                                                                } else {
                                                                    buttonStyle = 'bg-red-500 text-white border-red-500';
                                                                }
                                                            } else {
                                                                buttonStyle = 'bg-orange-300 text-white border-orange-300';
                                                            }
                                                        } else if (exam?.isViewAnswerAfterExam && isTeacherSelected) {
                                                            buttonStyle = 'bg-green-200 text-green-700 border-green-500';
                                                        }

                                                        return (
                                                            <div
                                                                key={answerIndex}
                                                                className={`font-normal h-8 w-8 min-w-8 aspect-square rounded-full 
                                                    flex items-center justify-center border transition-colors
                                                    ${buttonStyle}`}
                                                            >
                                                                {letter}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                            </div>
                                            {exam?.isViewAnswerAfterExam ? (
                                                <div className="mt-2 flex items-center gap-4 px-4 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                        <span className="text-sm text-gray-600">Đáp án đúng</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                        <span className="text-sm text-gray-600">Đáp án sai</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="mt-2 flex items-center gap-4 px-4 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-orange-300"></div>
                                                        <span className="text-sm text-gray-600">Đáp án đã chọn</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }


                        <div className="w-1/3 bg-white rounded-sm shadow-sm sticky right-0 top-4 mx-auto">
                            <div className="p-6 border-b">
                                <h1 className="text-2xl font-bold text-gray-800">Kết quả bài kiểm tra</h1>
                            </div>

                            <div className="p-6 space-y-4 border-b">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-blue-50 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-600">Điểm số</span>
                                    </div>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {userAnswers ? exam?.totalScore : 0}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-green-50 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-600">Thời gian làm bài</span>
                                    </div>
                                    <span className="text-lg font-semibold text-green-600">
                                        {userAnswers && exam?.time && exam?.submittedTime
                                            ? formatTime(Number(exam.time) - Number(exam.submittedTime))
                                            : "0:00"}
                                    </span>
                                </div>
                            </div>

                            {
                                exam?.isViewTestAfterExam ? <>
                                    <div className="p-6">
                                        <h2 className="text-sm font-semibold text-gray-600 mb-4">Tổng quan câu trả lời</h2>
                                        <div className="grid grid-cols-5 gap-2">
                                            {exam?.examData?.map((item, index) => {
                                                const isAnswered = userAnswers ? userAnswers[0]?.data?.some(ans => ans.answerId === item._id) : false;

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`
                                            flex items-center justify-center
                                            h-10 rounded-md transition-all duration-200
                                            ${isAnswered
                                                                ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600'
                                                                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-blue-300'
                                                            }
                                        `}
                                                    >
                                                        <span className={`text-sm ${isAnswered ? 'font-medium' : 'font-normal'}`}>
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gray-50 rounded-b-lg border-t">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                                                <span className="text-gray-600">Đã trả lời</span>
                                            </div>
                                            <span className="font-medium">
                                                {userAnswers?.[0]?.data?.length || 0}/{exam?.examData?.length || 0}
                                            </span>
                                        </div>
                                    </div>
                                </> : null
                            }




                            <div className="p-6">
                                <Button variant={'destructive'} className="w-full" onClick={handleExit}>
                                    <span>Thoát</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}