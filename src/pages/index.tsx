import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import CreatePostWizard from "~/components/CreatePostWizard";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LoadingPage from "~/components/LoadingPage";
import ProductCard from "~/components/ProductCard";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.profileImageUrl}
        alt={`@${author.firstName}'s profile picture`}
        height={64}
        width={64}
        className="h-16 w-16 rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex text-slate-200">
          <Link href={`/${author.id}`}>
            <span>{`@${author.firstName}﹒`}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
          </Link>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong...</div>;

  return (
    <div>
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isSignedIn, isLoaded: userLoaded } = useUser();

  // console.log(user); from useUser()

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded yet
  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Get Mossed</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col justify-between">
        {/* nav */}
        <Nav />

        {!true && (
          <div className="w-full overflow-y-scroll border-x border-slate-400 md:max-w-2xl">
            <div className="flex justify-center border-b border-slate-400 p-4">
              {!isSignedIn && <SignInButton />}
              {!!isSignedIn && <SignOutButton />}
            </div>

            <section className="border-b border-slate-400 p-4">
              <CreatePostWizard />
            </section>

            <Feed />
          </div>
        )}
        <Footer />
      </main>
    </>
  );
};

export default Home;
