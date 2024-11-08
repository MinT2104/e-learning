import { useEffect, useState } from "react";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router-dom";


const HomeView = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 700)
    }, [])

    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center">
            <FontAwesomeIcon className="animate-spin" icon={faSpinner} size='2x' />
        </div>
    }

    return (
        <Navigate to={'/courses'} />
    )
};

export default HomeView;
