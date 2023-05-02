import { motion } from "framer-motion";

const Cart = (props: { firstName: string }) => {
  return (
    <motion.aside
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute flex w-full flex-col bg-slate-700 md:left-1/2 md:w-1/2"
    >
      <h3 className="py-3 text-center text-2xl font-thin tracking-widest">
        {`${props?.firstName}'s Cart`}
      </h3>
    </motion.aside>
  );
};

export default Cart;
