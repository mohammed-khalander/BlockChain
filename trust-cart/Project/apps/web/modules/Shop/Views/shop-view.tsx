"use client";
import { ProductType } from "../Components/shop-card"

import { Product } from "../Components/shop-card"


import { ethers } from "ethers";
import { getReadContract } from "@/lib/smart-contract";
import { AppContext } from "@/contexts/AppContext";
import { useContext, useEffect } from "react";
import { toast } from "sonner";



export const ShopView = ()=>{

const products: ProductType[] = [
{
    name: 'Classic White T-Shirt',
    image: 'https://picsum.photos/400?random=1',
    price: '2 ETH',
    badge: 'New Season',
    stock:10,
    rating: 4
  },
  {
    name: 'Black Hoodie',
    image: 'https://picsum.photos/400?random=2',
    price: '3 ETH',
    badge: 'Best Seller',
    stock:10,
    rating: 5
  },
  {
    name: 'Denim Jacket',
    image: 'https://picsum.photos/400?random=3',
    price: '5 ETH',
    badge: 'Trending',
    stock:10,
    rating: 4
  },
  {
    name: 'Running Sneakers',
    image: 'https://picsum.photos/400?random=4',
    price: '6 ETH',
    badge: 'Limited',
    stock:10,
    rating: 4
  },
  {
    name: 'Leather Wallet',
    image: 'https://picsum.photos/400?random=5',
    price: '1 ETH',
    badge: 'Top Rated',
    stock:0,
    rating: 5
  }
]

    const context = useContext(AppContext);
    
    
    
    const getProducts = async ()=>{
        if(!context){
            return;
        }
        const {provider,account} = context;
        if(!provider || !account){
            return;
        };
        try{
            const trust_cart_contract = await getReadContract(provider);
            console.log("Smart Contract is ",trust_cart_contract);
            const name = await trust_cart_contract.storeName();
            const items = await trust_cart_contract.totalItems();
            console.log(`Name of the Contract is ${name} and total Items ${items}`);
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
        return <h1>Loading....</h1> ;
    }
    const {provider,account} = context;
    if(!provider || !account){
        return <h1>Loading.....</h1> ;
    };

    return(
        <div className="p-4 h-full flex flex-col gap-y-10">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl pl-4"> Gaming </h1>
                <div className="flex flex-wrap gap-5 justify-center align-center">

                {
                    products.map((item,ind)=>{
                        return(
                            <div className="border-2 border-secondary" key={ind}>
                                <Product product={item} />
                            </div>
                        )
                    })   
                }            
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl pl-4"> Groceries </h1>
                <div className="flex flex-wrap gap-5 justify-center align-center">

                {
                    products.map((item,ind)=>{
                        return(
                            <div className="border-2 border-white mb-4" key={ind}>
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
                    products.map((item,ind)=>{
                        return(
                            <div className="border-2 border-white mb-4" key={ind}>
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