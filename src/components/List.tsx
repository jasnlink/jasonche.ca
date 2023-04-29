import { PropsWithChildren } from "react";

export default function List({ children }:PropsWithChildren) {
    return (
        <ul className="ms-6 list-disc">{children}</ul>
    )
}