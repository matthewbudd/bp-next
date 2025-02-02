import items from "@/components/Drawer/page-list.json"
import type {MetadataRoute} from "next"
import {headers} from "next/headers"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const headersList = await headers()
    let protocol = "http://"
    if (process.env.APP_ENV === "prod") {
        protocol = "https://" // change when going live live
    }
    let url = new URL(`${protocol}${headersList.get("host")}`)
    let pageList = items.map((item) => {
        // if (item && item.slug !== "/") {
        return {
            url: url.toString() + (item.slug !== "/" ? item.slug : ""),
            lastModified: new Date(),
            changeFrequency: "monthly" as "monthly",
            priority: item.priority || 0,
        }
        // }
    })
    return url.toString().includes("example.co.uk")
        ? [
              // {url, lastModified: new Date(), changeFrequency: "monthly", priority: Math.random()},
              ...pageList,
          ]
        : []
}
