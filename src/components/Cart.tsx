import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "~/store/cartStore";
import type { RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["products"]["getAll"][number];

const Cart = (props: { firstName: string }) => {
  const cartTotal = useCartStore((state) => state.cartTotal);
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = useCartStore((state) => state.totalItems);
  //   console.log("TOTAL ITEMS", totalItems);

  return (
    <motion.aside
      initial={{ opacity: 0, scaleZ: 0 }}
      animate={{ opacity: 1, scaleZ: 1 }}
      exit={{ opacity: 0, scaleZ: 0 }}
      transition={{ duration: 0.25 }}
      //   className="absolute flex w-full flex-col bg-slate-700 md:left-[25%] md:top-[25%] md:w-1/2 md:overflow-hidden md:rounded-xl md:border-2 md:border-slate-50"
      className="absolute flex w-full flex-col bg-slate-700 md:left-1/2 md:w-1/2"
    >
      <h3 className="py-3 text-center text-2xl font-thin tracking-widest">
        {`${props?.firstName}'s Cart`}
      </h3>

      {/* cart list for desktop */}
      <div
        className={`flex flex-col items-center bg-slate-600 ${
          cartItems.length < 1
            ? "h-64 justify-center"
            : "h-[40rem] justify-between gap-8 overflow-y-auto py-8"
        }`}
      >
        {cartItems.length < 1 && (
          <div className="flex flex-col items-center rounded-xl border border-slate-950 bg-slate-700 p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              id="exclamation"
              height={60}
              width={60}
            >
              <path
                fill="#DC2625"
                d="M12,14a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0v6A1,1,0,0,0,12,14Zm0,4a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,12,18Z"
              ></path>
            </svg>
            <h4 className="py-2 text-xl md:text-2xl">
              Ooops... your cart is empty
            </h4>
            <Link
              href={"/shop"}
              className="rounded-xl border border-slate-950 bg-slate-600 p-2"
            >
              Continue Shopping
            </Link>
          </div>
        )}
        {cartItems.length > 0 && (
          <>
            {cartItems.map((cartItem: Product) => (
              <div className="flex w-11/12 flex-col items-start gap-4 rounded-xl border-2 border-slate-950 bg-slate-700 p-4">
                <div className="flex w-full justify-between gap-2">
                  <div className="h-fit w-fit overflow-hidden rounded-xl md:hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt=""
                      width={500 / 4}
                      height={380 / 4}
                      className="h-[380] w-[500] object-contain"
                    />
                  </div>
                  <div className="hidden h-fit w-fit overflow-hidden rounded-xl md:inline-block">
                    <Image
                      src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt=""
                      width={500 / 2}
                      height={380 / 2}
                      className="h-[380] w-[500] object-contain"
                    />
                  </div>
                  <div className="flex grow flex-col justify-between p-2 md:rounded-xl md:bg-slate-600 md:p-4">
                    <h4 className="text-base tracking-wider md:text-lg md:tracking-widest">
                      {cartItem.title}
                    </h4>
                    {/* <p className="hidden md:inline-block">
                        {cartItem.description.split(" ", 5).join(" ")}...
                      </p> */}
                    <div className="flex justify-between text-base tracking-wider md:text-lg md:tracking-widest">
                      <p>{cartItem.size}</p>
                      <p>${cartItem.price}</p>
                    </div>
                  </div>
                </div>

                {/* quantity component */}
                <div className="flex items-center justify-between gap-4 rounded-xl border-2 border-slate-950 bg-slate-600 p-2">
                  <button className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      id="minus-circle"
                      height={30}
                      width={30}
                    >
                      <path
                        fill="#F8FAFC"
                        d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"
                      ></path>
                    </svg>
                  </button>
                  <span className="text-xl">0</span>
                  <button className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      id="plus-circle"
                      height={30}
                      width={30}
                    >
                      <path
                        fill="#F8FAFC"
                        d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H13V8a1,1,0,0,0-2,0v3H8a1,1,0,0,0,0,2h3v3a1,1,0,0,0,2,0V13h3a1,1,0,0,0,0-2Z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-start justify-between gap-2 rounded-xl border-2 border-slate-950 bg-slate-700 p-4">
              <p className="tracking-widest">${cartTotal.toFixed(2)}</p>
              <p className="tracking-widest">Total items: {totalItems}</p>
              <button className="mojave w-full">Checkout</button>
            </div>
          </>
        )}
      </div>
    </motion.aside>
  );
};

export default Cart;
