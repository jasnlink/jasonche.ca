import { PropsWithChildren } from "react";

export default function Layout({ children }:PropsWithChildren) {

    return (

        <main className="min-h-screen">
            <div className="min-h-screen w-full grid grid-cols-12">
                {children}
            </div>
        </main>

    )

}