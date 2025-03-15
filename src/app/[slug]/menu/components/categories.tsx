"use client";
import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Products } from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

// interface MenuCategory extends Prisma.MenuCategoryGetPayload<{
//   include: { products: true };
// }> {
//   products: Product[];
// }

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);
  console.log(selectedCategory);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
        <div className="p-5">
          <div className="flex gap-3">
            <Image
              src={restaurant.avatarImageUrl}
              height={45}
              width={45}
              alt={restaurant.name}
            />
            <div>
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <p className="text-xs opacity-50">{restaurant.description}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm text-green-500">
            <ClockIcon size={14} />
            <p>Open</p>
          </div>
        </div>

        <ScrollArea className="w-full">
          <div className="flex w-max space-x-4 p-5 pt-0">
            {restaurant.menuCategories.map((category) => (
              <Button
                variant={getCategoryButtonVariant(category)}
                className="rounded-full"
                key={category.id}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <Products products={selectedCategory.products} />
    </>
  );
};

export default RestaurantCategories;
