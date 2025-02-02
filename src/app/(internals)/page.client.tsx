"use client"
import {useState, useEffect} from "react"
import dynamic from "next/dynamic"
import {useAppSelector} from "@/lib/hooks"

const Main = dynamic(() => import("@/components/Home/Main"), {ssr: true})
const Web = dynamic(() => import("@/components/Home/Web"), {ssr: true})

export default function HomePage(props) {
    const [siteState, setSite] = useState(null)
    const globalState = useAppSelector((state) => state.global)
    const {site} = globalState
    console.log(props)
    console.log(site)

    useEffect(() => {
        setSite(site)
    }, [site])

    if (typeof window !== "undefined" && siteState !== null) {
        return (
            <>
                {/* <Main /> */}
                {siteState == "main" ||
                props.host === "mattbudd.co.uk" ||
                props.host === "www.mattbudd.co.uk" ? (
                    <Main {...props} />
                ) : (
                    <Web {...props} />
                )}
                {/* {site == "web" && <Web />} */}
            </>
        )
    }
}
