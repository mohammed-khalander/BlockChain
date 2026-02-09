import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Rating } from '@/components/ui/rating';

import { useContext, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import { toast } from "sonner";
import { getReadContract, getWriteContract } from "@/lib/smart-contract";
import { ethers } from "ethers";



const product = {
  id:1,
  name: "White T-Shirt",
  image: "/images/products/list1.png",
  price: 29,
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

export const Product = ({ product }: { product: ProductType }) =>{

    const context = useContext(AppContext);
    if(!context){
        return <h1>Loading....</h1> ;
    }
    const {provider,account,signer} = context;

    const [loading,setLoading] = useState(false);
    

    const buyProduct = async(item:ProductType)=>{
      if(item.badge!=="OnChain"){
        toast.info("Item Note Listed On BlockCahin");
        setTimeout(()=>{
          toast.info("Please Buy OnChain Items");
        },1000);
        return;
      }
      if(!provider || !account || !signer){
        toast.error("Wallet Is Not Connected Yet....");
        setTimeout(()=>{ 
          toast.warning("Please Connect To the Wallet");
        },1000);
        return;
      }

      try{
          setLoading(true);
          toast.loading(`${item.name} is Placed for Order`);
          const trust_cart_contract_write = getWriteContract(signer);
          
          // const userBalance = await provider.getBalance(account);

          // console.log("User Balance is ",userBalance);
          // console.log("Purchased ",item);
          // console.log("Item Price is ",item.price);

          const priceInWei = ethers.parseEther(item.price.toString());

          // console.log("Item in Wei",priceInWei);
          

          const BuyTransaction = await trust_cart_contract_write.buyItem(item.id,{value:priceInWei});

          
          await BuyTransaction.wait();
          
          toast.dismiss();
          
          toast.success(`${item.name} Ordered Successfully!`);
          
          
        }catch(error:any){
          if(error.code==3){
            toast.error(error.message);
            return;
          }
          toast.error("Transaction Failed... ");
          console.log("Error in shop View Transaction ", error);
          toast.dismiss();
          }finally{
            setLoading(false);
          }

    }


  return(
    <div className="p-4 flex flex-col h-full">
    <figure className="relative aspect-square w-full overflow-hidden rounded-md object-cover flex-1">
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
        <p className="text-muted-foreground">{product.price} ETH </p>
      </div>
      <div className="flex items-center justify-between align-center flex-wrap gap-4">
        <Rating rate={product.rating} showScore description="from 200+ reviews" />
        <span>Available : {product.stock}</span>
      </div>
    </div>
    {
      product.stock>0 ?
      <Button variant="secondary" disabled={loading} className="mt-4 w-full cursor-pointer" onClick={()=>{ buyProduct(product); }} >
      Purchase
    </Button>
     :
      <Button variant="secondary" className="mt-4 w-full  cursor-not-allowed">
      Out of Stock
    </Button>

    }
  </div>
);



} 