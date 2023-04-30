import { useRouter } from "next/router"
import Head from 'next/head'
import { useEffect, useState, Fragment } from "react";
import Text from "@/src/components/Text";
import List from "@/src/components/List";
import LightboxImage from "@/src/components/LightboxImage";
import { JsxElement } from "typescript";

export default function Page() {
    const router = useRouter();
    const handle = router.query.handle;

    type PageContentHandle = string
    interface PageContent {
        title:string;
        contentBlocks:Array<ContentBlock>;
    }
    interface ContentBlock {
        type:string;
        values:Array<string>;
    }

    
    const [loading, setLoading] = useState<boolean>(true)
    const [pageContent, setPageContent] = useState<PageContent>({
        title: '',
        contentBlocks: [],
    })
    
    useEffect(() => {

        const pageContentList:Record<PageContentHandle, PageContent> = {
            'res-simple-booking-online-appointment-software': {
                title: 'RES Simple Booking - Online Appointment Sofware - 2023',
                contentBlocks: [
                    {
                        type: 'page_title',
                        values: ['RES Simple Booking - Online Appointment Sofware - 2023']
                    },
                    {
                        type: 'image_vertical',
                        values: ['https://msmtech.ca/wp-content/uploads/2023/04/1.png', 'https://msmtech.ca/wp-content/uploads/2023/04/2.png']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Features']
                    },
                    {
                        type: 'list',
                            values: [
                                'User-friendly online appointment booking.',
                                'Receive text message notifications for new bookings.',
                                'Integrated calendar to easily view and manage appointments.',
                                'Smart timeslot management to keep track of booked times.',
                                'Built with modern technology for a seamless experience.'
                            ]
                    },
                    {
                        type: 'sub_heading',
                            values: ['Problem']
                    },
                    {
                        type: 'paragraph',
                            values: ['Business owners needed a streamlined way to manage appointments and communicate with clients.']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Purpose']
                    },
                    {
                        type: 'paragraph',
                            values: ['RES Simple Booking aims to simplify appointment scheduling and enhance communication between business owners and their clients.']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Challenges']
                    },
                    {
                        type: 'list',
                            values: [
                                'Creating an intuitive user interface for booking appointments.',
                                'Implementing text message notifications for new bookings.',
                                'Efficiently managing timeslots and calendar integration.',
                            ]
                    },
                    {
                        type: 'image_vertical',
                        values: ['https://msmtech.ca/wp-content/uploads/2023/04/3.png', 'https://msmtech.ca/wp-content/uploads/2023/04/4.png', 'https://msmtech.ca/wp-content/uploads/2023/04/5.png']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2023/04/6.png']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Technologies used']
                    },
                    {
                        type: 'list',
                            values: [
                                'Javascript ES12',
                                'React Frontend Framework',
                                'Mantine UI Design System',
                                'REST API Controllers',
                                'NodeJS Backend',
                                'Express Middleware',
                                'MySQL Database',
                                'Amazon SNS Notifications',
                            ]
                    },
                ] 
            },
            'realpos-desktop-pos-software': {
                title: 'realPOS Desktop POS Software - 2022',
                contentBlocks: [
                    {
                        type: 'page_title',
                        values: ['realPOS Desktop POS Software - 2022']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/09/4.png']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Features']
                    },
                    {
                        type: 'list',
                            values: [
                                'Secure and reliable centralized offline system.',
                                'Compatible with any operating system.',
                                'User-friendly touchscreen interface.',
                                'Effortlessly manage orders, customers, and tables with multiple staff.',
                                'Fully customizable menu options.'
                            ]
                    },
                    {
                        type: 'sub_heading',
                            values: ['Purpose']
                    },
                    {
                        type: 'paragraph',
                            values: [
                                'Designed as a standalone, centralized, offline POS software system, it is compatible with any operating system due to the Electron.js wrapper. The use of web technologies allows for easy modifications to its functionality and layout. Its offline and system-agnostic nature ensures security, reliability, and compatibility.',
                                'Featuring a simple, intuitive button bar layout, it enables seamless touch-screen management of billing, customers, and tables.'
                            ]
                    },
                    {
                        type: 'sub_heading',
                            values: ['Challenges faced']
                    },
                    {
                        type: 'list',
                            values: [
                                'Adapting web technologies to a native desktop environment using Electron.js and SQLite is challenging.',
                                'Complex data structures emerged as functionality expanded.'
                            ]
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/09/1.png']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/09/2.png']
                    },
                    {
                        type: 'paragraph',
                        values: ['Uses a keypad system to quickly punch in tables.']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/09/5.png']
                    },
                    {
                        type: 'paragraph',
                        values: ['Intuitive bill splitting screen.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Technologies used']
                    },
                    {
                        type: 'list',
                        values: ['Javascript ES12', 'React Frontend Framework', 'Bootstrap Styling System', 'Electron.js Desktop Application Wrapper', 'SQLite Local Database']
                    },
                ] 
            },
            'mealportal-online-pickup-delivery-ordering-software': {
                title: 'MealPortal - Online Pickup and Delivery Ordering Software - 2022',
                contentBlocks: [
                    {
                        type: 'page_title',
                        values: ['MealPortal - Online Pickup and Delivery Ordering Software - 2022']
                    },
                    {
                        type: 'image_vertical',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/2-5.jpg', 'https://msmtech.ca/wp-content/uploads/2022/04/8-3.jpg']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Features']
                    },
                    {
                        type: 'list',
                        values: ['User-friendly interface for customers to place orders and staff to manage them.', 'Safe and easy system for recognizing users by sending a unique code to their email.', 'Prevent incorrect delivery addresses with Google Maps assistance.', 'Instant updates on new orders and order status.', 'Customize menu items, categories, and options to your liking.', 'Set the hours, delivery areas, fees, and minimum orders for your restaurant.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Problem']
                    },
                    {
                        type: 'paragraph',
                        values: ['The client required a modern system for managing online pickup and delivery orders.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Purpose']
                    },
                    {
                        type: 'paragraph',
                        values: ['To enable customers to place food orders online using a without needing a password and allow restaurants to manage orders efficiently.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Solution']
                    },
                    {
                        type: 'paragraph',
                        values: ['Authenticate and remember customers using JWT tokens after verifying their emails with time-sensitive passcodes.', 'Utilize Google Maps Address Autocomplete for new users.', 'Allow restaurant staff to manage menu categories, products, product options, and set delivery fees, minimum orders, and delivery distances.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Challenges']
                    },
                    {
                        type: 'list',
                        values: ['Implementing secure authentication without account creation.', 'Integrating PayPal and Stripe for payment processing.', 'Real-time notification of new orders using a POST request from the frontend React app to the backend NodeJS server, storing data in a MySQL database, and updating staff frontend with socket.io.']
                    },
                    {
                        type: 'image_vertical',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/3-6.jpg', 'https://msmtech.ca/wp-content/uploads/2022/04/4-4.jpg']
                    },
                    {
                        type: 'paragraph',
                        values: ['Email one-time passcode authentication']
                    },
                    {
                        type: 'image_vertical',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/6-3.jpg', 'https://msmtech.ca/wp-content/uploads/2022/04/5-3.jpg']
                    },
                    {
                        type: 'paragraph',
                        values: ['Order time selection and Google Maps API address autocomplete.']
                    },
                    {
                        type: 'image_vertical',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/11-2.jpg', 'https://msmtech.ca/wp-content/uploads/2022/04/13.jpg']
                    },
                    {
                        type: 'paragraph',
                        values: ['Placing an order and paying for it.']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/2-4.jpg']
                    },
                    {
                        type: 'paragraph',
                        values: ['Order management backend.']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/5-2.jpg']
                    },
                    {
                        type: 'paragraph',
                        values: ['Menu customization dialog.']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/8-2.jpg']
                    },
                    {
                        type: 'paragraph',
                        values: ['Menu schedule planning tool.']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/9.jpg']
                    },
                    {
                        type: 'paragraph',
                        values: ['Restaurant delivery zone fees and distance planning tool.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Technologies used']
                    },
                    {
                        type: 'list',
                        values: ['Javascript ES12', 'React Frontend Framework', 'Material UI Design System', 'REST API Controllers', 'JSON web token authentication', 'Google Maps Javascript API', 'Paypal Payment SDK', 'Stripe Payment Gateway', 'NodeJS Backend Controller', 'MySQL Connected Database', 'HTML Markup Language', 'CSS Styling System', 'NGINX Web Server', 'Linux Cloud VPS']
                    },
                ] 
            },
            'aycehub-tableside-scan-to-order-system': {
                title: 'AYCEHub - Tableside Scan to Order System - 2022',
                contentBlocks: [
                    {
                        type: 'page_title',
                        values: ['AYCEHub - Tableside Scan to Order System - 2022']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/AnimationFull1.gif']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Features']
                    },
                    {
                        type: 'list',
                        values: ['User-friendly interface for customers to place orders and staff to manage them.', 'Safe and easy system for recognizing users by sending a unique code to their email.', 'Prevent incorrect delivery addresses with Google Maps assistance.', 'Instant updates on new orders and order status.', 'Customize menu items, categories, and options to your liking.', 'Set the hours, delivery areas, fees, and minimum orders for your restaurant.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Problem']
                    },
                    {
                        type: 'paragraph',
                        values: ['All-you-can-eat restaurants need an efficient way to send customer orders directly to the kitchen.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Purpose']
                    },
                    {
                        type: 'paragraph',
                        values: ['The app enables customers to scan a QR code at their table to order food, which is then printed in the kitchen, eliminating paper checklists and reducing staff requirements.', 'This cost-effective solution is more hygienic than using tablets at each table, especially during COVID.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Solution']
                    },
                    {
                        type: 'paragraph',
                        values: ['Utilize a local machine running a NodeJS server that listens for requests from the web app\'s backend, receives orders, and sends them to the kitchen\'s thermal printers.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Challenges']
                    },
                    {
                        type: 'list',
                        values: ['Connecting orders from the web app to local thermal printers.']
                    },
                    {
                        type: 'image_vertical',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/4-2.jpg', 'https://msmtech.ca/wp-content/uploads/2022/04/2-3.jpg']
                    },
                    {
                        type: 'paragraph',
                        values: ['Customer view after scanning the QR code.']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/2-2.jpg']
                    },
                    {
                        type: 'paragraph',
                        values: ['Order management screen to see what each table ordered.']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/1-2.jpg']
                    },
                    {
                        type: 'paragraph',
                        values: ['Table management system to manage orders and QR codes assigned.']
                    },
                    {
                        type: 'sub_heading',
                        values: ['Technologies used']
                    },
                    {
                        type: 'list',
                        values: ['Javascript ES12', 'React Frontend Framework', 'Material UI Design System', 'nodeJS Backend Controller', 'Express Backend Framework', 'MySQL Connected Database', 'HTML Markup Language', 'CSS Styling', 'NGINX Web Server', 'Git Versioning System', 'Linux Cloud VPS']
                    },
                ] 
            },
            'simplemenu-interactive-ordering-pickup-management-software': {
                title: 'SimpleMenu - Interactive Pickup Order Management Software - 2020',
                contentBlocks: [
                    {
                        type: 'page_title',
                        values: ['SimpleMenu - Interactive Pickup Order Management Software - 2020']
                    },
                    {
                        type: 'image_vertical',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/3-2.jpg', 'https://msmtech.ca/wp-content/uploads/2022/04/4.jpg']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Features']
                    },
                    {
                        type: 'list',
                            values: [
                                'User-friendly interactive menu with detailed product information.',
                                'Cart system with order summary for a clear overview of your order.',
                                'Generate a QR code to share your order with staff.',
                                'Manage menu items securely with the backend system.'
                            ]
                    },
                    {
                        type: 'sub_heading',
                            values: ['Problem']
                    },
                    {
                        type: 'paragraph',
                            values: ['The client needed a solution for customers to browse their menu online.']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Purpose']
                    },
                    {
                        type: 'paragraph',
                            values: ['The app allows customers to view the menu, generate a QR code upon ordering, and show it to the cashier for a convenient experience, even when the cashier is busy.']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Solution']
                    },
                    {
                        type: 'paragraph',
                            values: [
                                'Hosted frontend and backend on the same VPS, served frontend on an NGINX web server with static React files, and backend on a NodeJS server with Express middleware. Configured a proxy pass in NGINX settings for API requests.',
                                'Created a secure CRUD interface for interacting with the MySQL database, featuring login authentication for menu management.'
                            ]
                    },
                    {
                        type: 'sub_heading',
                            values: ['Challenges']
                    },
                    {
                        type: 'list',
                            values: [
                                'Hosting frontend and backend on the same VPS.',
                                'Providing an easy-to-use interface for menu management.'
                            ]
                    },
                    {
                        type: 'image_vertical',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/5.jpg', 'https://msmtech.ca/wp-content/uploads/2022/04/6-1.jpg']
                    },
                    {
                        type: 'paragraph',
                            values: [
                                'Customers get an order summary and a QR code that they present to the cashier.',
                            ]
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/11.jpg']
                    },
                    {
                        type: 'paragraph',
                            values: [
                                'Management backend to allow the staff to make changes to the menu.',
                            ]
                    },
                    {
                        type: 'sub_heading',
                            values: ['Technologies used']
                    },
                    {
                        type: 'list',
                        values: ['Javascript ES12', 'React Frontend Framework', 'Material UI Design System', 'nodeJS Backend Controller', 'Express Backend Framework', 'MySQL Connected Database', 'HTML Markup Language', 'CSS Styling', 'NGINX Web Server', 'Git Versioning System', 'Linux Cloud VPS']
                    },
                ] 
            },
            'primeelo-rank-boosting-service-for-league-of-legends': {
                title: 'PrimeElo - Rank Booting Service for League of Legends - 2015',
                contentBlocks: [
                    {
                        type: 'page_title',
                        values: ['PrimeElo - Rank Booting Service for League of Legends - 2015']
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/1.jpg']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Problem']
                    },
                    {
                        type: 'paragraph',
                            values: ['Players needed an effortless way to rank up in their games.']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Purpose']
                    },
                    {
                        type: 'paragraph',
                            values: ['The platform connects players seeking rank boosts with skilled agents who can play on their behalf for a fee.']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Challenges']
                    },
                    {
                        type: 'list',
                            values: [
                                'Establish trust by displaying Facebook and Twitter likes/followers.',
                                'Enable users to track order progress using PHP and Riot Games API.',
                                'Use JavaScript and jQuery to calculate ranks, prevent invalid selections, and fetch real-time prices from the database.'
                            ]
                    },
                    {
                        type: 'image_horizontal',
                        values: ['https://msmtech.ca/wp-content/uploads/2022/04/2.jpg']
                    },
                    {
                        type: 'sub_heading',
                            values: ['Technologies used']
                    },
                    {
                        type: 'list',
                        values: ['Javascript', 'jQuery', 'mySQL Connected Database', 'HTML Markup Language', 'CSS Styling', 'PHP Backend Controller']
                    },
                ] 
            },
        }

        if(handle) {
            setPageContent(pageContentList[handle[0]])
            setLoading(false)
        }
    }, [handle])

    if(loading) {
        return <div>loading...</div>
    } else {
        return (
            <>
                <Head>
                    <title>Jason Che - Full Stack Web Software Developer - {pageContent.title}</title>
                    <meta property="og:title" content="Jason Che - Full Stack Web Software Developer" key="title" />
                </Head>
                {pageContent.contentBlocks.map((content, index, array) => {
                    if(content.type === 'page_title') {
                        return (
                            <Fragment key={index}>
                                {content.values.map((value, index, array) => {
                                    return <Text key={index} variant="title">{value}</Text>
                                })}
                            </Fragment>
                        )
                    } else if(content.type === 'sub_heading') {
                        return (
                            <Fragment key={index}>
                                {content.values.map((value, index, array) => {
                                    return <Text key={index} variant="subheading">{value}</Text>
                                })}
                            </Fragment>
                        )
                    } else if(content.type === 'paragraph') {
                        return (
                            <Fragment key={index}>
                                {content.values.map((value, index, array) => {
                                    return <Text key={index} variant="paragraph">{value}</Text>
                                })}
                            </Fragment>
                        )
                    } else if(content.type === 'image_horizontal') {
                        return (
                            <Fragment key={index}>
                                {content.values.map((value, index, array) => {
                                    return <LightboxImage key={index} src={value} alt="Image" title="Image" direction="horizontal" />
                                })}
                            </Fragment>
                        )
                    } else if(content.type === 'image_vertical') {
                        return (
                            <Fragment key={index}>
                                <div className="flex gap-2 aspect-video justify-center my-8">
                                    {content.values.map((value, index, array) => {
                                        return <LightboxImage key={index} src={value} alt="Image" title="Image" direction="vertical" />
                                    })}
                                </div>
                            </Fragment>
                        )
                    } else if(content.type === 'list') {
                        return (
                            <List key={index}>
                                {content.values.map((value, index, array) => {
                                    return <li key={index}>{value}</li>
                                })}
                            </List>
                        )
                    }
                })}
            </>
        )
    }
}