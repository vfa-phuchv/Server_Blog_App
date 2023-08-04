import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo"

const graphQLconfig: ApolloDriverConfig = {
    driver: ApolloDriver,
    typePaths: ['./**/*.graphql'],
    path: '/graphql',
    playground: {
        endpoint: '/graphql'
    },
}

export default graphQLconfig;