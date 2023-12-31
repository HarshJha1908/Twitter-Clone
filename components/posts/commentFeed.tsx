import CommentItem from "./commentItem";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  return (
    <div>
          {comments?.map((comment) => {
          console.log("Comment",comment);
          
        return <CommentItem key={comment.id} data={comment} />;
      })}
    </div>
  );
};

export default CommentFeed;
