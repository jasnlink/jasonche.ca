import MenuItem from '@/src/components/MenuItem'
import { get } from 'https';
import { useRouter } from 'next/router';
import { Fragment, useState, MouseEvent, useEffect, useRef } from 'react'
import Image from 'next/image';
import githubIcon from '../../public/icon-github.svg'
import twitterIcon from '../../public/icon-twitter.svg'
import linkedinIcon from '../../public/icon-linkedin.svg'
import linkIcon from '../../public/icon-link.svg'
import navIcon from '../../public/icon-nav.svg'
import closeIcon from '../../public/icon-close.svg'
import emailIcon from '../../public/icon-email.svg'

export default function NavMenu() {

    const router = useRouter()
    const handle = router.query.handle
    const path = router.asPath

    const [selectedItem, setSelectedItem] = useState<Array<number | null>>([0, null])

    function getMatchingHandleId(searchHandle:string, itemList:Array<NavItem>):number | null {
        for(let i = 0; i < itemList.length; i++) {
            const item = itemList[i]

            if(item.handle === searchHandle) {
                return i
            }
            if(item.subItems.length) {
                return getMatchingHandleId(searchHandle, item.subItems)
            }
        }
        return null
    }
    useEffect(() => {
        if(handle) {
            if(path.includes('/projects/')) {
                let selectedHandleId = [getMatchingHandleId('/projects/', navItems), getMatchingHandleId(handle[0], navItems)]
                setSelectedItem([...selectedHandleId])
            }
        } else {
            let selectedHandleId = [0, null]
            setSelectedItem([...selectedHandleId])
        }
    }, [handle])


    interface NavItem {
        title: string;
        path: string | undefined;
        handle: string | undefined;
        subItems: Array<NavItem>;
    }

    const navItems:Array<NavItem> = [
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
            subItems: [
                {
                    title: 'RES Simple Booking - Online Appointment Sofware',
                    path: '/projects/res-simple-booking-online-appointment-software',
                    handle: 'res-simple-booking-online-appointment-software',
                    subItems: []
                },
                {
                    title: 'realPOS - Desktop POS Software',
                    path: '/projects/realpos-desktop-pos-software',
                    handle: 'realpos-desktop-pos-software',
                    subItems: []
                },
                {
                    title: 'MealPortal - Online Pickup and Delivery Ordering Software',
                    path: '/projects/mealportal-online-pickup-delivery-ordering-software',
                    handle: 'mealportal-online-pickup-delivery-ordering-software',
                    subItems: []
                },
                {
                    title: 'AYCEHub - Tableside Scan to Order System',
                    path: '/projects/aycehub-tableside-scan-to-order-system',
                    handle: 'aycehub-tableside-scan-to-order-system',
                    subItems: []
                },
                {
                    title: 'SimpleMenu - Interactive Pickup Order Management Software',
                    path: '/projects/simplemenu-interactive-ordering-pickup-management-software',
                    handle: 'simplemenu-interactive-ordering-pickup-management-software',
                    subItems: []
                },
                {
                    title: 'PrimeElo - Rank Boosting Service for League of Legends',
                    path: '/projects/primeelo-rank-boosting-service-for-league-of-legends',
                    handle: 'primeelo-rank-boosting-service-for-league-of-legends',
                    subItems: []
                },
            ]
        },
    ];

    interface SocialLink {
        icon: any;
        title: string;
        url: string;
    }

    const socialLinks:Array<SocialLink> = [
        {
            icon: linkedinIcon,
            title: 'LinkedIn',
            url: 'https://www.linkedin.com/in/jason-che-22612222a/',
        },
        {
            icon: githubIcon,
            title: 'Github',
            url: 'https://github.com/jasnlink/',
        },
        {
            icon: twitterIcon,
            title: 'Twitter',
            url: 'https://twitter.com/jasnlink',
        },
        {
            icon: emailIcon,
            title: 'contact@jasonche.ca',
            url: 'mailto:contact@jasonche.ca',
        },
    ];

    function handleSelect(e: MouseEvent, sId:Array<number | null>):void {
        if(JSON.stringify(sId) !== JSON.stringify(selectedItem)) {
            setSelectedItem([...sId])
        }
        setMenuOpen(false)
    }

    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement | null>(null)

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
            <div role="button" className="z-10 flex items-center gap-2 fixed top-0 left-0 w-screen h-14 px-4 bg-zinc-900 border border-zinc-50/20 lg:hidden" onClick={() => setMenuOpen(true)}>
                <Image src={navIcon} alt="Navigation" className="w-10 h-10" />
            </div>
            <div ref={menuRef} onTransitionEnd={handleTransitionEnd} className="z-20 lg:z-0 fixed h-full transition-all duration-500 -translate-x-full w-full hidden lg:block lg:relative lg:transition-none lg:duration-0 lg:translate-x-0 lg:w-auto lg:col-span-3 2xl:col-span-2 bg-zinc-900 border border-zinc-50/20 py-4 px-4">
                <div className="sticky top-4 left-0">
                    <div className="flex gap-2 items-center">
                        <Image src={navIcon} alt="Navigation" className="w-10 h-10" />
                        <span>NAVIGATION</span>
                    </div>
                    <div className="mt-4">
                        {navItems.map((navItem, navItemIndex, array) => (
                            <Fragment key={navItemIndex}>
                                <MenuItem 
                                    href={navItem.path}
                                    onClick={(e) => handleSelect(e, [navItemIndex, null])}
                                    selected={selectedItem[0] === navItemIndex}
                                >
                                    {navItem.title}
                                </MenuItem>
                                <div className={selectedItem[0] === navItemIndex ? "transition-all border-l border-l-zinc-50" : "transition-all border-l border-l-transparent"}>
                                    {navItem.subItems.map((subItem, subItemIndex, array) => (
                                        <MenuItem
                                            href={subItem.path}
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
                        {socialLinks.map((socialLink, socialLinkIndex, array) => (
                            <MenuItem 
                                href={socialLink.url}
                                key={socialLinkIndex}
                                target="_blank"
                            >
                                <div className="flex items-center gap-2">
                                    <Image src={socialLink.icon} alt={socialLink.title} className="w-5 h-5" />
                                    <span className="font-medium">{socialLink.title}</span>
                                    <Image src={linkIcon} alt={socialLink.title} className="w-4 h-4" />
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

    )

}