import { useContext } from "react";

import { formatCurrency } from "@/app/helpers/format-currency";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";
import CarProductItem from "./cart-product-item";
import FinishOrderButton from "./finish-order-button";

const CartSheet = () => {
  const { toggleCart, isOpen, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="h-full w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Cart</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CarProductItem product={product} key={product.id} />
            ))}
          </div>
          <Card className="mb-5">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-semibold text-sm">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <FinishOrderButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
