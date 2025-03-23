import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/components/ui/button";

import { CartProduct } from "../../contexts/cart";

interface CarProductItemProps {
  product: CartProduct;
}

const CarProductItem = ({ product }: CarProductItemProps) => {
  return (
    <div className="flex items-center justify-between pb-5">
      <div className="flex items-center gap-2">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="flex flex-col items-start space-y-1">
          {/*<p className="max-w-[90%] truncate text-ellipsis text-xs">  */}
          <p className="text-xs">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center justify-center gap-1">
            <Button variant="outline" className="h-7 w-7 rounded-lg">
              <ChevronLeftIcon />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button variant="destructive" className="h-7 w-7 rounded-lg">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <Button variant="outline" className="absolute right-4 h-7 w-7 rounded-lg">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CarProductItem;
