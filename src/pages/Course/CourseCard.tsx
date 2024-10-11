import { CourseType } from '@/redux/StoreType';

const CourseCard = ({
    ...props
}: CourseType) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-2 delay-50 transition">
            <div className={`bg-gradient-to-r from-blue-500 to-green-400  flex flex-col items-center justify-center px-6 py-16`}>
                <h2 className="text-white text-2xl font-bold text-center">{props.title}</h2>
                <p className="text-yellow-300 text-center">{props.title}</p>
            </div>
            <div className="p-6 bg-white">
                <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">{props.title}</h3>
                <p className="text-red-500 font-semibold">{props.mainPrice}</p>
                <div className="flex items-center text-gray-500 mt-4">
                    <i className="fas fa-users mr-2"></i>
                    <span>{props.instructor.name}</span>
                    <i className="fas fa-circle mx-2 text-xs"></i>
                    <i className="fas fa-layer-group mr-2"></i>
                    <span>{props.level}</span>
                    <i className="fas fa-circle mx-2 text-xs"></i>
                    <i className="fas fa-clock mr-2"></i>
                    <span>{props.duration}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;