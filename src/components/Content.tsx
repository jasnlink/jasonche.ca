import { PropsWithChildren } from "react";

export default function Content({ children }: PropsWithChildren) {

    return (

        <div className="col-span-12 lg:col-span-9 2xl:col-span-10 from-black to-zinc-950 bg-gradient-radial overflow-auto">
            <div id="main-content-container" className="h-full pt-16 pb-8 px-4 lg:p-12 max-w-4xl mx-auto overflow-hidden">
                {children}
            </div>
        </div>

    )

}