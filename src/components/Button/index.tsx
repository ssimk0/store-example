import {FC, MouseEventHandler} from "react"

interface Props {
    type?: "inline" | "outline",
    children: JSX.Element,
    className?: string,
    disabled?: boolean,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

const Button: FC<Props> = ({type = "outline", children, className, disabled = false, onClick}) => {
    let buttonClasses = 'bg-indigo-500 rounded px-4 py-2 text-white hover:bg-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed'

    if (type == "inline") {
        buttonClasses = 'text-indigo-500 flex disabled:cursor-not-allowed disabled:text-gray-500 hover:text-indigo-600'
    }

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${buttonClasses} ${className}`}>
            {children}
        </button>
    )
}

export default Button