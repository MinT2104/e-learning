import { Bell, Search } from "lucide-react";
import { Button } from "../ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Header = () => {
    return (
        <header
            className="w-full h-20 bg-white px-4 flex items-center fixed top-0 left-0 z-50 p-2 pr-12 pl-[300px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            <div className="rounded-full p-1 px-4 border flex items-center gap-2 border-slate-500/20 w-1/3 focus-within:border-primary group">
                <Search size={18} className="text-slate-400" />
                <input placeholder="Tìm kiếm khóa học, bài viết, video, ..." className="flex-1 border-none shadow-none outline-none h-9 text-sm text-slate-700" />
            </div>
            <div className="flex-1 flex items-center gap-10 justify-end">
                <Button variant={'link'} className="font-bold text-sm px-0">Khóa học của bạn</Button>
                <Bell className="text-slate-500 cursor-pointer" />

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
