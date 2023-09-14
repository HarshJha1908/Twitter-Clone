import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();

  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      loginModal.onOpen();
    }

    try {
      if (hasLiked) {
        await axios.delete("/api/like", { data: { postId, currentUser } });
      } else {
        await axios.post("/api/like", { postId, currentUser });
      }

      mutateFetchedPost();
      mutateFetchedPosts();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal,
  ]);

  return { hasLiked, toggleLike };
};

export default useLike;
