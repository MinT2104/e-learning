import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type authType = {
    address: string,
    userName: string,
    phoneNumber: string,
    email: string,
    image: string,
}

const ProfileView = () => {

    const { authUser } = useSelector((state: RootState) => state.user)
    const [auth, setAuth] = useState<authType>()
    const dispatch = useDispatch()

    useEffect(() => {
        if (authUser) {
            const { address, userName, phoneNumber, email, image } = authUser
            setAuth({
                address, userName, phoneNumber, email, image
            })
        }
    }, [authUser])

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuth((prev: any) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async () => {
        const res = await dispatch(globalThis.$action.updateUserProfile({ ...auth, _id: authUser._id }))
        if (res?.type.includes('fulfilled')) {
            toast({
                variant: 'success',
                title: 'Cập nhập thông tin thành công'
            })
            await dispatch(globalThis.$action.me())
            toast({
                variant: 'success',
                title: 'Cập nhập thông tin cá nhân thành công!'
            })
        }
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        const form: any = new FormData()
        if (files) {
            form.append('file', files[0])
            const res = await dispatch(globalThis.$action.uploadImage(form))
            if (res.payload.data) {
                const { url } = res.payload.data
                setAuth((prev): any => {
                    return {
                        ...prev,
                        image: url
                    }
                })
            }
        }
    }

    return (
        <section className="grid grid-cols-5 mt-4 gap-10">
            <div className="col-span-2 text-sm space-y-2">
                <span className="text-sm font-semibold">Ảnh của bạn</span>
                <p className="text-gray-500">Ảnh sẽ được hiển thị ở trong trang cá nhân của bạn.</p>
            </div>
            <div className="col-span-3 flex items-start gap-4">
                <div className="w-32 h-32 rounded-full bg-secondary text-5xl flex items-center justify-center border relative">
                    {
                        authUser?.image ?
                            <img src={auth?.image || authUser?.image} className="w-32 h-32 rounded-full" alt="" />
                            : <p className="font-semibold text-primary uppercase">{auth?.email || authUser?.userName?.slice(0, 1)}</p>
                    }
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="cursor-pointer absolute w-fit flex items-center gap-2 bg-primary font-bold p-2 -bottom-1 left-[13%] z-50 text-white rounded-[8px]">
                                <Pencil size={12} />
                                <span className="text-[12px]">Chỉnh sửa</span>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-44 p-1 h-fit z-[9999] top-2">
                            <ul className="space-y-2">
                                <li
                                    className="text-sm font-normal cursor-pointer p-2 px-4 rounded-[4px] hover:bg-secondary hover:text-secondary-foreground flex gap-4 items-center">
                                    <label className="cursor-pointer" htmlFor="upload">Tải lên hình ảnh</label>
                                    <input onChange={handleUpload} id="upload" type="file" hidden />
                                </li>
                                <li className="text-sm font-normal cursor-pointer p-2 px-4 rounded-[4px] hover:bg-secondary hover:text-secondary-foreground flex gap-4 items-center">
                                    <span>Xóa hình ảnh</span>
                                </li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="col-span-2 text-sm space-y-2">
                <span className="text-sm font-semibold">Tên tài khoản</span>
                <p className="text-gray-500">Tên tài khoản dùng để đăng nhập và hiển thị.</p>
            </div>
            <Input
                defaultValue={auth?.userName}
                name="userName"
                disabled
                onChange={(handleChangeValue)}
                className="col-span-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <div className="col-span-2 text-sm space-y-2">
                <span className="text-sm font-semibold">Email liên lạc</span>
                <p className="text-gray-500">Email dùng để lấy lại mật khẩu khi mất và liên lạc.</p>
            </div>
            <Input
                defaultValue={auth?.email}
                onChange={handleChangeValue}
                name="email"
                className="col-span-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <div className="col-span-2 text-sm space-y-2">
                <span className="text-sm font-semibold">Địa chỉ</span>
                <p className="text-gray-500">Địa chỉ nơi ở của bạn.</p>
            </div>
            <Input
                defaultValue={auth?.address}
                name="address"
                onChange={handleChangeValue}
                className="col-span-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <div className="col-span-2 text-sm space-y-2">
                <span className="text-sm font-semibold">Số điện thoại</span>
                <p className="text-gray-500">Số điện thoại dùng để liên lạc.</p>
            </div>
            <Input
                defaultValue={auth?.phoneNumber}
                name="phoneNumber"
                onChange={handleChangeValue}
                className="col-span-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <Button onClick={handleSubmit} className="col-span-1 h-12 col-start-5 col-end-6">Cập nhật</Button>
        </section>
    )
};

export default ProfileView;
