import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

import { getSdk } from "./generated/graphql";

const gqlClient =  new GraphQLClient("https://q8h9ggfv.api.sanity.io/v1/graphql/production/default");
export const { getAllProjects, getNavigationProjects, getProfileCard, getProjectByHandle } = getSdk(gqlClient);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    }
})