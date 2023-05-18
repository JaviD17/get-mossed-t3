import { motion } from "framer-motion";

const MButton = (props: { children: string }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      type="button"
      className="mojave hidden font-semibold md:inline-block"
    >
      {props.children}
    </motion.button>
  );
};

export default MButton;
