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

  return (
    <div className="flex w-72 flex-col gap-12 md:w-96">
      <p className="text-center text-lg">{data.description}</p>
      <p className="text-left text-lg font-thin tracking-widest">
        ${data.price}
      </p>
      <motion.button
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.975 }}
        // ref={scope}
        onClick={addToCart}
        type="button"
        className="mojave hidden font-semibold md:block"
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
        className="mojave font-semibold md:hidden"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductData;
