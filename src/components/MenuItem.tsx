import Link from "next/link";
import { PropsWithChildren } from "react";

interface MenuItemProps {
    href?: string;
    selected?: boolean;
    sub?: boolean;
    target?:string;
    onClick?: ((...args: any[]) => any) | undefined;
}

export default function MenuItem({href, selected=false, sub=false, target, onClick, children}:PropsWithChildren<MenuItemProps>) {
    let itemClass = `block transition-all duration-75 select-none py-2 my-0.5 rounded-sm px-2`;
    if(sub) {
        itemClass += ` ml-4 text-sm`
    } else {
        itemClass += ` ml-0 text-sm`
    }
    if(selected) {
        itemClass += ` bg-zinc-700 text-zinc-100 [text-shadow:_0.7px_0_0_rgb(255_255_255_/_100%)]`
    } else {
        itemClass += ` bg-transparent hover:bg-zinc-800/90 text-zinc-300`
    }

    if(href) {
        return (
            <Link className={itemClass} onClick={onClick} href={href} target={target}>{children}</Link>
        )
    } else {
        return (
            <div className={itemClass} onClick={onClick}>{children}</div>
        )
    }
}