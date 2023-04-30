import { PropsWithChildren } from "react";
import Image from "next/image";
import navIcon from '../../public/icon-nav.svg'

export default function Layout({ children }:PropsWithChildren) {

    return (

        <main className="min-h-screen">
            <div className="min-h-screen w-full grid grid-cols-12">
                {children}
            </div>
        </main>

    )

}