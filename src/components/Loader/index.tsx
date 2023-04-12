import {FunctionComponent} from "react";

interface Props {
    isFetching: boolean
    children: JSX.Element
}

const Loader: FunctionComponent<Props> = ({children, isFetching}) => {
    
    
    return (
        <div className="flex justify-center items-center">
            {isFetching ? (
                <div className="loader mt-16"></div>
            ) : children} 
        </div>
    )
}

export default Loader