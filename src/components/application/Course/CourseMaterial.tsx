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
import AddFormMaterial from "./AddFormMaterial";

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
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [isAddFormMaterial, setIsAddFormMaterial] = useState(false)

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

    const handleCloseAddMaterial = () => setIsAddFormMaterial(false)

    const handleAddChapter = () => {
        setIsAddFormMaterial(true)
    }

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <div className="flex gap-4 flex-col w-full">
            {
                authUser?.role === 'teacher' ? (
                    <div className="h-fit w-full bg-white flex items-center justify-end gap-4">
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleAddChapter}
                                className="h-[48px] w-fit">
                                <Plus />
                                <span>Thêm chương</span>
                            </Button>
                        </div>
                        <Button className="h-[48px] w-fit"
                            onClick={handleOpenFormFile}>
                            <Plus />
                            <span>Thêm tài liệu</span>
                        </Button>
                    </div>
                ) : null
            }
            {isLoading ? (
                <div className="w-full h-[500px] bg-slate-200 animate-pulse rounded-sm" />
            ) : assignments && assignments.length > 0 && assignments.map((item) => (
                <div key={item._id} className="mb-4 space-y-4 flex-1">
                    <Accordion type="single" collapsible className="">
                        {item.files ? (
                            <AccordionItem
                                className="border border-slate-500/20 p-2 rounded-[8px]"
                                value={item._id}
                            >
                                <AccordionTrigger className="font-medium text-lg hover:no-underline">
                                    <span className="uppercase font-semibold">{item.title}</span>
                                </AccordionTrigger>

                                <AccordionContent>
                                    <Separator />
                                    {item.files.length > 0 ? item.files.map((file: FileType, index) => (
                                        <div key={index} className="p-4 flex flex-col gap-4 items-start">
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
                                    )) : <div className=" h-20">
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-gray-500">Không có tài liệu</p>
                                        </div>
                                    </div>}
                                </AccordionContent>
                            </AccordionItem>
                        ) : null}
                    </Accordion>
                </div>
            )
            )}

            {
                isAddFormMaterial ?
                    <AddFormMaterial
                        reload={handleGetData}
                        close={handleCloseAddMaterial}
                        isOpen={isAddFormMaterial}
                        triggerElement={<></>}
                    /> : null
            }

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
