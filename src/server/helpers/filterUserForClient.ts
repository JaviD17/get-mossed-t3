import type { User } from "@clerk/nextjs/dist/api";
export const filterUserForClient = (user: User) => {
  // console.log(user);
  return {
    id: user.id,
    firstName: user.firstName,
    profileImageUrl: user.profileImageUrl,
  };
};
