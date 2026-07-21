interface BioProps {
    text: string
}

export function Bio({ text }: BioProps) {
    return (
        <p className="text-2xl transition-colors 
        max-[1440px]:text-xl 
        max-[1024px]:text-base text-justify">
            {text}{" "}
        </p >
    );
}
