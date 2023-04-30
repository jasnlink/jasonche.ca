import { PropsWithChildren, useRef, MouseEvent, useEffect } from "react";

interface FadeProps {
    fade:boolean;
    onClose:() => void;
}

export default function Fade({ fade, onClose, children }:PropsWithChildren<FadeProps>) {

    const divRef = useRef<HTMLDivElement>(null)

    let className:string = 'fixed top-0 left-0 h-full w-full z-10 bg-black/70 transition-all duration-300 hidden opacity-0'

    useEffect(() => {

        if(fade && divRef.current) {
            divRef.current.classList.remove('hidden')
            setTimeout(() => {
                if(fade && divRef.current) {
                    divRef.current.classList.remove('opacity-0')
                    divRef.current.classList.add('opacity-100')
                }
            }, 10)
        } else if(!fade && divRef.current) {
            divRef.current.classList.remove('opacity-100')
            setTimeout(() => {
                if(!fade && divRef.current) {
                    divRef.current.classList.add('opacity-0')
                }
            }, 10)
        }
    }, [fade])


    function handleTransitionEnd() {
        if(!fade && divRef.current) {
            divRef.current.classList.add('hidden')
        }
    }

    function handleOnClose(event:MouseEvent<HTMLDivElement>) {
        if(event.target === divRef.current) {
            onClose();
        }
    }

    return (
        <div ref={divRef} className={className} onClick={handleOnClose} onTransitionEnd={handleTransitionEnd}>{children}</div>
    )
}