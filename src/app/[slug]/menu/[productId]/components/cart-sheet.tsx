import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";
import CarProductItem from "./cart-product-item";

const CartSheet = () => {
  const { toggleCart, isOpen, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Cart</SheetTitle>
          <div className="py-5">
            {products.map((product) => (
              <CarProductItem product={product} key={product.id} />
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
