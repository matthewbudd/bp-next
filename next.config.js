/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
        ],
    },
    env: {
        APP_NAME: process.env.APP_NAME,
        APP_STRAP: process.env.APP_STRAP,
        APP_TITLE: process.env.APP_TITLE,
        APP1_NAME: process.env.APP1_NAME,
        APP1_STRAP: process.env.APP1_STRAP,
        APP1_TITLE: process.env.APP1_TITLE,
        SERVER_DEV: process.env.SERVER_DEV,
        SERVER_PROD: process.env.SERVER_PROD,
        SERVER_WEB_DEV: process.env.SERVER_WEB_DEV,
        SERVER_WEB_PROD: process.env.SERVER_WEB_PROD,
        SERVER_WEB_DEV: process.env.SERVER_WEB_DEV,
        SERVER_WEB_PROD: process.env.SERVER_WEB_PROD,
        PP_CID: process.env.PP_CID,
        PPS_CID: process.env.PPS_CID,
        APP_ENV: process.env.APP_ENV,
    },

    devIndicators: {
        buildActivity: false,
    },
}

module.exports = nextConfig
