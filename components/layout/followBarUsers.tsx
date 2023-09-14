import { useRouter } from "next/router";
import Avatar from "../avatar";
import { useCallback } from "react";

const FollowBarUsers: React.FC<any> = ({ user }) => {
  const router = useRouter();
  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${user.id}`;
      router.push(url);
    },
    [router,user.id]
  );

  return (
    <div
      key={user.id}
      className="flex flex-row gap-4 cursor-pointer  hover:bg-neutral-700 px-4 py-2 rounded"
      onClick={onClick}
    >
      <Avatar userId={user.id} />
      <div className="flex flex-col">
        <p className="text-white font-semibold text-sm">{user.name}</p>
        <p className="text-neutral-400 text-sm">@{user.username}</p>
      </div>
    </div>
  );
};

export default FollowBarUsers;
