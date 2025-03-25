"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}
export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (product: CartProduct) => void;
  increaseProductQuantity: (product: CartProduct) => void;
  removeProduct: (product: CartProduct) => void;
  total: number;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  total: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );

    if (!productIsAlreadyOnTheCart) {
      setProducts((prev) => [...prev, product]);
      return;
    }

    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
            price: product.price * (prevProduct.quantity + product.quantity),
          };
        }

        return prevProduct;
      });
    });
  };

  const increaseProductQuantity = (product: CartProduct) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== product.id) {
          return prevProduct;
        }

        return {
          ...prevProduct,
          quantity: prevProduct.quantity + 1,
          price: prevProduct.price + prevProduct.price,
        };
      });
    });
  };
  const decreaseProductQuantity = (product: CartProduct) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== product.id) {
          return prevProduct;
        }

        if (prevProduct.quantity === 1) {
          return prevProduct;
        }

        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };
  const removeProduct = (product: CartProduct) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((prevProduct) => {
        return prevProduct.id !== product.id;
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        total,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
