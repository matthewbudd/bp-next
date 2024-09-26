import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = ({post}) => {
    const {
        img = "https://images.pexels.com/photos/20147182/pexels-photo-20147182/free-photo-of-a-woman-holding-a-surfboard-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        createdAt = "09/08/2021",
        title = "Title",
        body = "Body",
        slug = "post",
    } = {post}
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                {img && (
                    <div className={styles.imgContainer}>
                        <Image src={img} alt="" fill className={styles.img} />
                    </div>
                )}
                <span className={styles.date}>{createdAt?.toString().slice(4, 16)}</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.desc}>{body}</p>
                <Link className={styles.link} href={`/blog/${slug}`}>
                    READ MORE
                </Link>
            </div>
        </div>
    )
}

export default PostCard
