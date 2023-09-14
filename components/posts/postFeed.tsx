import usePosts from "@/hooks/usePosts";
import PostItem from "./postItem";

interface PostFeedProps{
    userId?:string
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [] } = usePosts(userId);    
    
    return (<div className="">
        {posts.map((post: Record<string, any>) => {
            return(<PostItem userId={userId} key={post.id} data={post} />)
        })}
    </div>)
}

export default PostFeed;