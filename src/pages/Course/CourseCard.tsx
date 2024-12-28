import { GroupType } from '@/redux/StoreType';
import { useNavigate } from 'react-router-dom';
import CourseImage from '@/assets/images/courseImage.png'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const CourseCard = ({
    ...props
}: GroupType) => {
    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth)
    const courseDataTitle = props.courseData?.title
    const handleToCourse = () => {
        navigate(`/courses/${props._id}`)
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
            <div
                onClick={handleToCourse}
                className="p-4 bg-secondary flex-1 min-h-14 hover:text-primary">
                {authUser?.role === 'student' ?
                    (
                        <span
                            onClick={handleToCourse}
                            className="text-sm font-semibold cursor-pointer">
                            {courseDataTitle}
                        </span>
                    ) : null
                }
                <h3 className="text-sm font-semibold cursor-pointer">
                    {props.title}
                </h3>
            </div>
        </div>
    );
};

export default CourseCard;