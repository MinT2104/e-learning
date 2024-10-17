import Logo from '@/assets/images/EL.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Info, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
  const [auth, setAuth] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const { isLoading } = useSelector((state: RootState) => state.user)

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

    console.log(auth)

    if (auth.password && auth.email) {
      const res = await dispatch(globalThis.$action.login(auth));
      if (res?.type?.includes('rejected')) {
        toast({
          variant: 'destructive',
          title: 'Sai tài khoản hoặc mật khẩu',
          description: 'Vui lòng kiểm tra lại tài khoản hoặc mật khẩu',
        });
      } else {
        toast({
          variant: 'success',
          title: 'Đăng nhập thành công',
        });
        navigate('/');
      }
    } else {
      setError({
        email: checkEmpty(auth.email),
        password: checkEmpty(auth.password),
      });
    }
  };

  return (
    <div className="h-screen p-10 py-20 flex flex-col gap-6 items-center justify-start w-full">
      <img className="w-20 h-auto" src={Logo} alt="" />
      <h1 className="font-bold text-3xl">Đăng nhập vào EL</h1>
      <div>
        <p className="font-light text-slate-600 text-md text-center text-wrap">
          Khám phá hành trình học tiếng Anh tuyệt vời nơi bạn có thể tự tin giao tiếp
        </p>
        <p className="font-light text-slate-600 text-md text-center text-wrap">
          Mở ra cơ hội và xây dựng một tương lai tươi sáng hơn.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-2/3 h-fit mt-6" action="#" method="POST">
        <span className="text-sm text-slate-600">Email của bạn</span>
        <div className="mt-2 relative truncate mb-6">
          <Input
            id="email"
            name="email"
            type="text"
            disabled={isLoading}
            onFocus={() => setError((prev) => ({ ...prev, email: false }))}
            autoComplete="email"
            defaultValue={auth.email}
            onChange={handleChangeAuth}
            className={cn('authInput', error.email && 'redBorder')}
            placeholder="Nhập tên tài khoản của bạn"
          />
          <div hidden={!error.email} className="absolute w-10 h-full bg-transparent top-0 right-0 flex items-center justify-start">
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
            placeholder="Mật khẩu"
          />
          <div hidden={!error.password} className="absolute w-10 h-full bg-transparent top-0 right-0 flex items-center justify-start">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <Info className="text-red-500" size={18} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mật khẩu không được để trống</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex items-start w-full justify-end mt-6">
          <div className="text-sm">
            <Button type="button" variant="link" onClick={() => navigate('/forgot-password')} className="cursor-pointer h-0 pr-0">
              Quên mật khẩu?
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Đăng nhập'}
          </Button>
        </div>

        <div className="flex items-center justify-center w-full mt-6 text-sm">
          <span>Nếu bạn chưa có tài khoản?</span>
          <Button type="button" variant="link" onClick={() => navigate('/signup')} className="cursor-pointer no-underline hover:no-underline pl-1">
            Đăng ký
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
