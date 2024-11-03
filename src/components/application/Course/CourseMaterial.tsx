import { RootState } from "@/redux/store";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { File, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import RatingTask from "@/components/common/RatingTask";
import { File as FileType, Section } from "@/redux/StoreType";
import { Button } from "@/components/ui/button";

const CourseMaterial = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const { assginment, isLoading } = useSelector((state: RootState) => state.assginment);

    const handleCall: any = async () => {
        dispatch(globalThis.$action.getAssginment(param.id));
    };

    useEffect(() => {
        handleCall();
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto pb-8 h-fit">
                <div className="flex flex-col gap-4">
                    {assginment.sections && assginment.sections.length > 0
                        ? assginment.sections.map((_, index: number) => (
                            <Skeleton key={index} className="h-[79px] w-[761px] rounded-lg" />
                        ))
                        : Array(2).fill(0).map((_, index: number) => (
                            <Skeleton key={index} className="h-[79px] w-[761px] rounded-lg" />
                        ))}
                </div>
            </div>
        );
    } else
        return (
            <div className="flex gap-4 w-full">
                <Accordion type="single" collapsible className="space-y-4 flex-1">
                    {assginment.sections &&
                        assginment?.sections?.length > 0 &&
                        assginment.sections?.map((data: Section) => {
                            return (
                                <AccordionItem
                                    className="border border-slate-500/20 p-2 rounded-[8px]"
                                    value={data._id}
                                    key={data._id}
                                >
                                    <AccordionTrigger className="font-medium text-lg hover:no-underline">
                                        <span className="uppercase font-semibold">{data.name}</span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Separator />
                                        <div className="p-4 flex flex-col gap-4 items-start">
                                            {data.files &&
                                                data.files.length > 0 &&
                                                data.files.map((file: FileType, index: number) => {
                                                    return (
                                                        <Fragment key={file._id}>
                                                            <div className="flex items-center justify-start gap-4 pt-4 text-slate-500 px-4">
                                                                <File size={18} />
                                                                <span>{file.name}</span>
                                                            </div>
                                                            <Separator
                                                                className={cn(
                                                                    "bg-slate-500/20",
                                                                    data.files &&
                                                                    index === data?.files?.length - 1 &&
                                                                    "hidden"
                                                                )}
                                                            />
                                                        </Fragment>
                                                    );
                                                })}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
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
