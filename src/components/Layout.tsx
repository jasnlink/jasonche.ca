import { PropsWithChildren } from "react";
import Image from "next/image";
import navIcon from '../../public/icon-nav.svg'

export default function Layout({ children }:PropsWithChildren) {

    return (

        <main className="flex min-h-screen h-screen">
            <div className="w-full grid grid-cols-12">
                {children}
            </div>
        </main>

    )

}