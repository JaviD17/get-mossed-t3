import { SignInButton, SignOutButton } from "@clerk/nextjs";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LoadingPage from "~/components/LoadingPage";

const ProfilePage: NextPage<{ userId: string }> = ({ userId }) => {
  const { data, isLoading: userLoading } = api.profile.getUserById.useQuery({
    userId,
  });

  // Not needed bc getStaticProps and getStaticPaths
  //   if (userLoading) return <div>Loading...</div>;

  if (!data) return <div>404</div>;

  console.log(userId);

  return (
    <>
      <Head>
        <title>{data.firstName}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        {/* <div className="w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex justify-center border-b border-slate-400 p-4">
            {!isSignedIn && <SignInButton />}
            {!!isSignedIn && <SignOutButton />}
          </div>
        </div> */}
        <div>{data.firstName}</div>
      </main>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";
import { prisma } from "~/server/db";

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, currentUserId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("No slug");

  await helpers.profile.getUserById.prefetch({ userId: slug });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      userId: slug,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProfilePage;