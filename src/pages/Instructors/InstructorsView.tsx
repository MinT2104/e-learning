"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";

const AppointmentScheduler = () => {
    const [date, setDate] = useState<Date | undefined>(undefined); // Sử dụng undefined thay cho null

    const handleDateChange = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
    };

    const handleSubmit = () => {
        if (date) {
            // Xử lý logic gửi lịch hẹn đến giáo viên ở đây
            toast({
                title: "Hẹn lịch thành công!",
                description: `Bạn đã chọn ngày: ${date.toDateString()}`,
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
            <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
            />
            <Button onClick={handleSubmit}>Xác Nhận Lịch</Button>
        </div>
    );
};

export default AppointmentScheduler;
