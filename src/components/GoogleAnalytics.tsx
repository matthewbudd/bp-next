import React from "react"
import Script from "next/script"

const GoogleAnalytics = (props) => {
    let host = typeof window !== "undefined" && window?.location.hostname
    return (
        <>
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
            />

            <Script id="" strategy="lazyOnload">
                {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('set', { cookie_flags: 'SameSite=None;Secure' });
              gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true, 
              cookie_domain: '${host}',
              cookie_flags: 'SameSite=None; Secure',

              });
          `}
            </Script>
        </>
    )
}

export default GoogleAnalytics
