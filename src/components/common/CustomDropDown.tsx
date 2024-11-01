import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

type DropDownItem = {
    key: string;
    label: string;
};

type CustomDropDownProps = {
    dropDownList: DropDownItem[] | null;
    onChange?: any;
    placeholder?: string;
    width?: string;
    className?: string;
};

const CustomDropDown = ({ dropDownList, onChange, placeholder, width, className }: CustomDropDownProps) => {

    const [item, setItem] = useState<DropDownItem | null>(null);
    const [open, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [dropdownFilterList, setDropdownFilterList] = useState<DropDownItem[]>(dropDownList || []);

    const handleChangeItem = (data: DropDownItem) => {
        if (typeof onChange === 'function') {
            onChange(data);
        } else {
            console.warn('onChange is not a function');
        }
        setItem(data);
        setIsOpen(false);  // Đóng Popover sau khi chọn một item
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchValue(value);
    };

    useEffect(() => {
        const filteredItems = dropDownList
            ? dropDownList.filter((item) =>
                item.label.toLowerCase().startsWith(searchValue.toLowerCase())
            )
            : [];
        setDropdownFilterList(filteredItems.length ? filteredItems : dropDownList || []);
    }, [searchValue, dropDownList]);

    const handlePopoverChange = (isOpen: boolean) => {
        setIsOpen(isOpen);
        if (!isOpen && searchValue) {
            setSearchValue('');
            setDropdownFilterList(dropDownList || []);
        }
    };

    return (
        <Popover onOpenChange={handlePopoverChange}>
            <PopoverTrigger className="py-0" asChild>
                <Button className={cn('authInput bg-transparent justify-between items-center hover:bg-transparent', className, width)}>
                    <span className="text-[#697077]">{item ? item.label : placeholder}</span>
                    <ChevronDown className="text-black" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className={cn('max-w-80 p-0', width)}>
                <div className="p-2">
                    <Input
                        className="w-full h-[48px]"
                        onChange={handleSearch}
                        value={searchValue}
                    />
                </div>
                <div className="min-h-[48px] max-h-[242px] h-fit p-0 overflow-auto">
                    <ul>
                        {dropdownFilterList && dropdownFilterList.length > 0 && dropdownFilterList.map((dropdownItem) => (
                            <li
                                onClick={() => handleChangeItem(dropdownItem)}
                                key={dropdownItem.key}
                                className="h-[48px] text-[#21272A] hover:bg-[#F7F6E7] p-4 flex items-center text-sm cursor-pointer"
                            >
                                <span>{dropdownItem.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default CustomDropDown;