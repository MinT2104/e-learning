import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Checkbox } from '@radix-ui/react-checkbox'
type CustomDatePickerProps = {
    placeholder?: string;
    onChange?: any;
    className?: string
    mode?: 'single' | 'multiple' | 'default' | 'range' | 'week' | undefined
}

export function CustomDatePicker({ placeholder, onChange, className, mode = 'single' }: CustomDatePickerProps) {
    const [date, setDate] = React.useState<any>()
    const [dateOfWeek, setDateOfWeek] = React.useState<string[]>([])

    const handleFormatDate = () => {
        if (!date) return
        if (mode === 'range') {
            const { from, to } = date as { from: string, to: string }
            let formatString = ''
            if (from) {
                formatString = format(from, 'PPP') + ' - '
            }
            if (to) {
                formatString = format(from, 'PPP') + ' - ' + format(to, 'PPP')
            }
            return formatString
        }
        if (mode === 'single') {
            return format(date, 'PPP')
        }
    }

    const handleChange = (data: any) => {
        if (typeof onChange === 'function') {
            onChange(data)
        } else {
            console.warn('onChange is not a function')
        }
    }

    React.useEffect(() => {
        handleChange(date)
    }, [date])

    React.useEffect(() => {
        handleChange(dateOfWeek)
    }, [dateOfWeek])

    const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const handleChangeDayOfWeek = (day: string) => {
        const isIncluded = dateOfWeek.includes(day)
        if (!isIncluded) {
            setDateOfWeek((prev: string[]) => {
                return [
                    ...prev,
                    day
                ]
            })
        } else {
            setDateOfWeek((prev: string[]) => {
                const index = prev.indexOf(day)
                const newArray = [...prev]
                newArray.splice(index, 1)
                return newArray
            })
        }
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                        className
                    )}
                >
                    <CalendarIcon />
                    {date ? handleFormatDate() : <span>{placeholder ? placeholder : 'Select date'}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
                {mode !== 'week' && (
                    <Calendar
                        mode={mode}
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                )}
                {mode === 'week' && (
                    <div className="text-sm pr-10 text-[#21272A] min-w-[120px] p-4 min-h-32">
                        <ul>
                            {dayOfWeek.map((item) => {
                                return (
                                    <li
                                        onClick={() => handleChangeDayOfWeek(item)}
                                        key={item} className="h-[40px] flex items-center gap-4">
                                        <Checkbox defaultChecked={dateOfWeek.includes(item)} id={item} />
                                        <label htmlFor={item}> {item}</label>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}