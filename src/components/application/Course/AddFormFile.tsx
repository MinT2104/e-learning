import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import CustomDropDown from '@/components/common/CustomDropDown';
interface FileType {
    name?: string;
    url?: string;
}

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
    const { assginments } = useSelector((state: RootState) => state.assginment); // Adjust based on your Redux structure
    const dispatch = useDispatch();

    const initValue = {
        name: '',
        files: [] as FileType[],
        _id: '',
    };

    const [fileDetails, setFileDetails] = useState(initValue);
    const [error, setError] = useState({
        name: false,
        files: false,
    });

    const handleClose = () => {
        close();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dataRequest = {
            _id: fileDetails._id,
            $addToSet: {
                sections: {
                    name: fileDetails.name,
                    files: fileDetails.files
                }
            }
        };

        const res = await dispatch(globalThis.$action.updateAssginment(dataRequest));
        if (res.payload) {
            reload();
            close();
            setFileDetails(initValue);
        }
    };

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        const name = e.target.name;
        const value = e.target.value;
        setFileDetails((prev) => ({ ...prev, [name]: value }));


    };
    const handleChangeFileDropDown = (data: { name: string, _id: string }) => {
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

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 gap-x-10 h-fit p-0 px-0">
                    <div className="w-full">
                        <span className="text-sm text-slate-600">Chọn chương *</span>
                        <div className="mt-2 relative truncate mb-2">
                            <CustomDropDown dropDownList={assginments} mappedKey='_id' mappedLabel='title' placeholder="Chọn chương"
                                onChange={handleChangeFileDropDown}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <span className="text-sm text-slate-600">Tên tài liệu *</span>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={fileDetails.name}
                            onChange={(e) => handleChangeFile(e)}
                            className={cn('authInput', error.name && 'redBorder')}
                            placeholder="Nhập tên tài liệu"
                        />
                    </div>
                    {fileDetails.files.length > 0 ? (
                        fileDetails.files.map((file, index) => (
                            <div key={index} className="w-full">
                                <span className="text-sm text-slate-600">Tên File {index + 1}</span>
                                <Input
                                    name="fileName"
                                    type="text"
                                    value={file.name || ''}
                                    onChange={(e) => handleChangeFile(e, index)}
                                    onFocus={() => setError((prev) => ({ ...prev, name: false }))}

                                    className="mt-2"
                                    placeholder="Nhập tên file"
                                />
                                <span className="text-sm text-slate-600">URL File {index + 1}</span>
                                <Input
                                    name="fileUrl"
                                    type="text"
                                    value={file.url || ''}
                                    onChange={(e) => handleChangeFile(e, index)}
                                    onFocus={() => setError((prev) => ({ ...prev, title: false }))}
                                    className="mt-2 mb-4"
                                    placeholder="Nhập URL file"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="w-full">No files available</div>
                    )}

                    <div className="flex justify-end">
                        <Button type="submit">Xác nhận</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddFormFile;
