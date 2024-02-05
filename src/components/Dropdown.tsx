
type dropdown = {
    title: string;
    href: string;
}

interface DropdownProps {
    options: dropdown[];
}

export function Dropdown(props: DropdownProps) {

    return (
        <div>
            {props.options.map((option, index) => {
                return <a key={index} target="_blank" href="">{option}</a>
            })}
        </div>
    )
}