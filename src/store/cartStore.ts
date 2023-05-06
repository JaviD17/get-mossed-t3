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
  onRemove: (id: string) => void;
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
              // cartQuantity: Number(
              //   cartItem.cartQuantity + item.cartQuantity
              // ).toString(),
              cartQuantity: (
                Number(cartItem.cartQuantity) + Number(item.cartQuantity)
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
  onRemove: (id: string) => {
    const removeCartItem = (cartItems: Product[], id: string): Product[] => {
      return cartItems.filter((cartItem: Product) => cartItem.id !== id);
    };

    const removeCartItemNewTotal = (
      cartItems: Product[],
      cartTotal: number,
      id: string
    ): number => {
      const foundItem = cartItems.find(
        (cartItem: Product) => cartItem.id === id
      );

      const newCartTotal =
        cartTotal - Number(foundItem?.price) * Number(foundItem?.cartQuantity);

      return newCartTotal;
    };

    const removeCartItemNewTotalitems = (
      cartItems: Product[],
      totalItems: number,
      id: string
    ) => {
      const foundItem = cartItems.find(
        (cartItem: Product) => cartItem.id === id
      );

      const newTotalItems = totalItems - Number(foundItem?.cartQuantity);

      return newTotalItems;
    };

    set((state) => ({
      cartItems: removeCartItem(state.cartItems, id),
      cartTotal: removeCartItemNewTotal(state.cartItems, state.cartTotal, id),
      totalItems: removeCartItemNewTotalitems(
        state.cartItems,
        state.totalItems,
        id
      ),
    }));
  },
}));
