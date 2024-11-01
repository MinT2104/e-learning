import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type DropDownItem = {
    key: string;
    label: string;
};

type CustomDropDownProps = {
    dropDownList: DropDownItem[] | null;
    onChange?: any
    placeholder?: string;
    width?: string;
    className?: string;
};

const CustomDropDown = ({ dropDownList, onChange, placeholder, width, className }: CustomDropDownProps) => {

    const [item, setItem] = useState<DropDownItem | null>(null)

    const handleChangeItem = (data: DropDownItem) => {
        if (typeof onChange === 'function') {
            onChange(data)
        } else {
            console.warn('onChange is not a function')
        }
        setItem(data)
    }

    return (
        <Popover>
            <PopoverTrigger className="py-0" asChild>
                <Button className={cn('authInput bg-transparent justify-between items-center hover:bg-transparent', className, width)}>
                    <span className="text-[#697077]">{item ? item.label : placeholder}</span>
                    <ChevronDown className="text-black" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className={cn('max-w-80 min-h-[48px] max-h-[242px] h-fit p-0 overflow-auto', width)}>
                <ul>
                    {dropDownList && dropDownList.length > 0 && dropDownList.map((dropdownItem) => {
                        return (
                            <li
                                onClick={() => handleChangeItem(dropdownItem)}
                                key={dropdownItem.key}
                                className="h-[48px] text-[#21272A] hover:bg-[#F7F6E7] p-4 flex items-center text-sm cursor-pointer"
                            >
                                <span>{dropdownItem.label}</span>
                            </li>
                        )
                    })}
                </ul>
            </PopoverContent>
        </Popover>
    )
}

export default CustomDropDown
