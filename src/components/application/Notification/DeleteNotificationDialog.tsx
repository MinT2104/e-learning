'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const DeleteNotificationDialog = ({
    // className,
    reload,
    data,
    close
}: {
    className?: string
    reload: any
    data: any
    close: any
}) => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()

    const handleChangeOpen = () => {
        setOpen((prev) => !prev)
        close()
    }

    const handleSubmit = async () => {
        const res = await dispatch(globalThis.$action.deleteNotification({ _id: data._id }))
        console.log(res)
        if (!res.error) {
            reload()
            close()
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleChangeOpen}>
            <DialogContent className="max-w-[360px] md:max-w-lg flex flex-col gap-4 rounded-[20px] px-[30px] z-[9999] max-h-[70%] overflow-y-auto p-0">
                <DialogHeader className="px-6 mt-10">
                    <DialogTitle className="font-bold text-lg md:text-2xl text-left flex items-center justify-center flex-col gap-4">
                        <span className="text-primary text-[28px] font-medium text-center">
                            Xóa thông báo?
                        </span>
                        <div className="flex w-full justify-between items-center gap-2">
                            <p className="text-base font-normal text-center mx-auto">
                                Hành động này sẽ không thể thu hồi
                            </p>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <DialogFooter
                    className='mt-auto bg-white p-4'>
                    <Button variant="outline" className='w-40' onClick={handleChangeOpen}>
                        Hủy
                    </Button>
                    <Button variant="default" className='w-40' onClick={handleSubmit}>
                        Đồng ý
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteNotificationDialog
