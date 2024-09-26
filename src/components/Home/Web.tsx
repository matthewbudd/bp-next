import {useState, useEffect, useRef, SetStateAction} from "react"
import {useRouter} from "next/navigation"
import Head from "next/head"
import Router from "next/router"
import {Drawer} from "@/components/Drawer"
import Box from "@mui/material/Box"
import {gsap} from "gsap"
import {useGSAP} from "@gsap/react"
import {useAppSelector, useAppDispatch} from "@/lib/hooks"
import {resizeGlobal} from "@/features/global/globalSlice"
import PageProvider from "@/components/PageProvider"

import LogRegSub from "@/components/Authentication/LogRegSub"
import {
    animFadeInPage,
    animFadeOutUp,
    // animFadeOutDown,
} from "@/common/animations"
import {theme} from "@/common/theme-mui"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"

gsap.registerPlugin(useGSAP)
const duration = 0.4

const egg = {
    width: "400px",
    height: "400px",
    transform: "rotate(8deg) translate(-50%,0)",
    marginTop: "-145px",
    position: "absolute",
    opacity: 0.1,
    left: "50%",
    backgroundImage: "url(/assets/logo-alone.png)",
    backgroundSize: "cover",
}
const Home = (props) => {
    const router = useRouter()
    const container = useRef<HTMLDivElement>(null)
    const [pageTitle, setPageTitle] = useState("")
    const [transition, setTransition] = useState(false)
    const [navigate, setNavigate] = useState(false)
    const [url, setUrl] = useState("/")
    const globalState = useAppSelector((state) => state.global)
    const [height, setHeight] = useState(0)
    const [content /*, setContent*/] = useState({
        title: process.env.APP1_NAME,
        strap: process.env.APP1_STRAP,
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
                return
            })
        },
        {scope: container},
    )
    useEffect(() => {
        resizeReset()
        window.addEventListener("resize", resizeReset)
        // window.addEventListener("load", resizeReset)
        
        return () => {
            window.removeEventListener("resize", resizeReset)
        }
        /* eslint-disable-next-line */
    }, [])

    useEffect(() => {
        setHeight(globalState.height as SetStateAction<number>)
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
    return (
        globalState && (
            <PageProvider
                pageTitle={process.env.APP1_TITLE}
                description={
                    "Meta description for app 1."
                }
            >
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                    <div
                        className="selected homeme dark app1"
                        id="home"
                        ref={container}
                        style={{height}}
                    >
                        <Drawer user={globalState.user} />
                        <div className="inner">
                            <div className="content-hold">
                                <div style={{opacity: 0}} className="content-hold">
                                    <div
                                        className="gallery-text"
                                        style={{
                                            paddingTop: height / 2.7 || 0,
                                        }}
                                    >
                                        <Box sx={egg}></Box>
                                        <div className="flex-grow-1 d-flex align-items-center justify-content-center search-image-container-full">
                                            <div className="text">
                                                <h2>{content.title}</h2>
                                                <p className="pb-2 mb-0 large">{content.strap}</p>
                                                <Box ml={-2} mt={1}>
                                                    <LogRegSub user={props.user} />
                                                </Box>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </PageProvider>
        )
    )
}

export default Home
