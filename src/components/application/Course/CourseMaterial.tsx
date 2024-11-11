import { RootState } from "@/redux/store";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { File, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import RatingTask from "@/components/common/RatingTask";
import { File as FileType, Section } from "@/redux/StoreType";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

const CourseMaterial = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const { assginments, isLoading } = useSelector((state: RootState) => state.assginment);

    const handleGetData = async () => {
        await dispatch(globalThis.$action.loadAssginments({
            query: {
                groupId: param.id,
            }
        }));
    };

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <div className="flex gap-4 w-full">
            <Accordion type="single" collapsible className="space-y-4 flex-1">
                {isLoading ? (
                    <div className="w-full h-[500px] bg-slate-200 animate-pulse rounded-sm" />
                ) : (
                    assginments && assginments.length > 0 ? (
                        <div>
                            {assginments.map((item) => (
                                <div key={item._id} className="mb-4">
                                    <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                                    <p className="mb-4 text-gray-600">{item.description}</p>
                                    {item.sections && item.sections.length > 0 ? (
                                        <AccordionItem
                                            className="border border-slate-500/20 p-2 rounded-[8px]"
                                            value={item._id}
                                        >
                                            {item.sections.map((section, sectionIndex) => (
                                                <Fragment key={section._id}>
                                                    <AccordionTrigger className="font-medium text-lg hover:no-underline">
                                                        <span className="uppercase font-semibold">{section.name}</span>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <Separator />
                                                        {section.files && section.files.length > 0 ? (
                                                            <div className="p-4 flex flex-col gap-4 items-start">
                                                                {section.files.map((file: FileType) => (
                                                                    <div key={file._id} className="flex items-center justify-start gap-4 pt-4 text-slate-500 px-4">
                                                                        <File size={18} />
                                                                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                                                                            {file.name}
                                                                        </a>
                                                                    </div>
                                                                ))}
                                                                {/* <Separator
                                                                    className={cn(
                                                                        "bg-slate-500/20",
                                                                        sectionIndex === item.sections.length - 1 && "hidden"
                                                                    )}
                                                                /> */}
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-500">Không có tài liệu</p>
                                                        )}
                                                    </AccordionContent>
                                                </Fragment>
                                            ))}
                                        </AccordionItem>
                                    ) : (
                                        <p className="text-gray-500">Không có sections</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : null
                )}
            </Accordion>

            <div className="h-fit w-1/3 rounded-[12px] bg-white shadow-sm flex flex-col gap-4">
                <Button className="h-[48px] w-full">
                    <Plus />
                    <span>Thêm tài liệu</span>
                </Button>
                <RatingTask />
            </div>
        </div>
    );
};

export default CourseMaterial;
