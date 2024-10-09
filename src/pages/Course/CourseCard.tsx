// CourseCard.tsx
import React from 'react';

// Define an interface for the props
interface CourseCardProps {
    title: string;
    subtitle: string;
    oldPrice: string;
    newPrice: string;
    instructor: string;
    views: string;
    duration: string;
    gradient: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
    title,
    subtitle,
    oldPrice,
    newPrice,
    instructor,
    views,
    duration,
    gradient
}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
                <div className="flex items-center justify-between">
                    <div className="text-lg font-bold">{title}</div>
                    <div className="text-sm">{subtitle}</div>
                </div>
            </div>
            <div className="p-4">
                <div className="text-lg font-bold">{title}</div>
                <div className="text-gray-500 line-through">{oldPrice}</div>
                <div className="text-red-500 text-lg font-bold">{newPrice}</div>
                <div className="flex items-center mt-4">
                    <img
                        alt="Instructor's avatar"
                        className="w-6 h-6 rounded-full mr-2"
                        src="https://storage.googleapis.com/a1aa/image/7vpM9WoY9X4nAZwy4G7ctfSP72d8T4epbP6i80MK4RbnlDlTA.jpg"
                    />
                    <span className="text-gray-700">{instructor}</span>
                    <span className="ml-auto text-gray-500">
                        <i className="fas fa-eye"></i> {views}
                    </span>
                    <span className="ml-4 text-gray-500">
                        <i className="fas fa-clock"></i> {duration}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
