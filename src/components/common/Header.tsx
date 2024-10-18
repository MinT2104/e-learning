import { Bell, CircleUserRound, Search } from "lucide-react";
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
// import { useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logOut } from "@/lib/utils";

export const Header = () => {

    const navigate = useNavigate()

    const { authUser } = useSelector((state: RootState) => state.user)

    // const [isPopupOpen, setIsPopupOpen] = useState(false);
    // const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // function handleCourse(): void {
    //     setIsPopupOpen(!isPopupOpen); // Bật hoặc tắt pop-up
    // }

    // function handleNotification(): void {
    //     setIsNotificationOpen(!isNotificationOpen); // Bật hoặc tắt thông báo
    // }

    return (
        <header
            className="w-full h-20 bg-white px-4 flex items-center fixed top-0 left-0 z-50 p-2 pr-12 pl-[300px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            <div className="rounded-full p-1 px-4 border flex items-center gap-2 border-slate-500/20 w-1/3 focus-within:border-primary group">
                <Search size={18} className="text-slate-400" />
                <input placeholder="Tìm kiếm khóa học, bài viết, video, ..." className="flex-1 border-none shadow-none outline-none h-9 text-sm text-slate-700" />
            </div>
            <div className="flex-1 flex items-center gap-2 justify-end">
                {/* <Button variant={'link'} className="font-bold text-sm px-0"
                    onClick={() => handleNofication()}>Khóa học của bạn</Button>
                <Bell className="text-slate-500 cursor-pointer" /> */}
                {/* <Button variant={'link'} className="font-bold text-sm px-0" onClick={handleCourse}>
                    Khóa học của tôi
                </Button> */}

                {
                    authUser ?
                        (
                            <>
                                {/* Khóa học */}
                                <div className="flex items-center gap-10 justify-end">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="font-bold text-sm shadow-none text-slate-500">
                                                Khóa học của bạn
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64 bg-white shadow-lg rounded-md mr-36 p-4 z-50">
                                            <h4 className="text-lg font-semibold mb-2">Khóa học của tôi</h4>
                                            <ul>
                                                <li className="text-slate-500 py-3 cursor-pointer">Khóa học 1</li>
                                                <Separator className="bg-gray-200 h-[1px] my-2" />
                                                <li className="text-slate-500 py-3 cursor-pointer">Khóa học 2</li>
                                                <Separator className="bg-gray-200 h-[1px] my-2" />
                                                <li className="text-slate-500 py-3 cursor-pointer">Khóa học 3</li>
                                                <Separator className="bg-gray-200 h-[1px] my-2" />
                                            </ul>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                {/* Thông báo */}
                                <div className="flex items-center gap-10 justify-center shadow-none mr-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="hover:text-primary">
                                                <Bell className="text-slate-500 hover:text-primary" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80 mr-32">
                                            <div className="grid gap-4 p-2">
                                                <h4 className="font-medium leading-none">Thông báo</h4>
                                                <ul className="text-sm text-muted-foreground mr-2">
                                                    <li className="text-slate-500 py-3 cursor-pointer">Thông báo 1: Bạn đã đăng ký khóa học ABC</li>
                                                    <Separator className="bg-gray-200 h-[1px] my-2" />
                                                    <li className="text-slate-500 py-3 cursor-pointer">Thông báo 2: Khoá học XYZ sắp bắt đầu</li>
                                                    <Separator className="bg-gray-200 h-[1px] my-2" />
                                                    <li className="text-slate-500 py-3 cursor-pointer">Thông báo 3: Cập nhật tài liệu khóa học DEF</li>
                                                    <Separator className="bg-gray-200 h-[1px] my-2" />
                                                </ul>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="w-10 h-10 rounded-full bg-secondary text-xl flex items-center justify-center border relative cursor-pointer">
                                        {
                                            authUser?.image ?
                                                <img src={authUser?.image} className="w-10 h-10 rounded-full" alt="" />
                                                : <p className="font-semibold text-primary uppercase border">{authUser?.userName?.slice(0, 1)}</p>
                                        }
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="border-border/20 w-60">
                                        <DropdownMenuLabel>
                                            <div className="py-2">
                                                <span className="text-normal">{authUser.email}</span>
                                                <p className="font-light text-[12px] text-slate-500/80">@{authUser.userName}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => navigate('/profile')}
                                            className="text-slate-500 py-3 cursor-pointer">Trang cá nhân</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-slate-500 py-3 cursor-pointer">Viết blog</DropdownMenuItem>
                                        <DropdownMenuItem className="text-slate-500 py-3 cursor-pointer">Bài viết của bạn</DropdownMenuItem>
                                        <DropdownMenuItem className="text-slate-500 py-3 cursor-pointer">Bài viết đã lưu</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => logOut()}
                                            className="text-slate-500 py-3 cursor-pointer">Đăng xuất</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )
                        :
                        (
                            <Link className="flex items-center gap-2 font-medium cursor-pointer " to="/login">
                                <CircleUserRound className="" />
                                <span className="lg:inline hidden">Thành viên</span>
                            </Link>
                        )
                }
            </div>
        </header>
    )
};
