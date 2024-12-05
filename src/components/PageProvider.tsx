import {useState, useEffect, useRef, SetStateAction} from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
// import gsap plugins here
// import {ScrollToPlugin} from "gsap/ScrollToPlugin"
// import {MotionPathPlugin} from "gsap/MotionPathPlugin"
import {useAppSelector, useAppDispatch} from "@/lib/hooks"
import {loadGlobal, setSite} from "@/features/global/globalSlice"
import {timeout, siteSwitch} from "@/lib/utils"
import {/*Login, logOut,*/ user} from "@/components/Authentication/Login"
const Local = dynamic(() => import("@/components/Home/Local"), {ssr: true})

const PageProvider = (props) => {
    const [local, setLocal] = useState(true)
    const [pageTitle, setPageTitle] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [url, setUrl] = useState("/")
    const globalState = useAppSelector((state) => state.global)
    const {site, local: locale} = globalState
    const dispatch = useAppDispatch()

    useEffect(() => {
        // TODO try to get current host and alter user method
        const token = localStorage.getItem("x-access-token")
        const exp = localStorage.getItem("x-access-token-expiration")
        const isAuth = token && exp && exp > Date.now().toString()

        isAuth &&
            user(token)
                .then((currUser) => {
                    dispatch(
                        loadGlobal({
                            jwt: currUser.token,
                            user: {
                                name: currUser.user.name,
                                roles: currUser.user.roles,
                            },
                        }),
                    )
                })
                .catch((err) => console.log(err))
        /* eslint-disable-next-line */
    }, [])

    useEffect(() => {
        let fav = ""
        let title = ""
        if (globalState.site == "main") {
            fav = "/assets/favicon/favicon1.ico"
            title = props.pageTitle || process.env.APP_TITLE || ""
        }
        if (globalState.site == "web") {
            fav = "/assets/favicon/favicon2.ico"
            title = props.pageTitle || process.env.APP1_TITLE || ""
        }
        setPageTitle(title)
        // console.log(title)
        let link = document.querySelector("link[rel~='icon']")
        if (!link) {
            link = document.createElement("link")
            link["rel"] = "icon"
            document.getElementsByTagName("head")[0].appendChild(link)
        }
        const {host} = window.location
        link["href"] = `${location.protocol}//${host}${fav}`
    }, [globalState.site, props.pageTitle])

    useEffect(() => {
        setLocal(locale as SetStateAction<boolean>)
    }, [locale])

    return (
        <>
            <Local switch={{local, dispatch, site, setSite, siteSwitch}} />
            <Head>
                <meta charSet="UTF-8" />
                <title>{pageTitle}</title>
                <meta name="description" content={props.description || ""} />
            </Head>
            {props.children}
        </>
    )
}

export default PageProvider
