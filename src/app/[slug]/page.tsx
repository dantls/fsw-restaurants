import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "../data/get-restaurant-by-slug";
import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-6">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>

      <div className="space-y-2 pt-24 text-center">
        <h3 className="font-semiBold text-2xl">Welcome</h3>
        <p className="opacity-55">
          Choose how you prefer to enjoy your meal, we are here to offer
          practicality and flavor in every detail
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          slug={slug}
          option="DINE_IN"
          imageAlt="dine_in"
          imageUrl="/dine_in.png"
          buttonText="Eat Here"
        />
        <ConsumptionMethodOption
          slug={slug}
          option="TAKEAWAY"
          imageAlt="takeaway"
          imageUrl="/takeaway.png"
          buttonText="Take Away"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
