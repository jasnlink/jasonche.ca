import { PropsWithChildren } from "react";
import useMarginClass from "../hooks/useMarginClass";

interface TextProps {
    variant:string;
    my?:number;
    mt?:number;
    mb?:number;
}

export default function Text({ variant, my=0, mt=0, mb=0, children }:PropsWithChildren<TextProps>) {

    const marginClass = useMarginClass({my, mt, mb})

    switch (variant) {
        case 'title': 
            return <h1 className={`${marginClass}font-bold text-4xl`}>{children}</h1>
        case 'subheading':
            return <h2 className={`${marginClass}font-bold text-3xl`}>{children}</h2>
        case 'paragraph':
            return <div className={`${marginClass}font-base text-base`}>{children}</div>
        default:
            return <div className={`${marginClass}`}>{children}</div>
    }
}