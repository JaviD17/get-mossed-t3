import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const CreatePostWizard = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user?.profileImageUrl}
        alt="profile image"
        className="h-16 w-16 rounded-full"
        width={64}
        height={64}
      />
      <input
        placeholder="Type some emojis"
        type="text"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

export default CreatePostWizard;
