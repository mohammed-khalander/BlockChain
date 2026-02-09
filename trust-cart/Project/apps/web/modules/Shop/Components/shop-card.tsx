import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Rating } from '@/components/ui/rating';



const product = {
  name: "White T-Shirt",
  image: "/images/products/list1.png",
  price: "$29.00",
  badge: "New Season",
  stock:10,
  rating: 4
};

export type ProductType = typeof product;

export default function Page() {
  return (
    <div className="mx-auto max-w-80 py-10">
      <Product product={product} />
    </div>
  );
}

export const Product = ({ product }: { product: ProductType }) => (
  <div className="p-4">
    <figure className="relative aspect-square w-full overflow-hidden rounded-md object-cover">
      <img
        className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2"
        src={product.image}
        alt={product.name}
      />
      <Badge variant="secondary" className="absolute end-2 top-2 bg-white/30 dark:bg-black/30">
        {product.badge}
      </Badge>
    </figure>
    <div className="mt-3 space-y-2">
      <div className="flex items-center justify-between gap-1">
        <p className="font-medium">{product.name}</p>
        <p className="text-muted-foreground">{product.price}</p>
      </div>
      <div className="flex items-center justify-between align-center">
        <Rating rate={product.rating} showScore description="from 200+ reviews" />
        <span>Available : {product.stock}</span>
      </div>
    </div>
    {
      product.stock>0 ?

      <Button variant="secondary" className="mt-4 w-full cursor-pointer">
      Purchase
    </Button>
     :
      <Button variant="secondary" className="mt-4 w-full  cursor-not-allowed">
      Out of Stock
    </Button>

    }
  </div>
);


