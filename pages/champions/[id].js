import { useRouter } from "next/router"
import champions from "../../data"

// This gets called every time the page is called
export async function getServerSideProps({ params }) {
  const championData = champions.find(item => item.slug === params.id)

  // Pass data to the page via props
  return { props: { championData, timestamp: new Date().toUTCString() } }
}

const Champion = ({ championData, timestamp }) => {
  const router = useRouter()
  if (!championData) {
    return <h1>Champion does not exist.</h1>
  }
  return (
    <div style={{ padding: "3rem" }}>
      <h1>{championData.title}</h1>
      <p>{championData.description}</p>
      <h5>Last updated at: {timestamp}</h5>
      <button type="button" onClick={() => router.push("/")}>
        Home
      </button>
    </div>
  )
}
export default Champion
