import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { AssignmentType } from '@/redux/StoreType';
import { useEffect } from "react";
import TaskCard from './TaskCard';

const TaskView: React.FC = () => {
    const dispatch = useDispatch();
    const { assginments, isLoading } = useSelector((state: RootState) => state.assginment);

    const handleCallAss: any = async () => {
        const res = await dispatch(globalThis.$action.loadAssginments({ page: 1, limit: 5 }));
        console.log(res);
    };

    useEffect(() => {
        handleCallAss();
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto pb-8 h-fit">
                <h1 className="text-[24px] font-bold mb-6">Khóa học của bạn</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {assginments && assginments.length > 0 ? (
                        assginments.map((_, index) => (
                            <div key={index} className="flex flex-col space-y-3">
                                <Skeleton className="h-[176px] w-full rounded-lg animate-pulse" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px] animate-pulse" />
                                    <Skeleton className="h-4 w-[200px] animate-pulse" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        );
    } else return (
        <div className="container mx-auto pb-8 h-fit">
            <h1 className="text-[24px] font-bold mb-6">Khóa học của bạn</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assginments.map((course: AssignmentType) => (
                    <TaskCard {...course} key={course.courseId} />
                ))}
            </div>
        </div>
    );
};

export default TaskView;
