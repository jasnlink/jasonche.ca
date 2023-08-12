import { PropsWithChildren } from "react";

interface TextProps {
    variant:string;
    sx?: string;
}

export default function Text({ variant, sx=``, children }:PropsWithChildren<TextProps>) {

    if (sx) {
        sx = `${sx} `
    }

    switch (variant) {
        case 'title': 
            return <h1 className={`${sx}font-bold text-4xl`}>{children}</h1>
        case 'subheading':
            return <h2 className={`${sx}font-bold text-3xl`}>{children}</h2>
        case 'paragraph':
            return <div className={`${sx}font-base text-base`}>{children}</div>
        default:
            return <div className={`${sx}`}>{children}</div>
    }
}