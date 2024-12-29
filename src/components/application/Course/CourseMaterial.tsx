import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Plus, FileText } from "lucide-react";
import { File as FileType } from "@/redux/StoreType";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import AddFormFile from "./AddFormFile";
import { saveAs } from 'file-saver';

const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'pdf':
            return <FileText size={18} className="text-red-500" />;
        case 'doc':
        case 'docx':
            return <FileText size={18} className="text-blue-600" />;
        default:
            return <FileText size={18} className="text-slate-500" />;
    }
};

const CourseMaterial = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const { assignments, isLoading } = useSelector((state: RootState) => state.assignment);
    const [isAddFormFile, setIsAddFormFile] = useState(false)
    const handleCloseAddFile = () => setIsAddFormFile(false)


    const handleGetData = async () => {
        await dispatch(globalThis.$action.loadAssignments({
            query: {
                groupId: param.id,
            }
        }));
    };

    const handleOpenFormFile = () => {
        setIsAddFormFile(true)
    }

    const handleDownload = async (url: string, fileName: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            saveAs(blob, fileName);
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <div className="flex gap-4 flex-col w-full">
            <div className="h-fit w-full rounded-[12px] bg-white shadow-sm flex items-center justify-end gap-4">
                <Button className="h-[48px] w-fit"
                    onClick={handleOpenFormFile}>
                    <Plus />
                    <span>Thêm tài liệu</span>
                </Button>
            </div>
            {isLoading ? (
                <div className="w-full h-[500px] bg-slate-200 animate-pulse rounded-sm" />
            ) : assignments && assignments.length > 0 && assignments.map((item) => (
                <div key={item._id} className="mb-4 space-y-4 flex-1">
                    <Accordion type="single" collapsible className="">
                        {item.files && item.files.length > 0 ? (
                            <AccordionItem
                                className="border border-slate-500/20 p-2 rounded-[8px]"
                                value={item._id}
                            >
                                <AccordionTrigger className="font-medium text-lg hover:no-underline">
                                    <span className="uppercase font-semibold">{item.title}</span>
                                </AccordionTrigger>
                                {item.files.map((file: FileType, index) => (
                                    <AccordionContent key={index}>
                                        <Separator />
                                        <div className="p-4 flex flex-col gap-4 items-start">
                                            <div className="flex items-center justify-start gap-4 pt-4 text-slate-500 px-4">
                                                {getFileIcon(file.name)}
                                                <button
                                                    onClick={() => handleDownload(file.url!, file.name!)}
                                                    className="hover:underline text-blue-600 cursor-pointer"
                                                >
                                                    {file.name}
                                                </button>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                ))}
                            </AccordionItem>
                        ) : (
                            <p className="text-gray-500">Không có tài liệu</p>
                        )}
                    </Accordion>
                </div>
            )
            )}


            {
                isAddFormFile ?
                    <AddFormFile
                        reload={handleGetData}
                        close={handleCloseAddFile}
                        isOpen={isAddFormFile}
                        triggerElement={<></>}
                    /> : null
            }
        </div>
    );
};

export default CourseMaterial;
