'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { RootState } from '@/redux/store'
import { GroupType } from '@/redux/StoreType'
import GroupService from '@/services/group.service'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import CustomDropDown from '@/components/common/CustomDropDown'
import { Input } from '@/components/ui/input'

const CreateNotificationDialog = ({
    reload,
    close
}: {
    reload: any
    close: any
}) => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const groupService = new GroupService('group')
    const { authUser } = useSelector((state: RootState) => state.auth)
    const [groupData, setGroupData] = useState<{ key: string, name: string }[]>()
    const [notification, setNotification] = useState<any>({
        title: '',
        description: '',
        groupId: '',
        status: false
    })
    const [error, setError] = useState<any>({
        title: false,
        description: false,
        groupId: false
    })

    const handleChangeOpen = () => {
        setOpen((prev: any) => !prev)
        close()
    }

    const requiredFields = ['title', 'description', 'groupId']


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        let flag = 0

        requiredFields.map((item) => {
            if (!notification[item]) {
                setError((prev: any) => ({ ...prev, [item]: true }))
                flag = 1
            }
        })

        if (flag === 1) {
            return
        }

        const formatNotification = {
            ...notification,
            teacherData: {
                userId: authUser?._id,
                userName: authUser?.userName
            }
        }
        const res = await dispatch(globalThis.$action.createNotification(formatNotification))
        console.log(res)
        if (!res.error) {
            reload()
            close()
        }
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

    useEffect(() => {
        handleLoadGroup()
    }, [])

    const handleGroupChange = (data: { key: string, name: string }) => {
        setNotification((prev: any) => {
            return {
                ...prev,
                groupId: data.key || ''
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={handleChangeOpen}>
            <DialogContent className="max-w-[360px] md:max-w-lg flex flex-col gap-4 rounded-[20px] px-[30px] z-[9999] max-h-[70%] overflow-y-auto p-6">
                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Thêm thông báo
                    </DialogTitle>
                </DialogHeader>
                <div className='w-full'>
                    <form onSubmit={(handleSubmit)} className="w-full flex flex-col gap-6 p-0 px-0" action="#" method="POST">
                        <div className="w-full col-span-1 flex flex-col gap-2">
                            <span className="text-sm text-slate-600">Môn học *</span>
                            <CustomDropDown
                                onChange={handleGroupChange}
                                className="w-fit" width="w-full" isHiddenSearch
                                dropDownList={groupData || []}
                                mappedKey="key"
                                mappedLabel="name"
                                placeholder="Chọn nhóm học phần" />

                            {error.groupId && <div className="mt-2 text-sm text-red-500">Vui lòng chọn nhóm học phần</div>}
                        </div>


                        <div className="col-span-1 flex flex-col gap-2">
                            <span className="text-sm text-slate-600">Tiêu đề thông báo *</span>
                            <Input
                                onChange={(e) => setNotification((prev: any) => {
                                    return {
                                        ...prev,
                                        title: e.target.value
                                    }
                                })}
                            />
                            {error.title && <div className="mt-2 text-sm text-red-500">Vui lòng nhập tiêu đề thông báo</div>}

                        </div>
                        <div className="col-span-1 flex flex-col gap-2">
                            <span className="text-sm text-slate-600">Nội dung thông báo *</span>
                            <Textarea
                                rows={5}
                                onChange={(e) => setNotification((prev: any) => {
                                    return {
                                        ...prev,
                                        description: e.target.value
                                    }
                                })}
                            />
                            {error.description && <div className="mt-2 text-sm text-red-500">Vui lòng nhập nội dung thông báo</div>}
                        </div>

                        <div className='flex justify-end gap-2'>
                            <Button type='button' variant='outline' className='w-full' onClick={handleChangeOpen}>Hủy</Button>
                            <Button type='submit' variant='default' className='w-full'>Xác nhận</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNotificationDialog
