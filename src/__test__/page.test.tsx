import {render, screen, act, waitFor, fireEvent} from "@testing-library/react"
import ApolloMockProvider from "@/mocks/apollo-mock-provider"
import "@testing-library/dom"
import "@testing-library/jest-dom"

import React from "react"
import {makeStore as store} from "../lib/storePages"
import {Provider} from "react-redux"
import Home from "@/pages"

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

    const {container} = render(
        <Provider store={store()}>
            <ApolloMockProvider mocks={mocks}>
                {act(() => (
                    <Home />
                ))}
            </ApolloMockProvider>
        </Provider>,
    )

    it("should render", async () => {
        await waitFor(() => new Promise((res) => setTimeout(res, 0)))
        expect(container).toMatchSnapshot()
    })
})
