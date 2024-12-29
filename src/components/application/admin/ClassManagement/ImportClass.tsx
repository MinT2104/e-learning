import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ApiClient } from '@/customFetch/ApiClient';

export const ImportClass = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            // Kiểm tra định dạng file
            if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
                toast({
                    title: "Lỗi",
                    description: "Vui lòng chọn file Excel (.xlsx hoặc .xls)",
                    variant: "destructive",
                });
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast({
                title: "Lỗi",
                description: "Vui lòng chọn file để tải lên",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await ApiClient.post('/course/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response);

            toast({
                title: "Thành công",
                description: "Đã nhập danh sách lớp học phần thành công",
                variant: "default",
            });

            // Reset file sau khi upload thành công
            setFile(null);
            // Reset input file
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error: any) {
            toast({
                title: "Lỗi",
                description: error.response?.data?.error || "Có lỗi xảy ra khi nhập danh sách lớp học phần",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Nhập danh sách lớp học phần</h2>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".xlsx,.xls"
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary file:text-white
                            hover:file:bg-primary/90"
                    />
                    <Button
                        onClick={handleUpload}
                        disabled={!file || isLoading}
                        className="min-w-[120px]"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Đang xử lý...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Upload size={16} />
                                <span>Tải lên</span>
                            </div>
                        )}
                    </Button>
                </div>

                <div className="text-sm text-gray-500">
                    <p className="font-medium mb-2">Lưu ý:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>File phải có định dạng .xlsx hoặc .xls</li>
                        <li>Cấu trúc file Excel phải có các cột: title, courseId, description</li>
                        <li>Dữ liệu phải được bắt đầu từ hàng thứ 2 (hàng 1 là tiêu đề)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}; 