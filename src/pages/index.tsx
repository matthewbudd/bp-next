"use client"
import dynamic from "next/dynamic"
import Cookies from "cookies"
import {useAppSelector} from "@/lib/hooks"
import {user} from "@/components/Authentication/Login"

const Main = dynamic(() => import("@/components/Home/Main"), {ssr: true})
const Web = dynamic(() => import("@/components/Home/Web"), {ssr: true})

const Home = (props) => {
    const globalState = useAppSelector((state) => state.global)
    const {site} = globalState

    return (
        <>
            {site == "main" ||
            props.host === "example.co.uk" ||
            props.host === "www.example.co.uk" ? (
                <Main {...props} />
            ) : (
                <Web {...props} />
            )}
            {/* {site == "web" && <Web />} */}
        </>
    )
}

export default Home

export async function getServerSideProps(props) {
    let host = props.req.headers.host
    const cookies = new Cookies(props.req, props.res)
    let protocol = "http://"
    if (process.env.APP_ENV === "prod") {
        protocol = "https://"
    }
    const token = cookies.get("token") || null
    const userObject = token ? await user(token) : {user: {name: null, roles: [""]}}
    const userData = userObject.user
    return {
        props: {
            user: userData,
            host,
            revalidate: 10,
        },
    }
}
