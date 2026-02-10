"use client";
import { ProductType } from "../Components/shop-card"

import { Product } from "../Components/shop-card"


import { ethers } from "ethers";
import { getReadContract } from "@/lib/smart-contract";
import { AppContext } from "@/contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingState } from "@/components/loading-state";
import { ConnectWallet } from "@/components/connect-wallet";



export const ShopView = ()=>{

const products: ProductType[] = [
{
    id:1,
    name: 'msi Codex, RTX 5070',
    image: 'https://m.media-amazon.com/images/I/71Z1Bk+8Z4L._AC_UL480_FMwebp_QL65_.jpg',
    price: 2,
    badge: 'New Season',
    stock:10,
    rating: 4
  },
  {
    id:2,
    name: 'Gaming Monitor',
    image: 'https://m.media-amazon.com/images/I/91t16+g29KL._AC_SY300_SX300_QL70_FMwebp_.jpg',
    price: 3,
    badge: 'Best Seller',
    stock:10,
    rating: 5
  },
  {
    id:3,
    name: 'Gaming Headset',
    image: 'https://m.media-amazon.com/images/I/71AbxX7OY8L._AC_SX466_.jpg',
    price: 5,
    badge: 'Trending',
    stock:10,
    rating: 4
  },
  {
    id:4,
    name: 'Computer Chair',
    image: 'https://m.media-amazon.com/images/I/61gnOJXJLkL._AC_UL960_FMwebp_QL65_.jpg',
    price: 6,
    badge: 'Limited',
    stock:10,
    rating: 4
  },
  {
    id:5,
    name: 'PodCast MicroPhone',
    image: 'https://m.media-amazon.com/images/I/71P1QQK4qYL._AC_SX416_CB1169409_QL70_.jpg',
    price: 1,
    badge: 'Top Rated',
    stock:0,
    rating: 5
  },
  {
    id:6,
    name: 'Kids Game',
    image: 'https://m.media-amazon.com/images/I/71+1xHqd1uL._AC_SY300_SX300_QL70_FMwebp_.jpg',
    price: 1,
    badge: 'Top Rated',
    stock:0,
    rating: 4.5
  },
  {
    id:6,
    name: 'All in One',
    image: 'https://m.media-amazon.com/images/I/81AnrP1RYEL._AC_SY300_SX300_QL70_FMwebp_.jpg',
    price: 1,
    badge: 'Top Rated',
    stock:0,
    rating: 5
  },
]

const products2:ProductType[] = [
    {
  id: 6,
  name: 'Casual Blue Jeans',
  image: 'https://picsum.photos/400?random=6',
  price: 4,
  badge: 'Popular',
  stock: 12,
  rating: 4
},
{
  id: 7,
  name: 'Sports Wrist Watch',
  image: 'https://picsum.photos/400?random=7',
  price: 7,
  badge: 'Premium',
  stock: 6,
  rating: 5
},
{
  id: 8,
  name: 'Cotton Summer Cap',
  image: 'https://picsum.photos/400?random=8',
  price: 1.5,
  badge: 'New Arrival',
  stock: 20,
  rating: 4
},
{
  id: 9,
  name: 'Wireless Earbuds',
  image: 'https://picsum.photos/400?random=9',
  price: 8,
  badge: 'Hot Deal',
  stock: 8,
  rating: 5
},
{
  id: 10,
  name: 'Minimalist Backpack',
  image: 'https://picsum.photos/400?random=10',
  price: 3.5,
  badge: 'Editor’s Choice',
  stock: 15,
  rating: 4
}

]

    const context = useContext(AppContext);

    const [gamings,setGamings] = useState<ProductType[] | []>([]);
    const [groceries,setGroceries] = useState<ProductType[] | []>([]);
    const [electronics,setElectronics] = useState<ProductType[] | []>([]);


    const [loading,setLoading] = useState(false);
    
    
    
    const getProducts = async ()=>{
        if(!context){
            return;
        }
        const {provider,account} = context;
        if(!provider || !account){
            return;
        };
        try{
            setLoading(true);

            const trust_cart_contract = await getReadContract(provider);
            console.log("Smart Contract is ",trust_cart_contract);
            const name = await trust_cart_contract.storeName();
            const items = await trust_cart_contract.totalItems();
            console.log(`Name of the Contract is ${name} and total Items ${items}`);


            const gamingItems: ProductType[] = [];
            const groceryItems: ProductType[] = [];
            const electronicItems: ProductType[] = [];
            for(let i=1;i<=items;i++){
                const item = await trust_cart_contract.items(i);
                
                const product:ProductType = {
                    id:Number(item.id),
                    name:item.name,
                    image:item.image,
                    price:Number(ethers.formatEther(item.price)),
                    badge:"OnChain",
                    stock:Number(item.stock),
                    rating:Number(item.ratings)
                }

                if(item.category=="gaming"){
                    gamingItems.push(product);
                }else if(item.category=="grocery"){
                    groceryItems.push(product);
                }else if(item.category=="electronics"){
                    electronicItems.push(product)
                }
            }
            setGamings(gamingItems);
            setGroceries(groceryItems);
            setElectronics(electronicItems);
            

            setLoading(false);

            // const contractAddress = process.env.NEXT_PUBLIC_TRUST_CART_CONTRACT_ADDRESS
            // console.log(contractAddress);
            // const code = await provider.getCode(contractAddress!);
            // console.log("Contract:- ",code);

        }catch(error:any){
            toast.error("Error Loading shop View");
            console.log("Error Loading shop View ", error);
        }
    }
    
    useEffect(()=>{
        getProducts();
    },[context]);

    if(!context){
        return (
             <div className="bg-blue-950 h-[calc(100vh-250px)] flex flex-col justify-center align-center">
                <LoadingState />
            </div>
        );
    }
    const {provider,account} = context;
    if(!provider || !account){
       return(
        <>
            <div className="h-[calc(100vh-250px)] flex flex-col justify-center align-center">
                <ConnectWallet/>
            </div>
        </>
       )        
    };

    if(loading){
        return (
            <div className="bg-blue-950 h-[calc(100vh-250px)] flex flex-col justify-center align-center">
                <LoadingState />
            </div>
        ) ;
    }

    return(
        <div className="p-4 h-full flex flex-col gap-y-10">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl pl-4"> Gaming </h1>
                <div className="flex flex-wrap gap-5 justify-center align-center">

                {
                    products.map((item,ind)=>{
                        return(
                            <div className="border-2 border-secondary w-[320px]" key={ind}>
                                <Product product={item} />
                            </div>
                        )
                    })   
                }            
                {
                    gamings.map((item,ind)=>{
                        return(
                            <div className="border-2 border-secondary w-[320px]" key={ind}>
                                <Product product={item} />
                            </div>
                        )
                    })   
                }            
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl pl-4">  Groceries </h1>
                <div className="flex flex-wrap gap-5 justify-center align-center">

                {
                    groceries.map((item,ind)=>{
                        return(
                            <div className="border-2 border-secondary mb-4 w-[320px]" key={ind}>
                                <Product product={item} />
                            </div>
                        )
                    })   
                }            
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl pl-4"> Electronics </h1>
                <div className="flex flex-wrap gap-5 justify-center align-center">

                {
                    products2.map((item,ind)=>{
                        return(
                            <div className="border-2 border-secondary mb-4 w-[320px]" key={ind}>
                                <Product product={item} />
                            </div>
                        )
                    })   
                }            
                {
                    electronics.map((item,ind)=>{
                        return(
                            <div className="border-2 border-secondary mb-4 w-[320px]" key={ind}>
                                <Product product={item} />
                            </div>
                        )
                    })   
                }            
                </div>
            </div>

        </div>
    )
}