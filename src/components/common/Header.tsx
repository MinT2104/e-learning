import { Bell, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";

export const Header = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    function handleCourse(): void {
        setIsPopupOpen(!isPopupOpen); // Bật hoặc tắt pop-up
    }

    function handleNotification(): void {
        setIsNotificationOpen(!isNotificationOpen); // Bật hoặc tắt thông báo
    }

    return (
        <header
            className="w-full h-20 bg-white px-4 flex items-center fixed top-0 left-0 z-50 p-2 pr-12 pl-[300px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            <div className="rounded-full p-1 px-4 border flex items-center gap-2 border-slate-500/20 w-1/3 focus-within:border-primary group">
                <Search size={18} className="text-slate-400" />
                <input placeholder="Tìm kiếm khóa học, bài viết, video, ..." className="flex-1 border-none shadow-none outline-none h-9 text-sm text-slate-700" />
            </div>
            <div className="flex-1 flex items-center gap-10 justify-end">
                {/* <Button variant={'link'} className="font-bold text-sm px-0"
                    onClick={() => handleNofication()}>Khóa học của bạn</Button>
                <Bell className="text-slate-500 cursor-pointer" /> */}
                {/* <Button variant={'link'} className="font-bold text-sm px-0" onClick={handleCourse}>
                    Khóa học của tôi
                </Button> */}
                <div className="flex flex-row relative">
                    {/* Khóa học */}
                    <div className="flex-1 flex items-center gap-10 justify-end">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="font-bold text-sm px-0">
                                    Khóa học của bạn
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 bg-white shadow-lg rounded-md p-4 z-50">
                                <h4 className="text-lg font-semibold mb-2">Khóa học của tôi</h4>
                                <ul>
                                    <li className="mb-2">Khóa học 1</li>
                                    <li className="mb-2">Khóa học 2</li>
                                    <li className="mb-2">Khóa học 3</li>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {/* Thông báo */}
                    <div className="flex-1 flex items-center gap-10 justify-end ml-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="p-2">
                                    <Bell className="text-slate-500" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4 p-4">
                                    <h4 className="font-medium leading-none">Thông báo</h4>
                                    <ul className="text-sm text-muted-foreground">
                                        <li className="mb-2">Thông báo 1: Bạn đã đăng ký khóa học ABC</li>
                                        <li className="mb-2">Thông báo 2: Khoá học XYZ sắp bắt đầu</li>
                                        <li className="mb-2">Thông báo 3: Cập nhật tài liệu khóa học DEF</li>
                                    </ul>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer w-10 h-10 rounded-full bg-slate-500/20 animate-pulse" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-border/20 w-60">
                        <DropdownMenuLabel>
                            <div className="py-2">
                                <span className="text-normal">Nguyễn Minh Thắng</span>
                                <p className="font-light text-[12px] text-slate-500/80">Thangdev2104@</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-slate-500 py-3 cursor-pointer">Trang cá nhân</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-slate-500 py-3 cursor-pointer">Viết blog</DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-500 py-3 cursor-pointer">Bài viết của bạn</DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-500 py-3 cursor-pointer">Bài viết đã lưu</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-slate-500 py-3 cursor-pointer">Đăng xuất</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
};
