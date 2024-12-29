'use client'
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { ImportClass } from './ImportClass'

const ClassImportDialog = ({
    // className,
    reload,
    close
}: {
    reload: any
    close: any
}) => {
    const [open, setOpen] = useState(true)
    const handleChangeOpen = () => {
        setOpen((prev) => !prev)
        close()
        reload()
    }


    return (
        <Dialog open={open} onOpenChange={handleChangeOpen}>
            <DialogContent className="max-w-[360px] md:max-w-lg flex flex-col gap-4 rounded-[20px] px-[30px] z-[9999] max-h-[70%] overflow-y-auto p-0">
                <ImportClass />
            </DialogContent>
        </Dialog>
    )
}

export default ClassImportDialog
