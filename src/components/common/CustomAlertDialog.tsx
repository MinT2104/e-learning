import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactNode } from "react";

type CustomAlertDialogProps = {
    isOpen?: boolean;
    triggerElement?: ReactNode;
    title: string;
    description?: string;
    onOk?: () => void;
    onCancel?: () => void
}

const CustomAlertDialog = ({ isOpen, triggerElement, title, description, onOk, onCancel }: CustomAlertDialogProps) => {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogTrigger>
                {
                    triggerElement
                }
            </AlertDialogTrigger>
            <AlertDialogContent className="z-[9999]">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={onOk}>Tiếp</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CustomAlertDialog;
