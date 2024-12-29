import CustomDropDown from '@/components/common/CustomDropDown';
import CustomTooltip from '@/components/common/CustomTooltip';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { ApiClient } from '@/customFetch/ApiClient';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { Info, X, Upload, Loader2 } from 'lucide-react';
import { FormEvent, ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];

const truncateFileName = (fileName: string, maxLength: number = 25) => {
    if (fileName.length <= maxLength) return fileName;

    const extension = fileName.split('.').pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const truncatedName = nameWithoutExt.substring(0, maxLength - 3);

    return `${truncatedName}...${extension}`;
};

const AddFormLesson = ({
    triggerElement,
    className,
    isOpen,
    close,
    reload,
}: {
    triggerElement: ReactNode
    className?: string;
    isOpen: boolean;
    close: () => void;
    reload: () => void
}) => {
    const { chapters } = useSelector((state: RootState) => state.chapter)
    const initValue = {
        title: '',
        duration: '',
        url: '',
        _id: '',
    };

    const [error, setError] = useState({
        title: false,
        duration: false,
        url: false,
        chapter: false,
        videoSize: false,
        videoType: false
    });

    const [chapterDetails, setchapterDetails] = useState(initValue);

    const dispatch = useDispatch()

    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleClose = () => {
        close()
    }

    const validateForm = () => {
        const newError = {
            title: !chapterDetails.title.trim(),
            duration: !chapterDetails.duration.trim(),
            url: !chapterDetails.url,
            chapter: !chapterDetails._id,
            videoSize: false,
            videoType: false
        };

        setError(newError);
        return !Object.values(newError).some(err => err);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateForm()) {
            return;
        }

        const cloneData = { ...chapterDetails } as any
        delete cloneData._id
        const dataRequest = {
            _id: chapterDetails._id,
            $addToSet: {
                lessons: cloneData
            }
        }

        const res = await dispatch(globalThis.$action.updateChapter(dataRequest))
        if (res.payload) {
            reload()
            close()
            setchapterDetails(initValue)
        }
        console.log(chapterDetails)
    }

    const handleChangeChapter = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setchapterDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeChapterDropDown = (data: { name: string, _id: string }) => {
        setchapterDetails((prev) => ({ ...prev, _id: data._id }));
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size
        if (file.size > MAX_VIDEO_SIZE) {
            setError(prev => ({ ...prev, videoSize: true }));
            return;
        }

        // Validate file type
        if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
            setError(prev => ({ ...prev, videoType: true }));
            return;
        }

        setError(prev => ({ ...prev, videoSize: false, videoType: false, url: false }));
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('video', file);

            const response = await ApiClient.post('/media/upload-video', formData);

            if (response.status !== 200) {
                throw new Error('Upload failed');
            }

            const data = await response.data;
            setVideoFile(file);
            setchapterDetails(prev => ({ ...prev, url: data.url.url }));
        } catch (error) {
            console.error('Error uploading video:', error);
        } finally {
            setUploading(false);
        }
    };

    const clearVideo = () => {
        setVideoFile(null);
        setchapterDetails(prev => ({ ...prev, url: '' }));
        // Reset input file value
        const fileInput = document.getElementById('video') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-md text-black rounded-[20px] z-[9995]">
                <div className='flex justify-end w-full cursor-pointer'>
                    <X onClick={handleClose} />
                </div>
                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Thêm tên bài giảng
                    </DialogTitle>
                    <DialogDescription className="text-base text-left">
                        Vui lòng thêm chương vào nhóm học phần
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 gap-x-10 h-fit p-0 px-0" action="#" method="POST">
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Chọn chương *</span>
                        <div className="mt-2 relative truncate mb-2">
                            <CustomDropDown
                                dropDownList={chapters}
                                mappedKey='_id'
                                mappedLabel='name'
                                placeholder="Chọn chương"
                                onChange={(data: { name: string, _id: string }) => {
                                    handleChangeChapterDropDown(data);
                                    setError(prev => ({ ...prev, chapter: false }));
                                }}
                            />
                            <CustomTooltip
                                isHidden={!error.chapter}
                                triggerElement={
                                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                                        <Info className="text-red-500" size={18} />
                                    </div>
                                }
                                message="Vui lòng chọn chương"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Tên bài giảng *</span>
                        <div className="mt-2 relative truncate mb-2">
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                defaultValue={chapterDetails.title}
                                autoComplete="title"
                                onChange={handleChangeChapter}
                                onFocus={() => setError((prev) => ({ ...prev, title: false }))}
                                className={cn('authInput', error.title && 'redBorder')}
                                placeholder="Nhập tên bài giảng"
                            />
                            <CustomTooltip
                                isHidden={!error.title}
                                triggerElement={
                                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                                        <Info className="text-red-500" size={18} />
                                    </div>
                                }
                                message="Tên bài giảng không được để trống"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Thời lượng bài giảng *</span>
                        <div className="mt-2 relative truncate mb-2">
                            <Input
                                id="duration"
                                name="duration"
                                type="text"
                                autoComplete="duration"
                                defaultValue={chapterDetails.duration}
                                onFocus={() => setError((prev) => ({ ...prev, duration: false }))}
                                onChange={handleChangeChapter}
                                className={cn('authInput', error.duration && 'redBorder')}
                                placeholder="VD: 10 phút"
                            />
                            <CustomTooltip
                                isHidden={!error.duration}
                                triggerElement={
                                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                                        <Info className="text-red-500" size={18} />
                                    </div>
                                }
                                message="Thời lượng bài giảng không được để trống"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Upload Video *</span>
                        <div className="mt-2 relative truncate mb-2">
                            <Input
                                id="video"
                                name="video"
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                                className={cn('authInput hidden')}
                            />
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    onClick={() => document.getElementById('video')?.click()}
                                    className="flex items-center gap-2"
                                    disabled={uploading}
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Đang tải lên...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={16} />
                                            Chọn video
                                        </>
                                    )}
                                </Button>
                                {videoFile && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600 max-w-[200px] truncate" title={videoFile.name}>
                                            {truncateFileName(videoFile.name)}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-gray-500 hover:text-red-500"
                                            onClick={clearVideo}
                                        >
                                            <X size={16} />
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <CustomTooltip
                                    isHidden={!error.url}
                                    triggerElement={
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    }
                                    message="Video không được để trống"
                                />
                                <CustomTooltip
                                    isHidden={!error.videoSize}
                                    triggerElement={
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    }
                                    message="Kích thước video không được vượt quá 100MB"
                                />
                                <CustomTooltip
                                    isHidden={!error.videoType}
                                    triggerElement={
                                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                                            <Info className="text-red-500" size={18} />
                                        </div>
                                    }
                                    message="Định dạng video không hợp lệ (MP4, WebM, Ogg)"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end col-span-2'>
                        <Button>Xác nhận</Button>
                    </div>
                </form>
            </DialogContent >
        </Dialog >
    )
};

export default AddFormLesson;