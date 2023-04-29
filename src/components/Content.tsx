import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

export default function Content({ children }: PropsWithChildren) {

    const router = useRouter()

    useEffect(() => {

        function handleRouteChangeComplete() {
            let mainContentContainer = document.querySelector('#main-content-container')
            if(mainContentContainer) {
                mainContentContainer.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }

        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return(() => {
            router.events.off('routeChangeComplete', handleRouteChangeComplete)
        })
    }, [router])

    return (

        <div className="col-span-12 lg:col-span-9 2xl:col-span-10 bg-black overflow-auto">
            <div id="main-content-container" className="h-full pt-16 pb-8 px-4 lg:p-12 max-w-4xl mx-auto overflow-auto">
                {children}
            </div>
        </div>

    )

}