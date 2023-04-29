import { PropsWithChildren } from "react";

interface TextProps {
    variant:string;
}

export default function Text({ variant, children }:PropsWithChildren<TextProps>) {
    switch (variant) {
        case 'title': 
            return <h1 className="font-extrabold text-4xl my-12">{children}</h1>
        case 'subheading':
            return <h2 className="font-bold text-3xl mt-8 mb-4">{children}</h2>
        case 'paragraph':
            return <div className="font-base text-base my-4">{children}</div>
        default:
            return <div>{children}</div>
    }
}