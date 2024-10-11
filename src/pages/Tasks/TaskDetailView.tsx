import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


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

        <div>
            {JSON.stringify(assginment.sections)}
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default TaskDetailView
