import React from 'react';

interface CourseCardProps {
    title: string;
    description: string;
    price: string;
    participants: number;
    lessons: number;
    duration: string;
    gradient: string;
    category: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
    title,
    description,
    price,
    participants,
    lessons,
    duration,
    gradient,
    category,
}) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
            <div className={`bg-gradient-to-r ${gradient} flex flex-col items-center justify-center px-6 py-16`}>
                <h2 className="text-white text-2xl font-bold text-center">{category}</h2>
                <p className="text-yellow-300 text-center">{description}</p>
            </div>
            <div className="p-6 bg-gray-100">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-red-500 font-semibold">{price}</p>
                <div className="flex items-center text-gray-500 mt-4">
                    <i className="fas fa-users mr-2"></i>
                    <span>{participants}</span>
                    <i className="fas fa-circle mx-2 text-xs"></i>
                    <i className="fas fa-layer-group mr-2"></i>
                    <span>{lessons}</span>
                    <i className="fas fa-circle mx-2 text-xs"></i>
                    <i className="fas fa-clock mr-2"></i>
                    <span>{duration}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
