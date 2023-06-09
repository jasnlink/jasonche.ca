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
    const pageTitle = `${profileCardQueryResult.data?.allProfileCard[0].fullName} - ${pageContent?.title || ''}`

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
                    <meta property="og:title" content={pageTitle} key="title" />
                </Head>
                <Text mt={6} variant="title">{pageContent?.title}</Text>
                <ContentBlock mt={6} gap={4} content={pageContent?.contentRaw} />
            </>
        )
    }
}
