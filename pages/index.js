import React, { useEffect } from "react"
import Link from "next/link"
import champions from "../data"

export default function Home() {
  useEffect(() => {
    document.title = "Gimme a Next.js"
  }, [])
  return (
    <div style={{ padding: "3rem" }}>
      <main>
        <h1>List of Tennis GrandSlam Champions with 20 titles</h1>
        <ul>
          {champions.map(item => (
            <li key={item.slug}>
              <Link legacyBehavior href={`/champions/${item.slug}`}>
                <a>{item.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
