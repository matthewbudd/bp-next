import {headers} from "next/headers"

function generateBSCode(url) {
    return url.toString().indexOf("example.co.uk") > -1 ? "xxxx" : "xxxxx"
}

async function ProtoCode() {
    const appHeaders = await headers()
    let protocol = "http://"
    if (process.env.APP_ENV === "prod") {
        protocol = "https://"
    }

    var url = new URL(`${protocol}${appHeaders.get("host")}`)
    const proto = await generateBSCode(url)
    return proto
}

export default ProtoCode
