import { AssignmentType } from '@/redux/StoreType';
import { useNavigate } from 'react-router-dom';
import CourseImage from '@/assets/images/courseImage.png'


const TaskCard = ({
    ...props
}: AssignmentType) => {
    const navigate = useNavigate()
    const handleTask = () => {
        navigate(`/tasks/${props._id}`)

    }

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden hover:-translate-y-2 delay-50 transition border">
            <div
                style={{
                    backgroundImage: `url(${CourseImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}
                className={`flex flex-col items-center justify-center px-6 py-16 h-[160px]`}>
            </div>
            <div className="p-6 bg-white">
                <h3 className="text-lg font-semibold hover:text-primary cursor-pointer"
                    onClick={() => handleTask()}
                >{props.title}</h3>
                <div className="flex items-center text-gray-500 mt-2 ">
                    <span>{props.author.name}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;