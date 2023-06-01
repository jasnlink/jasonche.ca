import Image from "next/image";
import { useState } from "react";
import Fade from "./Fade";
import closeIcon from '../../public/icon-close.svg'
import useImageUrl from "../hooks/useImageUrl";

interface LightboxImageProps {
    sanityRef?:string;
    src?:string;
    alt:string;
    title:string;
    direction?:keyof typeof Direction;
}

enum Direction {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

export default function LightboxImage({ sanityRef='', src='', alt, title, direction='horizontal' }:LightboxImageProps) {

    const [loading, setLoading] = useState<boolean>(true)

    const refSrc = useImageUrl(sanityRef)
    if(refSrc) {
        src = refSrc
    }

    let aspectClassName:string = 'relative'
    if(direction === 'horizontal') {
        aspectClassName += ' aspect-video my-8'
    } else if(direction === 'vertical') {
        aspectClassName += ' h-full aspect-vertical'
    }

    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)

    function toggleLightbox() {
        setLightboxOpen(!lightboxOpen)
    }

    return (
        <>
            <div role="button" className={aspectClassName} onClick={() => {toggleLightbox()}}>
                <Image src={src} alt={alt} title={title} fill className="object-contain" onLoadingComplete={() => {setLoading(false)}} />
                {!!loading && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-zinc-700 rounded-sm animate-pulse"></div>
                )}
            </div>
            <Fade fade={lightboxOpen} onClose={() => {toggleLightbox()}}>
                <div role="button" className="z-20 absolute top-0 right-0 mr-4 mt-4 h-8 w-8 bg-white rounded-full flex items-center justify-center" onClick={toggleLightbox}>
                    <Image src={closeIcon} alt="close" className="w-3 h-3" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-auto max-h-screen aspect-vertical lg:aspect-video">
                    <Image src={src} alt={alt} title={title} fill className="object-contain" />
                </div>
            </Fade>
        </>
    )
}