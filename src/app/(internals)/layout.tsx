"use client"
import React, {useEffect, useState, SetStateAction} from "react"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import Script from "next/script"
import {Provider} from "react-redux"
import {makeStore as store} from "@/lib/storePages"
import {appClient} from "@/lib/utils"
import {ApolloProvider} from "@apollo/client"
import "../globals.css"
import "../../../scss/main.scss"

export default function RootLayout({children}: {children: React.ReactNode}) {
    const [client, setClient] = useState(appClient || undefined)
    const [hostState, setHostState] = useState("")

    useEffect(() => {
        let host = typeof window !== "undefined" && window?.location.hostname
        let BASE_URL = `http://${host}:2095/graphql`
        if (process.env.APP_ENV === "prod") {
            // BASE_URL = `https://${host}:2096`
            BASE_URL = `https://${host}:2096/graphql`
        }
        setClient(appClient(BASE_URL))
        setHostState(host as SetStateAction<string>)
    }, [])
    return (
        <ApolloProvider client={client}>
            <Provider store={store()}>
                {/* <Loader /> */}

                <html lang="en">
                    <body>{children}</body>
                </html>
                <Script
                    id="pp"
                    src={`https://www.paypal.com/sdk/js?client-id=${
                        process.env.APP_ENV === "prod" ? process.env.PP_CID : process.env.PPS_CID
                    }&currency=GBP`}
                />

                {hostState != "localhost" && <GoogleAnalytics />}
            </Provider>
        </ApolloProvider>
    )
}