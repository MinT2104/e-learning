import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropDown from "@/components/common/CustomDropDown";
import GroupService from "@/services/group.service";
import { ExamType, GroupType } from "@/redux/StoreType";
import ExamList from "@/components/application/Exam/ExamList";
import { useNavigate } from "react-router-dom";
import ExamService from "@/services/exam.service";

const ExamView = () => {
    const groupService = new GroupService('group')
    const examService = new ExamService('exam')
    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate()
    const [query, setQuery] = useState({
        page: 1, limit: 5,
        query: {}
    })
    const [groupData, setGroupData] = useState<{ key: string, name: string }[]>()
    const dispatch = useDispatch();
    const { authUser } = useSelector((state: RootState) => state.auth)
    const [exam, setExam] = useState<ExamType[]>([])
    const handleLoadQuestions = async () => {
        await dispatch(globalThis.$action.loadQuestions({
            ...query, query: {
                ...query.query,
                'userId': authUser._id
            }
        }))
    }

    const handleLoadGroup = async () => {
        const query = {
            page: 1,
            limit: 100,
            query: {
                'teacherData.userId': authUser?._id
            }
        }
        const res: any = await groupService.loadAllWithPaging(query)
        if (res?.records) {
            const group: GroupType[] = res?.records?.rows
            const formatData: { name: string, key: string }[] = []
            group.map((item) => {
                const { title } = item.courseData
                const name = title + " (" + item.title + ")"
                const key = item._id
                formatData.push({
                    name, key
                })
            })
            setGroupData(formatData)
        }
    }

    const handleLoadExamData = async () => {
        // const query = {
        //     page: 1,
        //     limit: 5,
        //     query: {
        //         'userId': authUser?._id
        //     }
        // }
        const res: any = await examService.loadAllWithPaging({
            ...query,
            query: {
                ...query.query,
                'userId': authUser?._id
            }
        })
        if (res?.records) {
            const exam: ExamType[] = res?.records?.rows
            setExam(exam)
        }
    }

    useEffect(() => {
        handleLoadGroup()
    }, [])

    useEffect(() => {
        handleLoadQuestions();
        handleLoadExamData()
    }, [query]);

    const handleGroupChange = (data: { key: string, name: string }) => {
        setQuery((prev) => {
            return {
                ...prev,
                query: {
                    ...prev.query,
                    'groupData.groupId': data.key || ''
                }
            }
        })
    }

    return (
        <div>
            <Heading title='Quản lý đề thi' />
            <div className='flex h-[56px] w-full justify-between mt-10'>
                <div className="flex gap-2 items-center w-2/3">
                    <CustomDropDown onChange={handleGroupChange} className="w-fit" width="w-80" isHiddenSearch dropDownList={groupData || []} mappedKey="key" mappedLabel="name" placeholder="Chọn nhóm học phần" />
                    <div className="w-1/3 border border-border rounded-lg truncate flex h-[48px] items-center">
                        <Input
                            id="search"
                            name="search"
                            type="text"
                            autoComplete="search"
                            defaultValue={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={cn('border-none rounded-none h-[48px]')}
                            placeholder="Tìm kiếm đề thì"
                        />

                        <div className='border-l border-slate-200 aspect-square h-[56px] flex items-center justify-center text-slate-500'>
                            <Search size={20} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <Button onClick={() => navigate('/examinations/create')} className="h-[48px]">
                        <Plus />
                        <span>Tạo đề thi mới</span>
                    </Button>
                </div>
            </div>
            <ExamList exams={exam || []} />
        </div>
    )
};

export default ExamView;
