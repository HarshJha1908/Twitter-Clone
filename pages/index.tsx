import Form from "@/components/form";
import Header from "@/components/header";
import PostFeed from "@/components/posts/postFeed";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder=" What's happening?"/>
      <PostFeed/>
    </>
  )
}
