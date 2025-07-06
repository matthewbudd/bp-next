import {render, screen, waitFor, fireEvent, cleanup} from "@testing-library/react"
import ApolloMockProvider from "@/mocks/apollo-mock-provider"
import "@testing-library/dom"
import "@testing-library/jest-dom"

import React from "react"
import {makeStore as store} from "../lib/storePages"
import {Provider} from "react-redux"
import Home from "@/app/(internals)/page"
import {INC_SUBSCRIPTION} from "@/components/Messaging"
import Local from "@/components/Home/Local"
import {setSite} from "@/features/global/globalSlice"

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

const mocks = [
    {
        request: {
            query: INC_SUBSCRIPTION,
            variables: {},
        },
        result: {
            data: {
                newMessage: {value: 0},
            },
        },
    },
]

afterEach(cleanup)

describe("App tests", () => {
    const {APP_NAME, APP1_NAME} = process.env
    const main = (
        <ApolloMockProvider mocks={mocks}>
            <Provider store={store()}>
                <Home />
            </Provider>
        </ApolloMockProvider>
    )

    it("should render", async () => {
        const {container} = render(main)
        await waitFor(() => {
            expect(container).toMatchSnapshot()
        })
    })

    it("should contain the switch button text", async () => {
        render(main)
        await waitFor(async () => {
            // screen.debug()
            const button: HTMLElement = screen.getByText(/Local Switch/i)
            expect(button).toBeInTheDocument()
        })
    })

    it("should call correct function on switch click", () => {
        const siteSwitch = jest.fn()
        const {getByText} = render(
            <Local
                switch={{
                    local: true,
                    dispatch: () => {},
                    site: "web",
                    setSite,
                    siteSwitch,
                }}
            />,
        )
        fireEvent.click(getByText("Local Switch"))
        // screen.debug(getByText("Local Switch"), 20000)
        expect(siteSwitch).toHaveBeenCalledTimes(1)
    })

    it("should contain different app name between switches", async () => {
        const {container} = render(main)
        await waitFor(async () => {
            const h2: HTMLElement | null = container.querySelector("h2")
            expect(h2).not.toBeNull()
            expect(h2?.textContent).toBe(APP_NAME)
            const button = screen.getByText(/Local Switch/i)
            fireEvent.click(button)
        })
        await waitFor(async () => {
            const h2Clicked: HTMLElement | null = container.querySelector("h2")
            expect(h2Clicked).not.toBeNull()
            expect(h2Clicked?.textContent).toBe(APP1_NAME)
        })
    })
})
