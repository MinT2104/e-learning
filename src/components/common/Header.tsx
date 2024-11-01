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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { CourseType } from "@/redux/StoreType";

export const Header = () => {

    const navigate = useNavigate()

    const { authUser } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch();

    const { isLoading } = useSelector((state: RootState) => state.course);

    const [coursess, setCoursess] = useState<CourseType[]>([])

    const handleGetData: any = async () => {

        const body = {
            page: 1,
            limit: 20,
            query: {
                _id: { $in: authUser ? authUser.courseIds : [] }
            }
        }

        if (authUser && authUser.courseIds.length < 1) return

        const res = await dispatch(globalThis.$action.loadUserCourses(body));
        if (res?.payload?.records?.rows) {
            setCoursess(res.payload.records.rows)
        }
    };

    const handleLogout = async () => {
        await dispatch(globalThis.$action.logOut())
    }

    useEffect(() => {
        if (!authUser) return
        handleGetData();
    }, [authUser]);

    return (
        <header
            className="w-full h-20 bg-white px-4 flex items-center fixed top-0 left-0 z-50 p-2 pr-12 pl-[300px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            <div className="rounded-full p-1 px-4 border flex items-center gap-2 border-slate-500/20 w-1/3 focus-within:border-primary group">
                <Search size={18} className="text-slate-400" />
                <input placeholder="Tìm kiếm khóa học, bài viết, video, ..." className="flex-1 border-none shadow-none outline-none h-9 text-sm text-slate-700" />
            </div>
            <div className="flex-1 flex items-center gap-4 justify-end">
                {/* <Button variant={'link'} className="font-bold text-sm px-0 underline-0"
                    onClick={() => handleTeacher()}>For teacher</Button> */}
                {/* <Bell className="text-slate-500 cursor-pointer" /> */}
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
                                            <Button variant="outline" className="font-bold border-none text-sm shadow-none text-slate-500">
                                                Khóa học của tôi
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" className="w-[350px] bg-white border-border/20 rounded-md p-4 z-50">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-md font-medium mb-2">Khóa học của tôi</h4>
                                                <Button className="" variant={'link'}>Xem tất cả</Button>
                                            </div>
                                            <ul>
                                                {
                                                    isLoading ?
                                                        <>
                                                            <li className="py-3 cursor-pointer flex gap-4">
                                                                <div className="w-1/3 h-16 rounded-md bg-slate-200 animate-pulse" />
                                                                <div className="w-2/3 flex flex-col justify-between">
                                                                    <div className="w-full h-8 rounded-md bg-slate-200 animate-pulse" />
                                                                    <div className="w-2/3 h-6 rounded-md bg-slate-200 animate-pulse" />
                                                                </div>
                                                            </li>
                                                            <li className="py-3 cursor-pointer flex gap-4">
                                                                <div className="w-1/3 h-16 rounded-md bg-slate-200 animate-pulse" />
                                                                <div className="w-2/3 flex flex-col justify-between">
                                                                    <div className="w-full h-8 rounded-md bg-slate-200 animate-pulse" />
                                                                    <div className="w-2/3 h-6 rounded-md bg-slate-200 animate-pulse" />
                                                                </div>
                                                            </li>
                                                        </>
                                                        :
                                                        coursess && coursess.length > 0 && coursess.map((item, index) => {
                                                            return (
                                                                <li key={index} className="py-3 cursor-pointer flex gap-4">
                                                                    <div className="w-1/3 h-16 rounded-md bg-gradient-to-r from-blue-500 to-green-400" />
                                                                    <div className="w-2/3 flex flex-col justify-between">
                                                                        <h4 className="text-sm font-medium">
                                                                            {item.title}
                                                                        </h4>
                                                                        <span className="text-[12px] text-[#2a2a2a]">
                                                                            {
                                                                                item.level
                                                                            }
                                                                        </span>
                                                                        <span className="text-sm text-primary">
                                                                            {
                                                                                item.mainPrice
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })

                                                }
                                            </ul>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                {/* Thông báo */}
                                <div className="flex items-center gap-10 justify-center border-border/20">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="text-slate-500 hover:text-primary shadow-none rounded-full h-10 w-10 ">
                                                <Bell className="hover:text-primary" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" className="w-[350px] bg-white border-border/20 rounded-md p-4 z-50">
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
                                            onClick={handleLogout}
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
