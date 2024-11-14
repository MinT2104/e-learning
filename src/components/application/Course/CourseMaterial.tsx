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
import { File, Plus } from "lucide-react";
import RatingTask from "@/components/common/RatingTask";
import { File as FileType } from "@/redux/StoreType";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import AddFormFile from "./AddFormFile";

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
    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <div className="flex gap-4 w-full">
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
                                                <File size={18} />
                                                <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                                                    {file.name}
                                                </a>
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

            <div className="h-fit w-1/3 rounded-[12px] bg-white shadow-sm flex flex-col gap-4">
                <Button className="h-[48px] w-full"
                    onClick={handleOpenFormFile}>
                    <Plus />
                    <span>Thêm tài liệu</span>
                </Button>
                <RatingTask />
            </div>
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
