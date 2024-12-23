'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'

const NotificationDialogView = ({
    // className,
    data,
    close
}: {
    className?: string
    data: any
    close: any
}) => {
    const [open, setOpen] = useState(true)

    const handleChangeOpen = () => {
        setOpen((prev) => !prev)
        close()
    }
    return (
        <Dialog open={open} onOpenChange={handleChangeOpen}>
            <DialogContent className="max-w-[360px] md:max-w-xl flex flex-col gap-4 rounded-[20px] px-[30px] z-[9999] max-h-[70%] overflow-y-auto p-0">
                <DialogHeader className="px-6 mt-10">
                    <DialogTitle className="font-bold text-lg md:text-2xl text-left flex items-center justify-center flex-col gap-4">
                        <span className="text-primary text-[28px] font-medium">
                            Thông báo
                        </span>
                        <div className="flex w-full justify-between items-center gap-2">
                            <p className="text-xl font-medium text-left">
                                {data.title}
                            </p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6 col-span-2 mb-6 px-6">
                    <div className="flex w-full gap-10">
                        <p className="text-base font-normal text-left">{data.description}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default NotificationDialogView
