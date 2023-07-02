//pages/sitemap.xml.js
function generateSiteMap(urls) {

    const HOMEPAGE_URL = `https://www.jasonche.ca`

    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <!--We manually set the URLs we know already-->
            <url>
                <loc>${HOMEPAGE_URL}</loc>
            </url>
            ${urls.map(({ handle }: { handle:string; }) => {
                return `
                    <url>
                        <loc>${`${HOMEPAGE_URL}/projects/${handle}`}</loc>
                    </url>
                    `;
            }).join('')}
        </urlset>
    `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

import { queryClient } from '@/src/api'
import { getNavigationProjects } from '@/src/api';
import { RootQuery } from '@/src/generated/graphql';
import { Maybe } from '@/src/generated/graphql';

export async function getServerSideProps({ res }) {
    await queryClient.prefetchQuery(['navigationProjects'], () => getNavigationProjects())
    const navigationProjectsData:RootQuery | undefined = await queryClient.getQueryData(['navigationProjects'])

    interface Url {
        handle: Maybe<string> | undefined;
    }
    let urls:Array<Url> = []

    if(navigationProjectsData) {
        urls = navigationProjectsData.allProjects.map((project) => {
            return {
                handle: project.handle
            }
        })
    }

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(urls);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;