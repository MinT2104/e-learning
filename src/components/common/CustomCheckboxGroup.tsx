import { Checkbox } from '@/components/ui/checkbox'
import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CheckboxGroupProps {
    options: { key: string; label: string; subOptions?: { key: string; label: string }[] }[]
    className?: string
    change: (data: string[], name: string) => void
    name: string
}

const CustomCheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, className, change, name }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const [collapsedStates, setCollapsedStates] = useState<{ [key: string]: boolean }>({})

    const handleCheckboxChange = (key: string) => {
        setSelectedOptions((prevSelected) =>
            prevSelected.includes(key)
                ? prevSelected.filter((option) => option !== key)
                : [...prevSelected, key]
        )
    }

    const handleCollapseToggle = (key: string) => {
        setCollapsedStates((prevStates) => ({
            ...prevStates,
            [key]: !prevStates[key]
        }))
    }

    useEffect(() => {
        change(selectedOptions, name)
    }, [selectedOptions])

    return (
        <div className={className}>
            {options.map((option) => (
                <div key={option.key} className='mb-2'>
                    <div className='flex items-center space-x-2'>
                        <Checkbox
                            key={option.key}
                            checked={selectedOptions.includes(option.key)}
                            className='blackBorder'
                            onCheckedChange={() => handleCheckboxChange(option.key)}
                        />
                        <label htmlFor={option.key}>{option.label}</label>
                        {option.subOptions && (
                            <button
                                type='button'
                                onClick={() => handleCollapseToggle(option.key)}
                                className='ml-2'
                            >
                                {collapsedStates[option.key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                        )}
                    </div>
                    {option.subOptions && collapsedStates[option.key] && (
                        <div className='pl-6 mt-2'>
                            {option.subOptions.map((subOption) => (
                                <div key={subOption.key} className='flex items-start space-x-2'>
                                    <Checkbox
                                        id={subOption.key}
                                        checked={selectedOptions.includes(subOption.key)}
                                        onCheckedChange={() => handleCheckboxChange(subOption.key)}
                                    />
                                    <label className='-mt-0.5' htmlFor={subOption.key}>{subOption.label}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CustomCheckboxGroup
