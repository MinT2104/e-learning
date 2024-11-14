'use client'

import { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'

type CustomPaginationProps = {
    total?: number,
    currentPage?: number,
    className?: string,
    pageSize?: number,
    onChange?: any
}

function CustomPagination({ total = 0, currentPage = 1, className = '', pageSize = 10, onChange }: CustomPaginationProps) {
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        setTotalPages(Math.ceil(total / pageSize))
    }, [total])

    return (
        <Pagination className={className}>

            <PaginationContent>
                {/* Nút Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={currentPage > 1 ? () => onChange(-1) : undefined}
                        className={`${currentPage === 1
                            ? 'cursor-not-allowed text-gray-300 hover:bg-transparent hover:text-gray-300'
                            : ''
                            }`}
                    />
                </PaginationItem>

                {/* Hiển thị các số trang */}
                {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={currentPage === i + 1}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Nút Next */}
                <PaginationItem
                >
                    <PaginationNext
                        onClick={currentPage < totalPages ? () => onChange(1) : undefined}
                        className={`${currentPage >= totalPages
                            ? 'cursor-not-allowed text-gray-300 hover:bg-transparent hover:text-gray-300'
                            : ''
                            }`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default CustomPagination
