import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import CreatePostWizard from "~/components/CreatePostWizard";

import { api } from "~/utils/api";
// import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LoadingPage from "~/components/LoadingPage";
// import ProductCard from "~/components/ProductCard";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";
import ProductCard from "~/components/ProductCard";

dayjs.extend(relativeTime);

// type PostWithUser = RouterOutputs["posts"]["getAll"][number];
// const PostView = (props: PostWithUser) => {
//   const { post, author } = props;
//   return (
//     <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
//       <Image
//         src={author.profileImageUrl}
//         alt={`@${author.firstName}'s profile picture`}
//         height={64}
//         width={64}
//         className="h-16 w-16 rounded-full"
//       />
//       <div className="flex flex-col">
//         <div className="flex text-slate-200">
//           <Link href={`/${author.id}`}>
//             <span>{`@${author.firstName}﹒`}</span>
//           </Link>
//           <Link href={`/post/${post.id}`}>
//             <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
//           </Link>
//         </div>
//         <span>{post.content}</span>
//       </div>
//     </div>
//   );
// };

const Feed = () => {
  const { data, isLoading: productsLoading } = api.products.getAll.useQuery();

  if (productsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong...</div>;

  return (
    <div>
      {data?.map((fullProduct) => (
        // <PostView {...fullPost} key={fullPost.post.id} />
        <ProductCard {...fullProduct} key={fullProduct.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded } = useUser();
  // const { isSignedIn, isLoaded: userLoaded } = useUser();

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
      <main className="flex h-screen flex-col justify-between gap-12">
        <Nav />

        <section className="flex flex-col items-center justify-between gap-12">
          <h2 className="text-center text-xl font-semibold tracking-widest md:text-3xl">
            Get Mossed
          </h2>

          <Image
            src="/hero2.jpg"
            alt="hero"
            width={1024}
            height={384}
            className="max-h-96 max-w-xs rounded-xl object-cover shadow-md shadow-slate-200 md:max-w-3xl lg:max-w-5xl"
          />
        </section>

        <div className="flex flex-col items-center gap-12">
          <h3 className="text-xl md:text-2xl">Sea Moss Facts</h3>
          <div>Facts</div>
        </div>

        <section className="flex flex-col items-center gap-12">
          <h4 className="text-xl md:text-2xl">Shop Sea Moss</h4>
          <div className="flex flex-wrap justify-center">
            <Feed />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Home;
