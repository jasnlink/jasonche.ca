import { useQuery } from 'react-query'
import { getProjectByHandle, getProfileCard } from '@/src/api'

import { useRouter } from "next/router"
import Head from 'next/head'
import { useEffect, useState, Fragment } from "react";
import Text from "@/src/components/Text";
import ContentBlock from '@/src/components/ContentBlock';

import { Projects } from '@/src/generated/graphql';

export default function Page() {

    
    const [loading, setLoading] = useState<boolean>(true)
    const [pageContent, setPageContent] = useState<Projects>({})

    const router = useRouter();
    let handle = '';
    if(router.query.handle) {
        handle = router.query.handle[0];
    }
    const projectByHandleQueryResult = useQuery(['projectByHandle'], () => getProjectByHandle({searchHandle: handle}), { enabled : false})
    const profileCardQueryResult = useQuery(['profileCard'], () => getProfileCard())
    const pageTitle = `${profileCardQueryResult.data?.allProfileCard[0].fullName} - ${pageContent?.title || ''}`

    useEffect(() => {
        if(handle) {
            projectByHandleQueryResult.refetch()
        }
    }, [handle, projectByHandleQueryResult])

    useEffect(() => {
        if(projectByHandleQueryResult.data) {
            setPageContent(projectByHandleQueryResult.data.allProjects[0])
            setLoading(false)
        }
    }, [projectByHandleQueryResult.data])
    
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