import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useCartStore } from "~/store/cartStore";
import { RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["products"]["getAll"][number];

const ProductData = (props: { data: Product }) => {
  const { data } = props;

  const onAdd = useCartStore((state) => state.onAdd);

  const addToCart = () => {
    toast.success(`${data.title} added to cart`);
    // data === item: Product
    onAdd(data);
  };

  return (
    <div className="flex w-72 flex-col gap-12 md:w-96">
      <p className="text-center text-lg">{data.description}</p>
      <p className="text-left text-lg tracking-widest">${data.price}</p>
      <motion.button
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.975 }}
        // ref={scope}
        onClick={addToCart}
        className="mojave font-semibold"
      >
        Add to Cart
      </motion.button>
    </div>
  );
};

export default ProductData;
