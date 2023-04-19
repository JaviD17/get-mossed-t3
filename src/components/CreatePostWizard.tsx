import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import Loading from "./Loading";

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState<string>("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post. Please try again later.");
      }
    },
  });

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
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== "" && !isPosting && (
        <button type="submit" onClick={() => mutate({ content: input })}>
          Post
        </button>
      )}

      {isPosting && (
        <div className="flex items-center justify-center">
          <Loading size={20} />
        </div>
      )}
    </div>
  );
};

export default CreatePostWizard;
