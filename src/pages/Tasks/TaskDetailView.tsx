import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/redux/store";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import { cn } from "@/lib/utils";


const TaskDetailView = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const { assginment, isLoading } = useSelector((state: RootState) => state.assginment);

    const handleCall: any = async () => {
        const res = await dispatch(globalThis.$action.getAssginment(param.id));
        console.log(res);
        console.log(param)
    };
    useEffect(() => {
        handleCall();
    }, []);

    if (isLoading) {
        return <div className='flex items-center justify-center mt-20'><Skeleton className="w-[100px] h-[40px] grid-cols-1 md:grid-cols-3 gap-6" />
        </div>;
    } else return (

        <div className="flex gap-4 w-full">
            <Accordion type="single" collapsible className="space-y-4 flex-1">
                {assginment.sections && assginment?.sections?.length > 0 && assginment.sections?.map((data) => {
                    return (
                        <AccordionItem
                            className="border border-slate-500/20 p-2 rounded-[8px]"
                            value={data._id}>
                            <AccordionTrigger className="font-medium text-lg hover:no-underline">
                                <span className="uppercase">{data.name}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Separator />
                                <div className="p-4 flex flex-col gap-4 items-start">
                                    {data.files && data.files.length > 0 && data.files.map((file, index) => {
                                        return (
                                            <Fragment key={file._id}>
                                                <div className="flex items-center justify-start gap-4 pt-4 text-slate-500 px-4">
                                                    <File size={18} />
                                                    <span>{file.name}</span>
                                                </div>
                                                <Separator className={cn("bg-slate-500/20",
                                                    data.files && index === data?.files?.length - 1 && 'hidden'

                                                )} />
                                            </Fragment>
                                        )
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}

            </Accordion>

            <div className="h-80 w-1/3 border rounded-[12px] bg-white shadow-sm">

            </div>

        </div>
    )
}

export default TaskDetailView
