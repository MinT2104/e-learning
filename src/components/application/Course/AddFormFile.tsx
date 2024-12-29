import CustomDropDown from '@/components/common/CustomDropDown';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ApiClient } from '@/customFetch/ApiClient';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { X, Upload } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddFormFile = ({
    triggerElement,
    className,
    isOpen,
    close,
    reload,
}: {
    triggerElement: React.ReactNode;
    className?: string;
    isOpen: boolean;
    close: () => void;
    reload: () => void;
}) => {
    const { assignments } = useSelector((state: RootState) => state.assignment);
    const initValue = {
        name: '',
        url: '',
        _id: '',
        file: null as File | null,
    };

    const [fileDetails, setFileDetails] = useState(initValue);
    const [error] = useState({
        name: false,
        url: false,
    });

    const dispatch = useDispatch();

    const handleClose = () => {
        close();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileDetails(prev => ({
            ...prev,
            name: file.name,
            file: file
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fileDetails.file) return;

        const formData = new FormData();
        formData.append('document', fileDetails.file);

        try {
            const uploadResponse = await ApiClient.post('/media/upload-document', formData);
            console.log(uploadResponse)
            const { url } = uploadResponse.data;

            const dataRequest = {
                _id: fileDetails._id,
                $addToSet: {
                    files: { name: fileDetails.name, url: url.url },
                },
            };

            const res = await dispatch(globalThis.$action.updateAssignment(dataRequest));
            if (res.payload) {
                reload();
                close();
                setFileDetails(initValue);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFileDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectAssignment = (data: { title: string, _id: string }) => {
        setFileDetails((prev) => ({ ...prev, _id: data._id }));
    };

    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={className}>{triggerElement}</DialogTrigger>
            <DialogContent className="bg-white border-none max-w-md text-black rounded-[20px] z-[9995]">
                <div className="flex justify-end w-full cursor-pointer">
                    <X onClick={handleClose} />
                </div>
                <DialogHeader className="w-full mx-auto">
                    <DialogTitle className="text-left text-[24px] font-medium">
                        Thêm tài liệu mới
                    </DialogTitle>
                    <DialogDescription className="text-base text-left">
                        Vui lòng điền thông tin tài liệu vào các trường dưới đây
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Chọn Assignment *</span>
                        <CustomDropDown
                            dropDownList={assignments}
                            mappedKey="_id"
                            mappedLabel="title"
                            placeholder="Chọn Assignment"
                            onChange={handleSelectAssignment}
                        />
                    </div>

                    <div className="w-full">
                        <span className="text-sm text-slate-600">Tên File *</span>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={fileDetails.name}
                            onChange={handleChangeFile}
                            className={cn('authInput', error.name && 'redBorder')}
                            placeholder="Nhập tên file"
                        />
                    </div>

                    <div className="w-full">
                        <span className="text-sm text-slate-600">File PDF/Word *</span>
                        <label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50 h-[48px] authInput">
                            <Upload className="w-5 h-5" />
                            <span className="text-sm">
                                {fileDetails.file ? fileDetails.file.name : 'Chọn file PDF hoặc Word'}
                            </span>
                            <input
                                type="file"
                                name="document"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <Button >Xác nhận</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddFormFile;
