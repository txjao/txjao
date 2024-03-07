'use client'

import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { Dropdown } from "./Dropdown";

export function Header() {
    const { width } = useWindowDimensions();

    return (
        <>
            {(width ?? 0) > 768 && (
                <header className="flex w-full justify-between px-8">
                    {/* <Toggle /> */}
                    <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/">Linkedin</a>
                    <a href="https://github.com/txjao">Github</a>
                    <img src="/favicon.png" />
                    <Dropdown title="Contact Me">
                        <a href="https://wa.me/31995985251" target="_blank" rel="noopener">Whatsapp</a>
                        <a href="mailto: contatojoaovteixeira@gmail.com">Email</a>
                    </Dropdown>
                    <a id="language-button">PT</a>
                </header>
            )}
            {(width ?? 0) <= 768 && (
                <header className="flex w-full justify-between px-8">
                    {/* <Toggle /> */}

                    <img src="/favicon.png" />
                    <Dropdown title="Contact Me">
                        <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-teixeira-4b1429195/">Linkedin</a>
                        <a href="https://github.com/txjao">Github</a>
                        <a href="https://wa.me/31995985251" target="_blank" rel="noopener">Whatsapp</a>
                        <a href="mailto: contatojoaovteixeira@gmail.com">Email</a>
                        <a id="language-button">PT</a>
                    </Dropdown>
                </header>
            )}
        </>

    );
}