import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { QuestionType } from "@/redux/StoreType";
import { Input } from "@/components/ui/input";
import CustomDropDown from "@/components/common/CustomDropDown";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDown, ArrowUp, OctagonX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type EditExamFormStep2Type = {
    onChange: any
    dataStep1: any
    dataStep2: QuestionType[]
}

const mockDataLevel = [
    {
        label: 'Dễ',
        key: 1
    },
    {
        label: 'Trung bình',
        key: 2
    },
    {
        label: 'Khó',
        key: 3
    }
]

const EditExamFormStep2 = ({ onChange, dataStep1, dataStep2 }: EditExamFormStep2Type) => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState({
        page: 1, limit: 9999, query: {}
    })
    const navigate = useNavigate()
    const [listDataExam, setListDataExam] = useState<any[]>()
    const [activeListIds, setActiveListIds] = useState<string[]>([])
    const { questions } = useSelector((state: RootState) => state.question)

    const handleSubmit = async () => {
        onChange(listDataExam)
    }


    const handleLoadQuestions = async (id: string) => {
        await dispatch(globalThis.$action.loadQuestions({
            ...query, query: {
                ...query.query,
                'userId': authUser._id,
                'courseData.courseId': id

            }
        }))
    }


    useEffect(() => {
        if (!dataStep1) return
        const courseId = dataStep1?.courseData?.courseId || ''
        handleLoadQuestions(courseId)
    }, [dataStep1, query])

    const handleSelectLevel = (data: { label: string, id: string }) => {
        setQuery((prev: any) => {
            return {
                ...prev,
                query: {
                    difficulty: {
                        $in: [data.label]
                    }
                }
            }
        })
    }

    const mappedLevel = (data: string) => {
        switch (data) {
            case 'Trung bình':
                return "TB"
            default:
                return data
        }
    }

    const handleChecked = (value: string) => {
        if (!activeListIds.includes(value)) {
            setActiveListIds((prev) => [...prev, value])
        } else {
            setActiveListIds((prev) => {
                const filtered = prev.filter((item) => item !== value)
                return [...filtered]
            })

        }
    }

    const customSort = (index: number, direction: string) => {
        const newArray = [...activeListIds];

        // Kiểm tra điều kiện và hoán đổi phần tử
        if (direction === "up" && index > 0) {
            // Hoán đổi với phần tử trước (tăng vị trí)
            [newArray[index], newArray[index - 1]] = [newArray[index - 1], newArray[index]];
        } else if (direction === "down" && index < activeListIds.length - 1) {
            // Hoán đổi với phần tử sau (giảm vị trí)
            [newArray[index], newArray[index + 1]] = [newArray[index + 1], newArray[index]];
        } else {
            console.warn("Không thể di chuyển phần tử ngoài giới hạn.");
        }

        setActiveListIds(newArray);
    };

    useEffect(() => {
        if (!activeListIds) return
        const localData: any = []
        activeListIds.forEach((item) => {
            questions.forEach((dt) => {
                if (dt._id === item) {
                    localData.push(dt)
                }
            })
        })
        setListDataExam(localData)
    }, [activeListIds])

    useEffect(() => {
        if (!dataStep2) return

        const listIds: string[] = []
        dataStep2.forEach((element: QuestionType) => {
            listIds.push(element._id || '')
        });
        setActiveListIds(listIds)
    }, [dataStep2])

    return (
        <div className="flex gap-4 h-full">

            <div className="flex-1 flex flex-col gap-6">
                <div className="flex my-4 font-bold text-xl gap-2 items-center">
                    <span>Số lượng câu hỏi:</span>
                    <span className="aspect-square text-primary">{listDataExam ? listDataExam.length : 0}</span>
                </div>
                {
                    listDataExam && listDataExam.length > 0 && listDataExam.map((item: QuestionType, index: number) => {
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
                                <div className="h-fit rounded-sm p-4 flex flex-col gap-2 w-fit pt-0">
                                    <button disabled={index === 0} className="bg-primary text-white p-2 rounded-full disabled:bg-gray-400">
                                        <ArrowUp size={14} onClick={() => customSort(index, 'up')} />
                                    </button>
                                    <button disabled={index === (activeListIds.length - 1)} className="bg-primary text-white p-2 rounded-full disabled:bg-gray-400">
                                        <ArrowDown size={14} onClick={() => customSort(index, 'down')} />
                                    </button>
                                    <button className="bg-primary text-white p-2 rounded-full disabled:bg-gray-400">
                                        <OctagonX size={14} onClick={() => handleChecked(item._id || '')} />
                                    </button>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            <div
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 4px'
                }}
                className="max-w-[400px] min-w-[400px] rounded-sm px-[25px] py-[30px] flex flex-col gap-4 h-full sticky top-[20px]">
                <div className=" flex flex-col gap-2 w-full">
                    <Button
                        type="button"
                        variant={'outline'}
                        onClick={() => navigate('/examinations')}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSubmit}
                    >
                        Lưu thay đổi
                    </Button>
                </div>
                <h1 className="font-medium text-xl">Danh sách câu hỏi</h1>
                <Input
                    value={search}
                    id="search"
                    onChange={(e) => setSearch(e.target.value)}
                    name="search"
                    className="authInput"
                    type="texxt" />

                <CustomDropDown
                    isHiddenSearch
                    dropDownList={mockDataLevel}
                    mappedKey="key"
                    mappedLabel="label"
                    placeholder="Chọn độ khó"
                    onChange={handleSelectLevel}
                />
                <div className="w-full flex flex-col gap-2">
                    {questions && questions.length > 0 && questions.map((item) => {
                        return (
                            <div className="rounded border p-2">
                                <div className="flex items-start space-x-2">
                                    <Checkbox checked={activeListIds.includes(item._id || '')} onClick={() => handleChecked(item._id || '')} className="mt-1" id="terms" />
                                    < div className="flex-1" dangerouslySetInnerHTML={{ __html: item.content || '' }} />
                                    <div>
                                        <span className="text-[10px] bg-primary p-1 text-white rounded-full">
                                            {mappedLevel(item.difficulty || "")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

export default EditExamFormStep2;
