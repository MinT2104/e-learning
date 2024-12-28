'use client'
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { ImportStudents } from './ImportStudents'

const UserImportDialog = ({
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
    console.log(data)
    const handleChangeOpen = () => {
        setOpen((prev) => !prev)
        close()
        reload()
    }


    return (
        <Dialog open={open} onOpenChange={handleChangeOpen}>
            <DialogContent className="max-w-[360px] md:max-w-lg flex flex-col gap-4 rounded-[20px] px-[30px] z-[9999] max-h-[70%] overflow-y-auto p-0">
                <ImportStudents />
            </DialogContent>
        </Dialog>
    )
}

export default UserImportDialog
