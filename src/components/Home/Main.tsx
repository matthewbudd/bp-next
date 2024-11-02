"use client"
import {useState, useEffect, useRef, SetStateAction} from "react"
import {useRouter} from "next/navigation"
import Head from "next/head"
// import Router from "next/router"
import {gsap} from "gsap"
import {useGSAP} from "@gsap/react"
import {useAppSelector, useAppDispatch} from "@/lib/hooks"
import {resizeGlobal} from "@/features/global/globalSlice"
import NavApp from "@/components/navbar/Navbar"
import PageProvider from "@/components/PageProvider"
import {
    animFadeInPage,
    animFadeOutUp,
    // animFadeOutDown,
} from "@/common/animations"
import {Messages} from "@/components/Messaging"

gsap.registerPlugin(useGSAP)
const duration = 0.4

const Home = (props) => {
    const router = useRouter()
    const container = useRef<HTMLDivElement>(null)
    const [pageTitle, setPageTitle] = useState("")
    const [transition, setTransition] = useState(false)
    const [navigate, setNavigate] = useState(false)
    const [url, setUrl] = useState("/")
    const globalState = useAppSelector((state) => state.global)
    const [height, setHeight] = useState(0)
    const [navPos, setNavPos] = useState({
        top: 140 as number | string,
        right: "auto" as number | string,
        bottom: "auto" as number | string,
        left: 700 as number | string,
    })
    const [content /*, setContent*/] = useState({
        title: process.env.APP_NAME,
        strap: process.env.APP_STRAP,
    })

    const dispatch = useAppDispatch()

    const resizeReset = () => {
        const navPosReset = {
            top: typeof window.innerHeight == "number" ? window.innerHeight / 2.7 + 140 : 0,
            right: "auto",
            bottom: "auto",
            left: typeof window.innerWidth == "number" ? window.innerWidth / 2 - 70 : 0,
        }
        dispatch(
            resizeGlobal({
                top: typeof window.innerHeight == "number" ? window.innerHeight / 2.7 + 140 : 0,
                height: typeof window.innerHeight == "number" ? window.innerHeight : 0,
                right: 500,
                bottom: "auto",
                left: typeof window.innerWidth == "number" ? window.innerWidth / 2 - 70 : 0,

                navPos: navPosReset,
            }),
        )
        localStorage.setItem("navPos", JSON.stringify(navPosReset))
    }

    useGSAP(
        () => {
            animFadeInPage([".content-hold"], duration).eventCallback("onComplete", () => {
                animFadeInPage([".nav"], duration).eventCallback("onComplete", () => {})
            })
        },
        {scope: container},
    )
    useEffect(() => {
        resizeReset()
        window.addEventListener("resize", resizeReset)

        return () => {
            window.removeEventListener("resize", resizeReset)
        }
    }, [])

    useEffect(() => {
        const newNavPos = JSON.parse(localStorage.getItem("navPos") || "")
        setHeight(globalState.height as SetStateAction<number>)
        setNavPos(newNavPos)
    }, [globalState])

    useGSAP(
        () => {
            if (transition) {
                animFadeOutUp([".content-hold"], 0.3).eventCallback("onComplete", () => {
                    setNavigate(true)
                    setUrl(localStorage.getItem("navState") || "")
                })
            }
        },
        [transition],
        // {scope: container},
    )

    // useEffect(() => {
    //     if (transition) {
    //     }
    // }, [transition])

    useEffect(() => {
        if (navigate) {
            router.push(url)
        }
    }, [navigate, url])

    const navClick = () => {
        setTransition(true)
    }

    return (
        globalState && (
            <PageProvider
                pageTitle={process.env.APP_TITLE}
                description={"Meta description for app."}
            >
                <div
                    className="selected homeme dark app"
                    id="home"
                    ref={container}
                    style={{height}}
                >
                    <Messages />
                    <div className="inner">
                        <div className="content-hold">
                            <div style={{opacity: 0}} className="content-hold">
                                <div
                                    className="gallery-text"
                                    style={{
                                        paddingTop: height / 2.7 || 0,
                                    }}
                                >
                                    <div className="flex-grow-1 d-flex align-items-center justify-content-center search-image-container-full">
                                        <div className="text">
                                            <h2>{content.title}</h2>
                                            <p className="pb-2 mb-0 large">{content.strap}</p>
                                            {/* <Counter /> */}
                                            {/* {globalState.title} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="r d-inline nav"
                        style={{
                            left: typeof navPos.left == "number" ? navPos.left - 20 : 0,
                            right: navPos.right,
                            top: navPos.top,
                            bottom: navPos.bottom,
                            opacity: 0,
                        }}
                    >
                        <NavApp items={globalState.nav || []} navClick={navClick} />
                    </div>
                </div>
            </PageProvider>
        )
    )
}

export default Home
