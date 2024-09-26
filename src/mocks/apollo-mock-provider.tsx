import React from "react"
import {makeStore as store} from "@/lib/storePages"
import {Provider} from "react-redux"
import {MockedProvider, MockedResponse} from "@apollo/client/testing"

interface ApolloMockProviderProps {
    mocks: MockedResponse[]
    children: React.ReactNode
}

const ApolloMockProvider: React.FC<ApolloMockProviderProps> = ({mocks, children}) => (
    <Provider store={store()}>
        <MockedProvider mocks={mocks} addTypename={false}>
            {children}
        </MockedProvider>
    </Provider>
)

export default ApolloMockProvider
