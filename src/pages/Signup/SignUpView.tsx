import Logo from '@/assets/images/EL.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Info, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUpView = () => {
    const [auth, setAuth] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
    });
    const [error, setError] = useState({
        userName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const { isLoading } = useSelector((state: RootState) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeAuth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setAuth((prev) => ({ ...prev, [name]: value }));
    };

    const checkEmpty = (value: string) => value.trim().length < 1;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (auth.userName && auth.email && auth.password && auth.confirmPassword) {
            if (auth.password !== auth.confirmPassword) {
                setError({ ...error, confirmPassword: true });
                toast({
                    variant: 'destructive',
                    title: 'Mật khẩu không khớp',
                    description: 'Vui lòng kiểm tra lại mật khẩu của bạn',
                });
                return;
            }

            const res = await dispatch(globalThis.$action.register(auth));

            if (res?.type?.includes('rejected')) {
                toast({
                    variant: 'destructive',
                    title: 'Đăng ký không thành công',
                    description: 'Vui lòng kiểm tra lại thông tin đăng ký',
                });
            } else {
                toast({
                    variant: 'success',
                    title: 'Đăng ký thành công',
                });
                setTimeout(() => {
                    navigate('/login');
                }, 1000)
            }
            console.log(auth)
        } else {
            setError({
                userName: checkEmpty(auth.userName),
                email: checkEmpty(auth.email),
                password: checkEmpty(auth.password),
                confirmPassword: checkEmpty(auth.confirmPassword),
            });
        }
    };

    return (
        <div className="h-screen overflow-y-scroll scrollbar p-10 pb-20 flex flex-col gap-6 items-center justify-start w-full">
            <img className="w-20 h-auto" src={Logo} alt="Logo" />
            <h1 className="font-bold text-3xl">Đăng ký tài khoản EL</h1>
            <div>
                <p className="font-light text-slate-600 text-md text-center text-wrap">
                    Tham gia ngay để bắt đầu hành trình học tiếng Anh của bạn
                </p>
            </div>
            <form onSubmit={handleSubmit} className="w-2/3 h-fit mt-6" action="#" method="POST">
                <span className="text-sm text-slate-600">Tên tài khoản</span>
                <div className="mt-2 relative truncate mb-6">
                    <Input
                        id="userName"
                        name="userName"
                        type="text"
                        disabled={isLoading}
                        onFocus={() => setError((prev) => ({ ...prev, userName: false }))}
                        autoComplete="userName"
                        defaultValue={auth.userName}
                        onChange={handleChangeAuth}
                        className={cn('authInput', error.userName && 'redBorder')}
                        placeholder="Nhập tên tài khoản của bạn"
                    />
                    {error.userName && (
                        <div className="absolute w-10 h-full bg-transparent top-0 right-0 flex items-center justify-start">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Tên tài khoản không được để trống</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                </div>

                {/* <Separator className='my-10'/> */}

                <span className="text-sm text-slate-600">Email của bạn</span>
                <div className="mt-2 relative truncate mb-6">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        disabled={isLoading}
                        onFocus={() => setError((prev) => ({ ...prev, email: false }))}
                        autoComplete="email"
                        defaultValue={auth.email}
                        onChange={handleChangeAuth}
                        className={cn('authInput', error.email && 'redBorder')}
                        placeholder="Nhập email của bạn"
                    />
                    {error.email && (
                        <div className="absolute w-10 h-full bg-transparent top-0 right-0 flex items-center justify-start">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Email không được để trống</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                </div>

                <span className="text-sm text-slate-600">Mật khẩu</span>
                <div className="mt-2 relative truncate">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        disabled={isLoading}
                        onFocus={() => setError((prev) => ({ ...prev, password: false }))}
                        autoComplete="password"
                        defaultValue={auth.password}
                        onChange={handleChangeAuth}
                        className={cn('authInput', error.password && 'redBorder')}
                        placeholder="Nhập mật khẩu"
                    />
                </div>

                <div className="text-sm text-slate-600 mt-6">Xác nhận mật khẩu</div>
                <div className="mt-2 relative truncate">
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        disabled={isLoading}
                        onFocus={() => setError((prev) => ({ ...prev, confirmPassword: false }))}
                        autoComplete="password"
                        defaultValue={auth.confirmPassword}
                        onChange={handleChangeAuth}
                        className={cn('authInput', error.confirmPassword && 'redBorder')}
                        placeholder="Xác nhận mật khẩu"
                    />
                </div>

                {error.confirmPassword && (
                    <p className="text-red-500 text-sm mt-2">Mật khẩu không khớp</p>
                )}

                <div className="mt-6">
                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading ? <LoaderCircle className="animate-spin" /> : 'Đăng ký'}
                    </Button>
                </div>

                <div className="flex items-center justify-center w-full mt-6 text-sm">
                    <span>Nếu đã có tài khoản?</span>
                    <Button type="button" variant="link" onClick={() => navigate('/login')} className="cursor-pointer no-underline hover:no-underline pl-1">
                        Đăng nhập
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignUpView;
