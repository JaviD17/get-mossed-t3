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
  onRemove: (id: string) => void;
  onToggleCartQuantity: (id: string, operation: string) => void;
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
    ): number => {
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
  onToggleCartQuantity: (id: string, operation: string) => {
    const toggleCartQuantity = (
      cartItems: Product[],
      id: string,
      operation: string
    ): Product[] => {
      const foundItem = cartItems.find(
        (cartItem: Product) => cartItem.id === id
      );

      if (foundItem === undefined) {
        return [...cartItems];
      } else {
        return cartItems.map((cartItem: Product) =>
          cartItem.id === id
            ? {
                ...cartItem,
                cartQuantity:
                  operation === "dec"
                    ? (Number(cartItem.cartQuantity) - 1 < 1
                        ? 1
                        : Number(cartItem.cartQuantity) - 1
                      ).toString()
                    : (Number(cartItem.cartQuantity) + 1).toString(),
              }
            : { ...cartItem }
        );
      }
    };

    const toggleCartTotal = (
      cartItems: Product[],
      cartTotal: number,
      id: string,
      operation: string
    ): number => {
      cartItems.map((cartItem: Product) => {
        if (cartItem.id === id) {
          operation === "dec"
            ? (cartTotal =
                cartTotal - Number(cartItem.price) < Number(cartItem.price)
                  ? Number(cartItem.price)
                  : cartTotal - Number(cartItem.price))
            : (cartTotal = cartTotal + Number(cartItem.price));
        }
      });

      return cartTotal;
    };

    const toggleTotalItems = (
      totalItems: number,
      operation: string
    ): number => {
      if (operation === "inc") {
        totalItems = totalItems + 1;
      }

      if (operation === "dec") {
        totalItems = totalItems - 1 < 1 ? 1 : totalItems - 1;
      }

      return totalItems;
    };

    set((state) => ({
      cartItems: toggleCartQuantity(state.cartItems, id, operation),
      cartTotal: toggleCartTotal(
        state.cartItems,
        state.cartTotal,
        id,
        operation
      ),
      totalItems: toggleTotalItems(state.totalItems, operation),
    }));
  },
}));
