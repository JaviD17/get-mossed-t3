import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";

// type PostWithUser = RouterOutputs["posts"]["getAll"][number];
// const PostView = (props: PostWithUser) => {

type ProductForShop = RouterOutputs["products"]["getAll"][number];
const ProductCard = (props: ProductForShop) => {
  return (
    <Link href={"/"} className="inline-block">
      <div className="m-4 w-fit overflow-hidden rounded-2xl bg-slate-800">
        <Image
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt=""
          width={380}
          height={350}
          className=""
        />
        <div className="p-3 text-slate-50">
          <span>
            <h3 className="text-lg tracking-wider hover:underline hover:underline-offset-4 md:text-xl">
              {props.title}
            </h3>
          </span>
          <p className="font-thin">${props.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
