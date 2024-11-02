import React from "react"
import {useSubscription, gql} from "@apollo/client"

const INC_SUBSCRIPTION = gql`
    subscription Subscription {
        newMessage
    }
`

export function Messages() {
    const {data, loading, error} = useSubscription(INC_SUBSCRIPTION)

    return <div className="messages">{!loading && !error && data?.newMessage?.value}</div>
}
