
import CustomDropDown from '@/components/common/CustomDropDown'
import CustomTooltip from '@/components/common/CustomTooltip'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { RootState } from '@/redux/store'
import GroupService from '@/services/group.service'
import { Info, MoreHorizontal, X } from 'lucide-react'
import { FormEvent, ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomTable from '@/components/common/CustomTable'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { QuestionType } from '@/redux/StoreType'
import { title } from 'process'
import { cloneDeep } from 'lodash'

// const modules = {
//     toolbar: [
//         [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//         [{ size: [] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' },
//         { 'indent': '-1' }, { 'indent': '+1' }],
//         ['link', 'image', 'video'],
//         ['clean']
//     ],
//     clipboard: {
//         // toggle to add extra line breaks when pasting HTML:
//         matchVisual: false,
//     }
// }

// const formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image', 'video'
// ]

const UpdateAnswer = ({
    triggerElement,
    className,
    isOpen,
    close,
    reload,
    activeData
}: {
    triggerElement: ReactNode
    className?: string;
    isOpen: boolean;
    close: () => void;
    reload: () => void;
    activeData: QuestionType | undefined;
}) => {

    let initValue = {
        title: '',
        description: '',
        courseId: '',
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

    const [classDetail, setClassDetail] = useState(initValue);
    const { authUser } = useSelector((state: RootState) => state.auth)
    const [userListCourse, setUserListCourse] = useState<any[]>([])
    const [activeAnswer, setActiveAnswer] = useState('')
    // const handleChangeClassDetail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setClassDetail((prev) => ({ ...prev, [name]: value }));
    // };

    const [question, setQuestion] = useState<any>({
        userId: undefined,
        content: undefined,
        difficulty: undefined,
        courseData: undefined,
        answer: undefined
    })

    const [answer, setAnswer] = useState<any>([])

    const [answerValue, setAnswerValue] = useState('')

    const handleCheck = (value: string) => {
        if (activeAnswer === value) {
            setActiveAnswer('')
            return
        }
        setActiveAnswer(value)
    }

    type answerType = {
        id: string,
        value: string;
        isTrue: boolean
    }

    const columns: ColumnDef<answerType>[] = [
        {
            header: 'STT',
            accessorKey: 'index',
            cell: ({ row }) => (
                <div className="cursor-pointer flex justify-start items-center h-[40px]">
                    Câu trả lời thứ {row.index + 1}
                </div>
            ),
            size: 100
        },
        {
            header: "Nội dung",
            accessorKey: "value",
            cell: ({ row }) => {
                const { value } = row.original
                return (
                    <div dangerouslySetInnerHTML={{ __html: value }} className="cursor-pointer flex justify-start items-center h-[40px] gap-2">
                    </div>
                )
            }
        },
        {
            header: "Đáp án đúng",
            accessorKey: "isTrue",
            cell: ({ row }) => {
                const { id } = row.original
                return (
                    <div className="cursor-pointer flex justify-start items-center h-[40px] gap-2">
                        <Checkbox id='check' checked={activeAnswer === id} />
                        <label onClick={() => handleCheck(id)} htmlFor="check">Đáp án đúng</label>
                    </div>
                )
            }
        },
        {
            id: "actions",
            header: "Hành động",
            cell: ({ row }) => {
                return (
                    <div className="cursor-pointer flex justify-center items-center h-[40px]">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-8 h-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='z-[9999]'>
                                <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => {
                                        // setIsOpen(true);
                                        // setActiveData(row.original);
                                        handleModifyQuestions();
                                        // setActiveId(id);
                                    }}
                                >
                                    <div className="w-full h-[48px] cursor-pointer hover:bg-secondary flex items-center justify-center">
                                        <span>Chỉnh sửa</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleDelete(row.original.id)}
                                >
                                    <div className="w-full h-[48px] cursor-pointer hover:bg-secondary flex items-center justify-center">
                                        <span>Xóa</span>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
            size: 200,
        },
    ];

    const [error, setError] = useState({
        content: false,
        answer: false,
        difficulty: false,
        courseData: false
    });
    const [isAddAnswer, setIsAddAnswer] = useState(false)
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const groupService = new GroupService('group')

    const handleLoadGroup = async () => {
        const query = {
            query: {
                'teacherData.userId': authUser?._id
            }
        }
        const res: any = await groupService.getUserListCourse(query)
        if (res) {
            setUserListCourse(res)
        }
    }

    const requiredFields = ['content', 'difficulty', 'courseData']

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const cloneAnswers = cloneDeep(answer)
        const formatAnswer = cloneAnswers.map((item: any) => {
            if (item.id === activeAnswer) {
                item['isTrue'] = true
                return item
            } else {
                item['isTrue'] = false
                return item
            }
        })
        const dataRequest = {
            ...question,
            userId: authUser._id,
            content: value ? value : undefined,
            answer: formatAnswer.length > 0 ? [...formatAnswer] : undefined,
            _id: activeData?._id || ""
        }
        let flag1 = 0

        requiredFields.forEach((item) => {
            if (!dataRequest[item]) {
                setError((prev) => {
                    return {
                        ...prev,
                        [item]: true
                    }
                })
                flag1 += 1
            } else {
                setError((prev) => {
                    return {
                        ...prev,
                        [item]: false
                    }
                })
            }
        })

        if (!flag1) {
            const res = await dispatch(globalThis.$action.updateQuestion(dataRequest))
            console.log(res)
            if (res.payload) {
                close()
                reload()
            }
        }
    }

    const handleAddAnswer = () => {
        const dataRequest: any = {
            id: (answer.length + 1).toString(),
            value: answerValue,
            isTrue: false
        }
        setAnswer((prev: any) => [...prev, dataRequest])
        setIsAddAnswer(false)
        setAnswerValue('')
    }
    useEffect(() => {
        handleLoadGroup()
    }, [])

    const handleSelectCoure = (data: { title: string, courseId: string }) => {
        setQuestion((prev: any) => {
            return {
                ...prev,
                courseData: data
            }
        })
    }


    const handleSelectLevel = (data: { label: string, id: string }) => {
        setQuestion((prev: any) => {
            return {
                ...prev,
                difficulty: data.label
            }
        })
    }

    const handleCancelAddAnswer = () => {
        setIsAddAnswer(false)
        setAnswerValue('')
    }

    const handleDelete = (id: string) => {
        setAnswer((prev: any) => prev.filter((item: any) => item.id !== id));
    };

    const handleModifyQuestions = () => {
        console.log("here")
    }
    useEffect(() => {
        if (!activeData) return
        const { answer, content, difficulty, userId, courseData } = activeData
        setQuestion({ answer, content, difficulty, userId, courseData })
        setValue(content ? content : '')
        setAnswer(answer ? answer : [])
        const activeAnswer = answer.find((item: any) => item.isTrue == true)?.id || ""
        setActiveAnswer(activeAnswer)
        console.log(activeData)
    }, [activeData])

    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-2xl text-black rounded-[20px] z-[9995] max-h-[80%] overflow-y-scroll">
                <div className='flex justify-end w-full cursor-pointer'>
                    <X onClick={close} />
                </div>

                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Chỉnh sửa câu trả lời
                    </DialogTitle>
                    <DialogDescription className="text-lg text-left">
                        Chỉnh sửa thông tin câu tra lời
                    </DialogDescription>
                </DialogHeader>
                <div className='w-full'>
                    <form onSubmit={(handleSubmit)} className="w-full grid grid-cols-2 gap-6  p-0 px-0" action="#" method="POST">
                        {/* <div className="w-full col-span-1">
                            <span className="text-sm text-slate-600">Môn học *</span>
                            <CustomDropDown
                                data={question?.courseData?.courseId || ""}
                                isHiddenSearch
                                dropDownList={userListCourse}
                                mappedKey="courseId"
                                mappedLabel="title"
                                placeholder="Chọn Môn học"
                                onChange={handleSelectCoure}
                            />
                            {error.courseData && <div className="mt-2 text-sm text-red-500">Vui lòng chọn môn học</div>}
                        </div> */}
                        {/* <div className="col-span-1">
                            <span className="text-sm text-slate-600">Chọn độ khó *</span>
                            <CustomDropDown
                                data={
                                    mockDataLevel.find(item => item.label == question?.difficulty)?.key || ""
                                }
                                isHiddenSearch
                                dropDownList={mockDataLevel}
                                mappedKey="key"
                                mappedLabel="label"
                                placeholder="Chọn độ khó"
                                onChange={handleSelectLevel}
                            />
                            {error.difficulty && <div className="mt-2 text-sm text-red-500">Vui lòng chọn độ khó</div>}
                        </div> */}

                        <div className="col-span-2">
                            <span className="text-sm text-slate-600">Nội dung câu trả lời *</span>
                            <ReactQuill
                                // modules={modules}
                                // formats={formats}
                                className='rounded-[6px]'
                                theme="snow"
                                value={value}
                                onChange={setValue} />
                            {error.content && <div className="mt-2 text-sm text-red-500">Vui lòng điền câu hỏi</div>}

                        </div>

                        <div className="col-span-2 flex flex-col gap-2">
                            <div className='w-full flex items-center justify-between'>
                                <span className="text-sm text-slate-600">Đáp án</span>
                                <Button type='button' onClick={() => setIsAddAnswer(true)} className='h-[32px]'>Thêm đáp án</Button>
                            </div>
                            <CustomTable data={answer} columns={columns} loading={false} />
                            {
                                isAddAnswer &&
                                <div className='mt-4'>
                                    <ReactQuill
                                        // modules={modules}
                                        // formats={formats}
                                        className='rounded-[6px]' theme="snow" value={answerValue} onChange={setAnswerValue} />
                                    <div className='flex items-center gap-2'>
                                        <Button type='button' onClick={handleCancelAddAnswer} className='h-[32px] mt-4' variant={'outline'}>Hủy</Button>
                                        <Button type='button' onClick={handleAddAnswer} className='h-[32px] mt-4'>Hoàn tất</Button>
                                    </div>

                                </div>
                            }
                        </div>

                        <div className='flex justify-end col-span-2'>
                            <Button>Xác nhận</Button>
                        </div>
                    </form>
                </div>
            </DialogContent >
        </Dialog >
    )
}

export default UpdateAnswer
