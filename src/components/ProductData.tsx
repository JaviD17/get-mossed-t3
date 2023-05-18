import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
// import toast from "react-hot-toast";
import { useCartStore } from "~/store/cartStore";
import { RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["products"]["getAll"][number];

const ProductData = (props: { data: Product }) => {
  const { data } = props;

  const onAdd = useCartStore((state) => state.onAdd);

  const addToCart = () => {
    // toast.success(`${data.title} added to cart`);
    // data === item: Product
    onAdd(data);
  };

  const { user } = useUser();

  return (
    <div className="flex w-72 flex-col gap-12 md:w-96">
      <p className="text-center text-lg">{data.description}</p>
      <p className="text-left text-lg font-thin tracking-widest">
        ${data.price}
      </p>
      <motion.button
        whileHover={{ scale: user ? 1.025 : 1 }}
        whileTap={{ scale: user ? 0.975 : 1 }}
        // ref={scope}
        onClick={addToCart}
        type="button"
        // className="mojave hidden font-semibold md:block"
        className={`hidden font-semibold md:block ${
          user ? "mojave" : "mojave-disabled"
        }`}
        disabled={!user}
      >
        Add to Cart
      </motion.button>
      {/* mobile button with no framer */}
      <button
        // whileHover={{ scale: 1.025 }}
        // whileTap={{ scale: 0.975 }}
        // ref={scope}
        onClick={addToCart}
        type="button"
        className={`font-semibold md:hidden ${
          user ? "mojave" : "mojave-disabled"
        }`}
        disabled={!user}
      >
        Add to Cart
      </button>
      {!user && (
        <p className="text-center text-sm font-semibold tracking-widest text-red-500 underline underline-offset-8">
          Must sign in to add to cart
        </p>
      )}
    </div>
  );
};

export default ProductData;
