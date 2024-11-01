"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

const AppointmentScheduler = () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    const handleSubmit = () => {
        if (date) {
            toast({
                title: "Hẹn lịch thành công!",
                description: `Bạn đã chọn ngày: ${format(date, "PPP")}`,
            });
        } else {
            toast({
                title: "Lỗi!",
                description: "Vui lòng chọn một ngày.",
            });
        }
    };

    return (
        <div>
            <h2>Đặt Lịch Hẹn</h2>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2" />
                        {date ? format(date, "PPP") : <span>Chọn ngày</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <Button onClick={handleSubmit} className="mt-4">
                Xác Nhận Lịch
            </Button>
        </div>
    );
};

export default AppointmentScheduler;
