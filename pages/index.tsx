import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    return (
        <>
            <Head>
                <title>Jason Che - Full Stack Web Software Developer</title>
                <meta property="og:title" content="Jason Che - Full Stack Web Software Developer" key="title" />
            </Head>
            <div className="h-full flex items-center justify-center">
                <div className="mx-auto max-w-md bg-zinc-900 p-12 rounded-sm">
                    <Image src="/jason-che.jpg" alt="Jason Che" height={100} width={100} className="rounded-full" />
                    <div className="mt-6 font-medium text-4xl">Jason Che</div>
                    <div className="mt-6">I am a <span className="font-extrabold">full stack web software developer</span> with enterprise network infrastructure knowledge. I specialize in <span className="font-extrabold">Javascript and React</span>.</div>
                    <div className="mt-6">My focus is on product vision, connecting frontend with backend technologies, and UI/UX design.</div>
                    <div className="mt-6">Frontend: 11 years</div>
                    <div className="mt-4">Full Stack: 10 years</div>
                    <Link className="mt-8 text-black bg-zinc-50 font-medium rounded-sm py-2 px-4 text-center select-none block border border-transparent transition-all hover:bg-transparent hover:text-zinc-50 hover:border-zinc-50" href="/Jason-Che_CV-en.pdf" target="_blank">See my resume</Link>
                </div>
            </div>
        </>
    )
}
