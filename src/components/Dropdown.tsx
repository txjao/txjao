import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react";

interface DropdownProps {
    children?: React.ReactNode;
    title?: string;
}

export function Dropdown(props: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {props.title &&
                <div className="dropdown-label">
                    <span>{props.title}</span>
                    <ChevronRightIcon className={`${isOpen ? 'rotate-90 transition-all duration-200' : 'rotate-0 transition-all duration-200'}`}/>
                </div>
            }
            {isOpen && (
                <div className="flex flex-col object-cover *:flex *:flex-col *:w-min *:after:w-0 *:after:bg-black *:after:h-px *:after:hover:w-full *:after:hover:transition-all *:after:hover:duration-500">
                    {props.children}
                </div>
            )}
        </div>
    )
}