import {render, screen, act, waitFor, fireEvent} from "@testing-library/react"
import ApolloMockProvider from "@/mocks/apollo-mock-provider"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import "@testing-library/dom"
import "@testing-library/jest-dom"

import React from "react"
import {makeStore as store} from "../lib/storePages"
import {Provider} from "react-redux"
import {Main} from "@/_pages"
import App from "@/_pages/_app"

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null,
        }
    },
    usePathname() {
        return {
            prefetch: () => null,
        }
    },
}))

const mocks = []

describe("App tests", () => {
    const {APP_NAME, APP1_NAME} = process.env
    const main = (
        <Provider store={store()}>
            <ApolloMockProvider mocks={mocks}>
                <Main />
            </ApolloMockProvider>
        </Provider>
    )

    it("should render", () => {
        const {container} = render(main)
        expect(container).toMatchSnapshot()
    })

    it("should contain the switch button text", () => {
        render(main)
        // screen.debug()
        const button: HTMLElement = screen.getByText(/Local Switch/i)
        expect(button).toBeInTheDocument()
    })
    

})
