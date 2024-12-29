import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { Filter, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomDropDown from "@/components/common/CustomDropDown";
import GroupService from "@/services/group.service";
import { ExamType, GroupType } from "@/redux/StoreType";
import ExamList from "@/components/application/Exam/ExamList";
import { useNavigate } from "react-router-dom";
import ExamService from "@/services/exam.service";

const ExamView = () => {
    const groupService = new GroupService('group')
    const examService = new ExamService('exam')
    const navigate = useNavigate()
    const [query, setQuery] = useState({
        page: 1, limit: 5,
        query: {}
    })
    const [groupData, setGroupData] = useState<{ key: string, name: string }[]>()
    const { authUser } = useSelector((state: RootState) => state.auth)
    const [exam, setExam] = useState<ExamType[]>([])


    const handleLoadGroup = async () => {
        const query = {
            page: 1,
            limit: 100,
            query: {
                ...(authUser?.role === 'teacher' ? { 'teacherData.userId': authUser?._id } : {
                    _id: {
                        $in: authUser?.courseIds
                    }
                })
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
    const mockCategories = [
        {
            label: 'Mới nhất',
            key: "newest"
        },
        {
            label: 'Cũ hơn',
            key: "oldest"
        },
    ]

    const handleLoadExamData = async () => {

        const res: any = await examService.loadAllWithPaging({
            ...query,
            query: {
                ...(authUser?.role === 'teacher' ? { 'userId': authUser?._id } : {
                    'groupData.groupId': {
                        $in: authUser?.courseIds,
                    },
                    studentId: authUser?._id || ''
                }),
                ...query.query,
                ...(authUser?.role === 'student' ? { role: authUser?.role } : {})
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
        handleLoadExamData()
    }, [query]);

    const handleGroupChange = (data: { key: string, name: string }) => {
        setQuery((prev) => {
            return {
                ...prev,
                query: {
                    ...prev.query,
                    ...(
                        authUser?.role === 'teacher' ? { 'groupData.groupId': data.key } : {
                            'groupData.groupId': data.key
                        }
                    )
                }
            }
        })
    }


    const handleChangeSort = (data: { key: string, name: string }) => {
        setQuery((prev) => {

            return {
                ...prev,
                query: {
                    ...prev.query,
                    sort: data.key === 'newest' ? JSON.stringify({ createdAt: -1 }) : JSON.stringify({ createdAt: 1 })
                }
            }
        })
    }

    const handleClearFilter = () => {
        const query = {
            page: 1,
            limit: 5,
            query: {}
        }
        setQuery(query)
    }

    return (
        <div>
            <Heading title='Quản lý đề thi' />
            <div className='flex h-[56px] w-full justify-between mt-10'>
                <div className="flex gap-2 items-center w-2/3">
                    <div
                        onClick={handleClearFilter}
                        className="relative p-2 border rounded-sm  border-red-500 cursor-pointer">
                        <div className="absolute top-0 left-0 w-[2px] h-2/3 translate-y-2 rotate-[90deg] translate-x-5 bg-red-500 z-10" />
                        <Filter />
                    </div>
                    <CustomDropDown onChange={handleGroupChange} className="w-fit" width="w-80" dropDownList={groupData || []} mappedKey="key" mappedLabel="name" placeholder="Chọn nhóm học phần" />
                    <CustomDropDown isHiddenSearch onChange={handleChangeSort} className='w-fit' dropDownList={mockCategories} placeholder="Tất cả" />

                    {/* <div className="w-1/3 border border-border rounded-lg truncate flex h-[48px] items-center">
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
                    </div> */}
                </div>
                {
                    authUser?.role === 'teacher' ? (
                        <div className="flex items-center gap-3 mb-2">
                            <Button onClick={() => navigate('/examinations/create')} className="h-[48px]">
                                <Plus />
                                <span>Tạo đề thi mới</span>
                            </Button>
                        </div>
                    ) : null
                }
            </div>
            <ExamList exams={exam || []} reload={handleLoadExamData} />
        </div>
    )
};

export default ExamView;
