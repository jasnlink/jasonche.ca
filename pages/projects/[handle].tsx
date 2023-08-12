import { queryClient } from '@/src/api'
import { useQuery } from 'react-query'
import { getProjectByHandle, getProfileCard, getNavigationProjects } from '@/src/api'
import { Projects } from '@/src/generated/graphql'
import { RootQuery } from '@/src/generated/graphql'
import { GetProjectByHandleQuery } from '@/src/generated/graphql'

interface Params {
    params:Handle
}
interface Handle {
    handle:string;
}
interface PageProps {
    projectData:string;
}

export async function getStaticPaths() {
    await queryClient.prefetchQuery(['navigationProjects'], () => getNavigationProjects())
    const navigationProjectsData:RootQuery | undefined = await queryClient.getQueryData(['navigationProjects'])
    if(navigationProjectsData) {
        const paths = navigationProjectsData.allProjects.map((navProject) => {
            return {
                params: {
                    handle: navProject.handle
                }
            }
        })
        const staticDataReturn = {
            paths,
            fallback: true
        }
        return staticDataReturn
    }
}

export async function getStaticProps({ params }:Params) {

    async function getProjectDataByHandle(handle:string) {
        await queryClient.prefetchQuery(['projectByHandle'], () => getProjectByHandle({searchHandle: handle}))
        const projectByHandleQueryResult:GetProjectByHandleQuery | undefined = await queryClient.getQueryData(['projectByHandle'])
        return {
            handle,
            projectByHandleQueryResult
        }
    }

    const projectDataByHandle = await getProjectDataByHandle(params.handle)
    let projectDataResult:Array<Projects> | undefined = []

    if(projectDataByHandle !== undefined) {
        projectDataResult = projectDataByHandle?.projectByHandleQueryResult?.allProjects
    }

    if (projectDataResult === undefined || !projectDataResult.length) {
        return {
            notFound: true
        }
    }
    
    const projectData = JSON.stringify(projectDataResult[0])
    
    return {
        props: {
            projectData,
        },
        revalidate: 60,
    }

}

import { useRouter } from "next/router"
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from "react";
import Text from "@/src/components/Text";
import ContentBlock from '@/src/components/ContentBlock';

export default function Page({ projectData }:PageProps) {

    const [loading, setLoading] = useState<boolean>(true)
    const [pageContent, setPageContent] = useState<Projects>({})

    const router = useRouter();
    let handle = '';
    if(router.query.handle) {
        handle = router.query.handle[0];
    }

    useEffect(() => {
        if(projectData) {
            const parsedAllProjectData = JSON.parse(projectData)
            setPageContent(parsedAllProjectData)
            setLoading(false)
        }
    }, [projectData])

    const profileCardQueryResult = useQuery(['profileCard'], () => getProfileCard())
    const pageTitle = `${profileCardQueryResult.data?.allProfileCard[0].fullName} - ${pageContent?.title ?? ``}`

    const SourceCodeButton = pageContent?.githubSourceUrl ? (<Link className="mt-4 max-w-xs mx-auto sm:mx-0 text-black bg-zinc-50 font-medium rounded-sm py-2 px-4 text-center select-none block border border-transparent transition-all hover:bg-transparent hover:text-zinc-50 hover:border-zinc-50" href={pageContent?.githubSourceUrl ?? ""} target="_blank">See source code</Link>) : null
    const LiveDemoButton = pageContent?.liveDemoUrl ? (<Link className="mt-4 max-w-xs mx-auto sm:mx-0 text-black bg-zinc-50 font-medium rounded-sm py-2 px-4 text-center select-none block border border-transparent transition-all hover:bg-transparent hover:text-zinc-50 hover:border-zinc-50" href={pageContent?.liveDemoUrl ?? ""} target="_blank">See live demo</Link>) : null

    if (router.isFallback) {
        return <div>loading...</div>
    }

    if(loading) {
        return <div>loading...</div>
    } else {
        return (
            <>
                <Head>
                    <title>{pageTitle}</title>
                    <meta property="description" content={pageContent?.seoDesc ?? ``} />
                </Head>
                <Text sx={`mt-6`} variant="title">{pageContent?.title}</Text>
                <ContentBlock sx={`mt-6 mb-8`} gap={4} content={pageContent?.contentRaw} />
                {LiveDemoButton}
                {SourceCodeButton}
            </>
        )
    }
}
