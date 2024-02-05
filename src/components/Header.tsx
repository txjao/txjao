import { Dropdown } from "./Dropdown";


export function Header() {
    return (
        <header >
            {/* <Toggle /> */}
            <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/">Linkedin</a>
            <a href="https://github.com/txjao">Github</a>
            <img src="/favicon.png" />
            <Dropdown options={
                [
                    "English",
                    "Portuguese"
                ]
            }/>
            <a id="language-button">PT</a>
        </header>
    );
}