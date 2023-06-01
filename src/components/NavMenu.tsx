import { dehydrate } from 'react-query'
import { queryClient } from '@/src/api'
import { getNavigationProjects, getAllSocialLinks } from '../api';

export async function getServerSideProps() {
    await queryClient.prefetchQuery(['navigationProjects'], () => getNavigationProjects())
    await queryClient.prefetchQuery(['socialLinks'], () => getAllSocialLinks())

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

import MenuItem from '@/src/components/MenuItem'
import { useRouter } from 'next/router';
import { Fragment, useState, MouseEvent, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image';
import linkIcon from '../../public/icon-link.svg'
import navIcon from '../../public/icon-nav.svg'
import closeIcon from '../../public/icon-close.svg'
import { useQuery } from 'react-query';
import { SocialLinks } from '../generated/graphql';

export default function NavMenu() {


    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    let handle = ''
    if(router.query.handle) {
        handle = router.query.handle[0];
    }
    const path = router.asPath

    const [selectedItem, setSelectedItem] = useState<Array<number | null>>([0, null])

    const getMatchingHandleId = useCallback((searchHandle:string, itemList:Array<NavItem>):number | null => {
        for(let i = 0; i < itemList.length; i++) {
            const item = itemList[i]
            
            if(item.handle === searchHandle) {
                return i
            }
            if(item?.subItems?.length) {
                return getMatchingHandleId(searchHandle, item.subItems)
            }
        }
        return null
    }, [])

    const [navItems, setNavItems] = useState<Array<NavItem>>([])
    const [socialLinkItems, setSocialLinkItems] = useState<Array<SocialLinks>>([])

    useEffect(() => {
        if(handle) {
            if(path.includes('/projects/')) {
                let selectedHandleId = [getMatchingHandleId('/projects/', navItems), getMatchingHandleId(handle, navItems)]
                setSelectedItem([...selectedHandleId])
            }
        } else {
            let selectedHandleId = [0, null]
            setSelectedItem([...selectedHandleId])
        }
    }, [loading, getMatchingHandleId, navItems, path, handle])


    interface NavItem {
        title: string | undefined | null;
        path: string | undefined | null;
        handle: string | undefined | null;
        subItems: Array<NavItem> | undefined | null;
    }

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
            setMenuOpen(false)
        }

        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return(() => {
            router.events.off('routeChangeComplete', handleRouteChangeComplete)
        })
    }, [router])


    const navigationProjectsQueryResult = useQuery(['navigationProjects'], () => getNavigationProjects())
    const navigationProjectsData = navigationProjectsQueryResult.data?.allProjects
    const socialLinksQueryResult = useQuery(['socialLinks'], () => getAllSocialLinks())
    const socialLinksData = socialLinksQueryResult.data?.allSocialLinks

    useEffect(() => {
        let navigationProjectsLinks:Array<NavItem> = []
        if(navigationProjectsData?.length && socialLinksData?.length) {
            for(let navigationProject of navigationProjectsData) {
                navigationProjectsLinks.push({
                    title: navigationProject.title,
                    path: `/projects/${navigationProject.handle}`,
                    handle: navigationProject.handle,
                    subItems: []
                })
            }

            setNavItems(
                [
                    {
                        title: 'Home',
                        path: '/',
                        handle: '/',
                        subItems: []
                    },
                    {
                        title: 'Projects',
                        path: '/',
                        handle: '/projects/',
                        subItems: navigationProjectsLinks
                    },
                ]
            )
            setSocialLinkItems(socialLinksData)
            setLoading(false)
        }
    }, [navigationProjectsData, socialLinksData])

    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement | null>(null)

    function handleSelect(e: MouseEvent, sId:Array<number | null>):void {
        if(JSON.stringify(sId) !== JSON.stringify(selectedItem)) {
            setSelectedItem([...sId])
        }
        setMenuOpen(false)
    }

    useEffect(() => {

        if(menuOpen && menuRef.current) {
            menuRef.current.classList.remove('hidden')
            setTimeout(() => {
                if(menuRef.current) {
                    menuRef.current.classList.remove('-translate-x-full')
                    menuRef.current.classList.add('-translate-x-0')
                }
            }, 20)
        } else if(!menuOpen && menuRef.current) {
            menuRef.current.classList.add('-translate-x-full')
            menuRef.current.classList.remove('-translate-x-0')
        }
        
    }, [menuOpen])
    
    function handleTransitionEnd() {
        if(!menuOpen && menuRef.current) {
            menuRef.current.classList.add('hidden')
        }
    }

    return (
        <>
            {!!loading && (
                <></>
            )}
            {!!!loading && (
                <>
                    <div role="button" className="z-10 flex items-center gap-2 fixed top-0 left-0 w-screen h-14 px-4 bg-zinc-900 border border-zinc-50/20 lg:hidden" onClick={() => setMenuOpen(true)}>
                        <Image src={navIcon} alt="Navigation" className="w-10 h-10" />
                    </div>
                    <div ref={menuRef} onTransitionEnd={handleTransitionEnd} className="z-20 lg:z-0 fixed h-full transition-all duration-500 -translate-x-full w-full hidden lg:block lg:relative lg:transition-none lg:duration-0 lg:translate-x-0 lg:w-auto lg:col-span-3 2xl:col-span-2 bg-zinc-900 border border-zinc-50/20">
                        <div className="lg:sticky lg:top-0 lg:left-0 lg:h-screen lg:overflow-auto py-4 px-4">
                            <div className="flex gap-2 items-center">
                                <Image src={navIcon} alt="Navigation" className="w-10 h-10" />
                                <span>NAVIGATION</span>
                            </div>
                            <div className="mt-4">
                                {navItems.map((navItem, navItemIndex, array) => (
                                    <Fragment key={navItemIndex}>
                                        <MenuItem 
                                            href={navItem.path || ''}
                                            onClick={(e) => handleSelect(e, [navItemIndex, null])}
                                            selected={selectedItem[0] === navItemIndex}
                                        >
                                            {navItem.title}
                                        </MenuItem>
                                        <div className={selectedItem[0] === navItemIndex ? "transition-all border-l border-l-zinc-50" : "transition-all border-l border-l-transparent"}>
                                            {navItem?.subItems?.map((subItem, subItemIndex, array) => (
                                                <MenuItem
                                                    href={subItem.path || ''}
                                                    key={subItemIndex}
                                                    sub={true}
                                                    onClick={(e) => handleSelect(e, [navItemIndex, subItemIndex])}
                                                    selected={selectedItem[1] === subItemIndex}
                                                >
                                                    {subItem.title}
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                            <div className="mt-4 select-none">Connect with me</div>
                            <div>
                                {socialLinkItems.map((linkItem) => (
                                    <MenuItem 
                                        href={linkItem.url || ''}
                                        key={linkItem._key}
                                        target="_blank"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Image src={linkItem.socialIcon?.asset?.url || ''} width={32} height={32} alt={linkItem.title || ''} className="w-5 h-5" />
                                            <span className="font-medium">{linkItem.title}</span>
                                            <Image src={linkIcon} alt={linkItem.title || ''} className="w-4 h-4" />
                                        </div>
                                    </MenuItem>
                                ))}
                            </div>
                        </div>
                        <div role="button" className="flex items-center justify-center gap-2 absolute top-0 right-0 mr-4 mt-5 h-8 w-8 bg-white rounded-full lg:hidden" onClick={() => setMenuOpen(false)}>
                            <Image src={closeIcon} alt="Navigation" className="w-3 h-3" />
                        </div>
                    </div>
                </>
            )}
        </>

    )

}