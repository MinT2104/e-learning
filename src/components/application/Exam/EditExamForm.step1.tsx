import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from "moment"
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import CustomDropDown from "@/components/common/CustomDropDown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { GroupType } from "@/redux/StoreType";
import GroupService from "@/services/group.service";

type EditExamFormStep1Type = {
    onChange: any;
    data: any
}

const EditExamFormStep1 = ({ onChange, data }: EditExamFormStep1Type) => {
    const { isLoading, authUser } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate()
    const groupService = new GroupService('group')
    const [groupData, setGroupData] = useState<{ key: string, name: string }[]>()
    const [originalGroup, setOriginalGroup] = useState<GroupType[] | undefined>()


    const [auth, setAuth] = useState({
        name: '',
        dateStart: '',
        time: '',
        dateEnd: '',
        description: '',
        isViewAnswerAfterExam: false,
        isViewTestAfterExam: false,
        courseData: undefined,
        groupData: undefined,
        status: 1
    });
    const [error, setError] = useState({
        name: false,
        dateStart: false,
        time: false,
        dateEnd: false,
        groupData: false
    });

    const handleChangeAuth = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setAuth((prev) => ({ ...prev, [name]: value }));
    };


    const requireKey = [
        'name',
        'dateStart',
        'dateEnd',
        'time',
        'groupData'
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formatData = {
            ...auth,
            userId: authUser?._id || ''
        }
        let flag = 0

        requireKey.forEach((item) => {
            if (!(formatData as any)[item]) {
                setError((prev) => ({
                    ...prev,
                    [item]: true
                }))
                flag++
            } else {
                setError((prev) => ({
                    ...prev,
                    [item]: false
                }))
            }
        })

        if (!flag) {
            onChange(formatData)
        }
    }

    const handleChangeDate = (data: any, key: string) => {
        if (!data) return
        setAuth((prev) => {
            return {
                ...prev,
                [key]: moment(data?.value).toISOString()
            }
        })
    }

    const handleChangeChecked = (key: string) => {
        if (!key) return
        setAuth((prev: any) => {
            return {
                ...prev,
                [key]: !prev[key]
            }
        })
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
            setOriginalGroup(group)
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

    const handleChangeGroupData = (data: { name: string, key: string }) => {
        const filterdGroup: GroupType | undefined = originalGroup?.find((item) => item._id === data.key)
        if (filterdGroup) {
            setAuth((prev: any) => {
                return {
                    ...prev,
                    courseData: filterdGroup.courseData,
                    groupData: {
                        groupId: filterdGroup._id,
                        title: filterdGroup.title
                    }
                }
            })
        }
    }

    useEffect(() => {
        handleLoadGroup()
    }, [])

    useEffect(() => {
        if (!data) return

        setAuth(data)
    }, [data])

    return (
        <div className="flex gap-4">
            <form onSubmit={handleSubmit} className="w-full py-8 grid grid-cols-2 gap-x-10 h-fit m-4 p-0 px-0 gap-2" action="#" method="POST">
                <div className="w-full col-span-2">
                    <span className="text-sm text-slate-600">Tên bài kiểm tra *</span>
                    <div className="mt-2 relative truncate mb-2">
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            disabled={isLoading}
                            onFocus={() => setError((prev) => ({ ...prev, name: false }))}
                            autoComplete="name"
                            defaultValue={auth.name}
                            onChange={handleChangeAuth}
                            className={cn('authInput', error.name && 'redBorder')}
                            placeholder="Nhập tên bài kiểm tra"
                        />
                        {error.name ? <span className='text-red-500 text-[12px]'>Vui lòng chọn điền tên bài kiểm tra</span> : null}

                    </div>
                </div>

                <div className="w-full col-span-2">
                    <span className="text-sm text-slate-600">Mô tả bài kiểm tra</span>
                    <div className="mt-2 relative truncate mb-2">
                        <Textarea
                            rows={10}
                            id="description"
                            name="description"
                            disabled={isLoading}
                            onFocus={() => setError((prev) => ({ ...prev, description: false }))}
                            autoComplete="description"
                            defaultValue={auth.description}
                            onChange={handleChangeAuth}
                            className={cn('authInput')}
                            placeholder="Nhập vào mô tả bài kiểm tra"
                        />
                    </div>
                </div>

                <div className="w-full col-span-1">
                    <span className="text-sm text-slate-600">Thời Gian bắt đầu *</span>
                    <div className="mt-2 relative truncate mb-2">
                        <DateTimePickerComponent value={new Date(auth.dateStart)} min={new Date()} id="datetimepickerstart" placeholder="Chọn thời gian bắt đầu" onChange={(data: any) => handleChangeDate(data, 'dateStart')} />
                    </div>
                    {error.dateStart ? <span className='text-red-500 text-[12px]'>Vui lòng nhập ngày bắt đầu</span> : null}
                </div>

                <div className="w-full col-span-1">
                    <span className="text-sm text-slate-600">Thời Gian kết thúc *</span>
                    <div className="mt-2 relative truncate mb-2">
                        <DateTimePickerComponent value={new Date(auth.dateEnd)} min={new Date()} id="datetimepickerend" placeholder="Chọn thời gian bắt đầu" onChange={(data: any) => handleChangeDate(data, 'dateEnd')} />
                    </div>
                    {error.dateEnd ? <span className='text-red-500 text-[12px]'>Vui lòng nhập ngày kết thúc</span> : null}
                </div>
                <div className="w-full col-span-2">
                    <span className="text-sm text-slate-600">Thời gian làm bài *</span>
                    <div className="mt-2 relative truncate mb-2">
                        <Input
                            value={auth.time}
                            id="time"
                            onChange={handleChangeAuth}
                            onFocus={() => setError((prev) => ({ ...prev, description: false }))}
                            name="time"
                            className="authInput"
                            type="number" min={0} />
                    </div>
                    {error.time ? <span className='text-red-500 text-[12px]'>Vui lòng nhập thời gian làm</span> : null}
                </div>

                <div className="w-full col-span-2">
                    <span className="text-sm text-slate-600">Nhóm học phần *</span>
                    <div className="mt-2 relative truncate mb-2">
                        <CustomDropDown data={(auth?.groupData as any)?.groupId || ''} onChange={handleChangeGroupData} className="w-full" width="w-full" isHiddenSearch dropDownList={groupData || []} mappedKey="key" mappedLabel="name" placeholder="Chọn nhóm học phần" />
                    </div>
                    {error.groupData ? <span className='text-red-500 text-[12px]'>Vui lòng chọn lớp học phần</span> : null}
                </div>

                <div className=" flex justify-end mt-12 gap-4 col-span-2 w-full">
                    <Button
                        type="button"
                        className="w-40"
                        variant={'outline'}
                        onClick={() => navigate('/examinations')}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                    >
                        Tiếp tục chỉnh sửa
                    </Button>
                </div>
            </form>
            <div
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 4px'
                }}
                className="min-w-[400px] rounded-sm px-[25px] py-[30px] h-fit flex flex-col gap-4 sticky top-[20px]">
                <h1 className="font-medium text-xl">Bảng điều khiển</h1>
                <div className="flex items-center space-x-2 font-light">
                    <Switch onClick={() => handleChangeChecked('isViewAnswerAfterExam')} checked={auth.isViewAnswerAfterExam} id="viewAnswerAfterExam" />
                    <Label htmlFor="viewAnswerAfterExam">Xem đáp án sau khi thi xong</Label>
                </div>
                <div className="flex items-center space-x-2 font-light">
                    <Switch onClick={() => handleChangeChecked('isViewTestAfterExam')} checked={auth.isViewTestAfterExam} id="ViewTestAfterExam" />
                    <Label htmlFor="ViewTestAfterExam">Xem bài sau khi thi xong</Label>
                </div>
            </div>
        </div>
    )
};

export default EditExamFormStep1;
