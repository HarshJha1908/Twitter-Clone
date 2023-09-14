import useUser from "@/hooks/useUser";
import Image from "next/image";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchUser } = useUser(userId);

  return (
    <div
      className={`
    ${hasBorder ? "border-4 border-black" : ""}
    ${isLarge ? "h-32" : "h-10"}
    ${isLarge ? "w-32" : "w-10"}
    rounded-full
    hover-opacity-90
    transition
    cursor-pointer
    relative
    `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        src={fetchUser?.profileImage || "/images/default.jpeg"}
      />
    </div>
  );
};

export default Avatar;
