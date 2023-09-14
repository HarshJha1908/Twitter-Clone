import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./button";
import Avatar from "./avatar";
import usePost from "@/hooks/usePost";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const refigterModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const { mutate: mutatePosts } = usePosts();

  const { mutate: mutatePost } = usePost(postId as string );

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUserId = currentUser?.id;

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Tweet content", body, currentUserId);

      const url = isComment ? `/api/comments?postId=${postId}` : `/api/posts`;

      await axios.post(url, { body, currentUserId });

      toast.success("Tweet Created");
      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, currentUserId, mutatePosts,isComment,postId,mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              value={body}
              disabled={isLoading}
              onChange={(e) => {
                console.log(e.target.value);
                setBody(e.target.value);
              }}
              className="
                disabled:opacity-80
                peer
                resize-none
                mt-1
                w-full
                bg-black
                ring-0
                outline-none
                text-[20px]
                placeholder-neutral-500
                text-white
                "
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Twitter-Clone
          </h1>
          <div className="flex flex items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={refigterModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
