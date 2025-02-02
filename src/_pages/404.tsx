"use client"
import Link from "next/link"
import React, {useEffect} from "react"

const NotFound = (props) => {
    useEffect(() => {
        document.title = props.pageTitle || "Not Found"
    }, [])

    return (
        <div className="selected homeme" id="home">
            <div className="inner">
                <div className="content">
                    <div>
                        <div className="gallery-text" style={{padding: "30vh 0 30vh 0"}}>
                            <h2>404 - Not Found!</h2>
                            <Link href="/">go home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
