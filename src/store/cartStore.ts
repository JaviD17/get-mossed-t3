import { create } from "zustand";
import type { RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["products"]["getAll"][number];

type CartState = {
  cartTotal: number;
  cartItems: Product[];
  totalItems: number;
};

type CartActions = {
  //   incQuantity: () => void;
  //   decQuantity: () => void;
  //   resetQuantity: () => void;
  onAdd: (item: Product) => void;
  // onToggleCartItemQuantity: (id: string, operation: string) => void;
  // onRemove: (id: string) => void;
};

export const useCartStore = create<CartState & CartActions>()((set) => ({
  cartTotal: 0.0,
  cartItems: [],
  cartShipping: 0.0,
  totalItems: 0,
  //   incQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),
  //   decQuantity: () =>
  //     set((state) => ({
  //       quantity: state.quantity - 1 < 1 ? 1 : state.quantity - 1,
  //     })),
  //   resetQuantity: () => set({ quantity: 1 }),
  onAdd: (item: Product) => {
    const addCartItem = (cartItems: Product[], item: Product): Product[] => {
      const findItem = cartItems.find(
        (cartItem: Product) => cartItem.id === item.id
      );

      //   if findItem returns 'undefined' then return via spreading cartItems and spreading new item
      //   else if findItem returns 'true' then map cartItems and return via spreading that single cartItem with an updated cartQuantity

      if (findItem === undefined) return [...cartItems, { ...item }];

      return cartItems.map((cartItem: Product) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              cartQuantity: Number(
                cartItem.cartQuantity + item.cartQuantity
              ).toString(),
            }
          : { ...cartItem }
      );
    };

    set((state) => ({
      cartTotal: state.cartTotal + Number(item.price),
      cartItems: addCartItem(state.cartItems, item),
      totalItems: state.totalItems + Number(item.cartQuantity),
    }));
  },
}));
