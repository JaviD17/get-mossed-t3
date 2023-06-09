import { create } from "zustand";
import type { RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["products"]["getAll"][number];

type CartState = {
  cartTotal: number;
  cartItems: Product[];
  totalItems: number;
};

type CartActions = {
  onAdd: (item: Product) => void;
  onRemove: (id: string) => void;
  onToggleCartQuantity: (id: string, operation: string) => void;
  setCart: () => void;
};

import toast from "react-hot-toast";

export const useCartStore = create<CartState & CartActions>()((set) => ({
  cartTotal: 0.0,
  cartItems: [],
  cartShipping: 0.0,
  totalItems: 0,
  onAdd: (item: Product) => {
    const addCartItem = (cartItems: Product[], item: Product): Product[] => {
      const findItem = cartItems.find(
        (cartItem: Product) => cartItem.id === item.id
      );

      // toast
      toast.success(`${item.title} added to cart`);

      // local storage
      findItem
        ? cartItems.map((cartItem: Product) => {
            if (cartItem.id === item.id) {
              const localItem: string | null = localStorage.getItem(
                `cartItem-${item.id}`
              );

              if (localItem !== null) {
                const parsedItem: unknown = JSON.parse(localItem);
                const updatedItem = parsedItem as Product;
                updatedItem.cartQuantity = (
                  Number(updatedItem.cartQuantity) + 1
                ).toString();

                localStorage.setItem(
                  `cartItem-${item.id}`,
                  JSON.stringify(updatedItem)
                );
              }
              // const updatedItem: Product = JSON.parse(
              //   String(localStorage.getItem(item.id))
              // );
              // console.log(updatedItem);
            }
          })
        : localStorage.setItem(`cartItem-${item.id}`, JSON.stringify(item));
      // : localStorage.setItem("Product", JSON.stringify([item]));
      // () => {
      //   const localCartItems: string | null =
      //     localStorage.getItem("Product");

      //   if (localCartItems !== null) {
      //     const parsedCartItems: unknown = JSON.parse(localCartItems);
      //     const updatedCartItems = parsedCartItems as Product[];

      //     updatedCartItems.push(item);

      //     localStorage.setItem(
      //       "Product",
      //       JSON.stringify([...updatedCartItems])
      //     );
      //   }
      // };

      //   if findItem returns 'undefined' then return via spreading cartItems and spreading new item
      //   else if findItem returns 'true' then map cartItems and return via spreading that single cartItem with an updated cartQuantity

      if (findItem === undefined) return [...cartItems, { ...item }];

      return cartItems.map((cartItem: Product) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
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
      // for local storage
      localStorage.removeItem(`cartItem-${id}`);

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
        // if (localItem !== null) {
        //   const parsedItem: unknown = JSON.parse(localItem);
        //   const updatedItem = parsedItem as Product;
        //   updatedItem.cartQuantity = (
        //     Number(updatedItem.cartQuantity) + 1
        //   ).toString();

        //   localStorage.setItem(item.id, JSON.stringify(updatedItem));
        // }
        // local storage
        cartItems.map((cartItem: Product) => {
          if (cartItem.id === id) {
            const localItem: string | null = localStorage.getItem(
              `cartItem-${foundItem.id}`
            );

            let parsedItem: unknown;

            if (localItem !== null) {
              parsedItem = JSON.parse(localItem);
            }

            const updatedItem = parsedItem as Product;

            if (operation === "dec") {
              updatedItem.cartQuantity = (
                Number(updatedItem.cartQuantity) - 1 < 1
                  ? 1
                  : Number(updatedItem.cartQuantity) - 1
              ).toString();
            } else {
              updatedItem.cartQuantity = (
                Number(updatedItem.cartQuantity) + 1
              ).toString();
            }
            localStorage.setItem(
              `cartItem-${updatedItem.id}`,
              JSON.stringify(updatedItem)
            );
          }
        });

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
  setCart: () => {
    const getCartItems = (): Product[] => {
      const cartItems: Product[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        // keys.push(localStorage.key(i)!)
        const key: string | null = localStorage.key(i);
        if (typeof key === "string" && key.includes("cartItem-")) {
          // if (typeof key === "string" && key.includes("product-")) {
          const localItem: string | null = localStorage.getItem(key);
          let parsedItem: unknown;
          if (typeof localItem === "string") {
            parsedItem = JSON.parse(localItem);
          }
          const updatedItem = parsedItem as Product;
          cartItems.push(updatedItem);
        }
      }

      return cartItems;
    };

    const getCartTotal = (): number => {
      const cartItems: Product[] = getCartItems();

      let cartTotal = 0;

      cartItems.map(
        (cartItem: Product) =>
          (cartTotal =
            cartTotal + Number(cartItem.price) * Number(cartItem.cartQuantity))
      );

      return cartTotal;
    };

    const getTotalItems = () => {
      const cartItems: Product[] = getCartItems();

      let totalItems = 0;

      cartItems.map(
        (cartItem: Product) =>
          (totalItems = totalItems + Number(cartItem.cartQuantity))
      );

      return totalItems;
    };

    set({
      cartItems: getCartItems(),
      cartTotal: getCartTotal(),
      totalItems: getTotalItems(),
    });
  },
}));
