import {NextFetchEvent, NextRequest, NextResponse} from "next/server"

type Environment = "prod" | "dev" | "other"
export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const currentEnv = process.env.APP_ENV as Environment

    if (currentEnv === "prod" && req.headers.get("x-forwarded-proto") !== "https") {
        return NextResponse.redirect(
            `https://${req.headers.get("host")}${req.nextUrl.pathname}`,
            301,
        )
    }
    return NextResponse.next()
}
