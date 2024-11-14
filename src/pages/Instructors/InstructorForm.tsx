"use client";

import logo from '@/assets/images/EL.png';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import CustomTooltip from "@/components/common/CustomTooltip";
import { Info, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import CustomDropDown from "@/components/common/CustomDropDown";
import CountryOptions from '@/constants/country.json'
import CustomCheckboxGroup from "@/components/common/CustomCheckboxGroup";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const mockCategories = [
  {
    label: 'Beginner',
    key: "beginner"
  },
  {
    label: 'Intermediate',
    key: "intermediate"
  },
  {
    label: 'Advanced',
    key: "advanced"
  },
]

function InstructorForm() {
  const { isLoading, authUser } = useSelector((state: RootState) => state.auth);


  const [auth, setAuth] = useState({
    image: '',
    address: '',
    phoneNumber: '',
    country: '',
    certifications: [] as string[],
    social_links: [] as string[],
    bio: '',
    teaching_levels: ''
  });
  const [error, setError] = useState({
    address: false,
    phoneNumber: false,
    country: false,
    certifications: false,
    teaching_levels: false
  });

  const [social, setSocial] = useState({
    facebook: '',
    youtube: ''
  });
  const handleChangeAuth = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setAuth((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCountry = (data: { label: string, key: string }) => {
    setAuth((prev) => ({ ...prev, country: data.label }));
  };

  const handleChangeTeaching = (data: { label: string, key: string }) => {
    setAuth((prev) => ({ ...prev, teaching_levels: data.key }));
  };
  const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setSocial((prev) => ({ ...prev, [name]: value }));

  };

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(globalThis.$action.logOut())
  }

  const requireKey = [
    'address',
    'phoneNumber',
    'country',
    'certifications',
    'teaching_levels',
  ]
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const social_value = [
      social.facebook,
      social.youtube
    ]
    const authSocial = { ...auth, social_links: social_value }
    let errorNumber = 0;
    for (const key in authSocial) {
      if (requireKey.includes(key)) {
        if ((authSocial as any)[key] === '' || (authSocial as any)[key].length < 1) {
          setError((prev) => ({ ...prev, [key]: true }));
          errorNumber += 1
        }
        else {
          setError((prev) => ({ ...prev, [key]: false }));
        }
      }
    }
    if (!errorNumber) {
      const newData = {
        _id: authUser._id,
        data: authSocial
      }
      const res = await dispatch(globalThis.$action.completeRegisteration(newData))
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
      }
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

  const EnglishCertificatesOptions = [
    { key: 'ielts', label: 'IELTS (International English Language Testing System)' },
    { key: 'toefl', label: 'TOEFL (Test of English as a Foreign Language)' },
    { key: 'toeic', label: 'TOEIC (Test of English for International Communication)' },
    { key: 'cambridge-ket', label: 'Cambridge KET (Key English Test - A2)' },
    { key: 'cambridge-pet', label: 'Cambridge PET (Preliminary English Test - B1)' },
    { key: 'cambridge-fce', label: 'Cambridge FCE (First Certificate in English - B2)' },
    { key: 'cambridge-cae', label: 'Cambridge CAE (Certificate in Advanced English - C1)' },
    { key: 'cambridge-cpe', label: 'Cambridge CPE (Certificate of Proficiency in English - C2)' },
    { key: 'pte', label: 'PTE (Pearson Test of English)' },
    { key: 'sat', label: 'SAT (Scholastic Assessment Test)' },
    { key: 'act', label: 'ACT (American College Testing)' },
    { key: 'celpip', label: 'CELPIP (Canadian English Language Proficiency Index Program)' },
    { key: 'duolingo', label: 'Duolingo English Test' },
    { key: 'aptis', label: 'APTIS (Advanced English Language Testing System)' },
    { key: 'bulats', label: 'BULATS (Business Language Testing Service)' }
  ];


  const handleChangeCategories = (data: string[]) => {
    setAuth((prev) => ({ ...prev, certifications: data }));

  }

  useEffect(() => {
    if (authUser) {
      if (authUser.status !== 'onboarding') {
        navigate('/')
      }
    }
  }, [authUser])

  return (
    <div className=" ">
      <div className="w-full px-10 py-8">
        <div className="text-left mb-16 m-4">
          <div className="flex gap-4">
            <img
              src={logo}
              alt="logo"
              className="w-24 inline-block"
            />
            <div className="flex flex-col justify-between">
              <h1 className="font-bold text-lg">English Learning Website</h1>
              <div>
                <p className="font-light text-slate-500 text-sm text-left text-wrap">
                  Khám phá hành trình học tiếng Anh tuyệt vời nơi bạn có thể tự tin giao tiếp
                </p>
                <p className="font-light text-slate-500 text-sm text-left text-wrap">
                  Mở ra cơ hội và xây dựng một tương lai tươi sáng hơn.
                </p>
              </div>
            </div>
          </div>
          <h4 className="text-gray-800 text-3xl font-semibold mt-6">
            Instructor Registration Form
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="w-full grid grid-cols-2 h-fit m-4 p-0 px-0 gap-4" action="#" method="POST">



          <div className="w-[90%]">
            <span className="text-sm text-slate-600">Địa chỉ nơi ở của bạn *</span>
            <div className="mt-2 relative truncate mb-6">
              <Input
                id="address"
                name="address"
                type="text"
                disabled={isLoading}
                onFocus={() => setError((prev) => ({ ...prev, address: false }))}
                autoComplete="address"
                defaultValue={auth.address}
                onChange={handleChangeAuth}
                className={cn('authInput', error.address && 'redBorder')}
                placeholder="Nhập tên tài khoản của bạn"
              />
              <CustomTooltip
                isHidden={!error.address}
                triggerElement={
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <Info className="text-red-500" size={18} />
                  </div>
                }
                message="Địa chỉ không được để trống"
              />
            </div>
          </div>

          <div className="w-[90%]">
            <span className="text-sm text-slate-600">Số điện thoại *</span>
            <div className="mt-2 relative truncate mb-6">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                disabled={isLoading}
                onFocus={() => setError((prev) => ({ ...prev, phoneNumber: false }))}
                autoComplete="phoneNumber"
                defaultValue={auth.phoneNumber}
                onChange={handleChangeAuth}
                className={cn('authInput', error.phoneNumber && 'redBorder')}
                placeholder="Nhập vào số điện thoại của bạn"
              />
              <CustomTooltip
                isHidden={!error.phoneNumber}
                triggerElement={
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <Info className="text-red-500" size={18} />
                  </div>
                }
                message="Số điện thoại không được để trống"
              />
            </div>
          </div>

          <div className="w-[90%]">
            <span className="text-sm text-slate-600">Quốc gia *</span>
            <div className="mt-2 relative truncate mb-6">
              <CustomDropDown dropDownList={CountryOptions} placeholder="Select your country"
                onChange={handleChangeCountry}
              />

              <CustomTooltip
                isHidden={!error.country}
                triggerElement={
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <Info className="text-red-500" size={18} />
                  </div>
                }
                message="Quốc gia không được để trống"
              />
            </div>
          </div>




          <div className="w-[90%]">
            <span className="text-sm text-slate-600">Trình độ giảng dạy *</span>
            <div className="mt-2 relative truncate mb-6">
              <CustomDropDown dropDownList={mockCategories} placeholder="Select teaching level"
                onChange={handleChangeTeaching}
              />
              <CustomTooltip
                isHidden={!error.teaching_levels}
                triggerElement={
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <Info className="text-red-500" size={18} />
                  </div>
                }
                message="Trình độ giảng dạy không được để trống"
              />
            </div>
          </div>

          <div className="w-[90%]">
            <span className="text-sm text-slate-600">Ảnh của bạn</span>
            <div className="w-32 h-32 rounded-full bg-secondary text-5xl flex items-center justify-center border relative mb-6 mt-2">
              {
                <img src={auth?.image || authUser?.image} className="w-32 h-32 rounded-full" alt="" />
              }
              <Popover>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer absolute w-fit flex items-center gap-2 bg-primary font-bold p-2 -bottom-1 left-[13%] z-50 text-white rounded-[8px]">
                    <Pencil size={12} />
                    <span className="text-[12px]">Chỉnh sửa</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-44 p-1 h-fit z-[9999] top-2">
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



          <div className="w-[90%]">
            <span className="text-sm text-slate-600">Liên kết với mạng xã hội</span>
            <div className="mt-2 relative truncate mb-2">
              <div className="border border-border rounded-sm truncate flex">
                <div className="min-w-[56px] aspect-square border-r flex items-center justify-center">
                  <svg width="32px" height="32px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#0080ff">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                    </g>
                    <g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20">
                    </rect>
                      <g>
                        <path d="M8.46 18h2.93v-7.3h2.45l.37-2.84h-2.82V6.04c0-.82.23-1.38 1.41-1.38h1.51V2.11c-.26-.03-1.15-.11-2.19-.11-2.18 0-3.66 1.33-3.66 3.76v2.1H6v2.84h2.46V18z">
                        </path>
                      </g>
                    </g>
                  </svg>
                </div>
                <Input
                  id="facebook"
                  name="facebook"
                  type="text"
                  disabled={isLoading}
                  onFocus={() => setError((prev) => ({ ...prev, facebook: false }))}
                  autoComplete="facebook"
                  defaultValue={social.facebook}
                  onChange={handleChangeLink}
                  className={cn('border-none rounded-none')}
                  placeholder="Nhập vào link facebook của bạn"
                />
              </div>

            </div>
            <div className="relative truncate mb-6">
              <div className="border border-border rounded-sm truncate flex">
                <div className="min-w-[56px] aspect-square border-r flex items-center justify-center">
                  <svg width="32px" height="32px" viewBox="0 -3 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>youtube [#168]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -7442.000000)" fill="#FF0033"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289" id="youtube-[#168]">
                  </path> </g> </g> </g> </g></svg>
                </div>
                <Input
                  id="youtube"
                  name="youtube"
                  type="text"
                  disabled={isLoading}
                  onFocus={() => setError((prev) => ({ ...prev, youtube: false }))}
                  autoComplete="youtube"
                  defaultValue={social.youtube}
                  onChange={handleChangeLink}
                  className={cn('border-none rounded-none')}
                  placeholder="Nhập vào link youtube của bạn"
                />
              </div>

            </div>
          </div>

          <div className="w-[90%]">
            <div className="flex items-center gap-4 ">
              <span className="text-sm text-slate-600">Chứng chỉ hiện có *</span>
              <CustomTooltip
                isHidden={!error.certifications}
                triggerElement={
                  <div className=" w-8 h-8 bg-white flex items-center justify-center ">
                    <Info className="text-red-500" size={18} />
                  </div>
                }
                message="Vui lòng chọn ít nhất một chứng chỉ"
                className="top-0 right-0 sticky "
              />
            </div>
            <div className="mt-2 relative truncate mb-6">
              <CustomCheckboxGroup options={EnglishCertificatesOptions} className='text-[14px]' name="categories" change={handleChangeCategories} />
            </div>


          </div>

          <div className="w-[90%]">
            <span className="text-sm text-slate-600">Mô tả bản thân</span>
            <div className="mt-2 relative truncate mb-6">
              <Textarea
                rows={10}
                id="bio"
                name="bio"
                disabled={isLoading}
                onFocus={() => setError((prev) => ({ ...prev, bio: false }))}
                autoComplete="bio"
                defaultValue={auth.bio}
                onChange={handleChangeAuth}
                className={cn('authInput')}
                placeholder="Nhập vào trình độ giảng dạy của bạn"
              />
            </div>
          </div>

          <div className=" flex justify-end mt-12 gap-4 col-span-2 w-[95%]">
            <Button
              type="button"
              className="w-40"
              variant={'outline'}
              onClick={handleLogout}
            >
              Cancel
            </Button>
            <Button
              type="submit"
            >
              Complete Registeration
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default InstructorForm;
