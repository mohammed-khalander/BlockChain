"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageUpload } from './components/image-upload'
import { ItemForms } from './components/items-forms'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { getWriteContract } from '@/lib/smart-contract'
import { toast } from 'sonner'

import { AppContext } from "@/contexts/AppContext";
import { useContext, useState } from "react";
import { ethers } from 'ethers';




export const AdminDash = () => {

  const context = useContext(AppContext);

  const [loading,setLoading] = useState(false);


  const getEths = async ()=>{
      if(!context){
          return;
       }
       const {provider,account,signer} = context;
       if(!provider || !account || !signer){
           toast.error("Wallet Is Not Connected Yet....");
           setTimeout(()=>{ 
             toast.warning("Please Connect To the Wallet");
           },1000);
           return;
       };

       try {
         const trust_cart_contract_write = await getWriteContract(signer);
         
         const owner = await trust_cart_contract_write.owner();
         if(owner.toLocaleLowerCase()!=account.toLocaleLowerCase()){
            toast.warning("Only Admin is allowed to Execute...");
            return;
          }  
          
          console.log(trust_cart_contract_write.target);
          const smart_contract_balance = await provider.getBalance(trust_cart_contract_write.target);
          console.log(smart_contract_balance);
          
          if(smart_contract_balance==BigInt(0)){
            toast.warning("No Ethers Available to Withdraw");
            return;
          }  
          
          toast.loading("Ethers Withdrawing to Owner....");

          const transaction = await trust_cart_contract_write.withdraw();

          await transaction.wait();

          toast.dismiss();

          toast.success(`${ethers.formatEther(smart_contract_balance)} Ethers Withdraw Successfull`)

        } catch (err) {
          toast.error("ETH Withdraw Failed..");
          console.log(err);
        }

  }







  
const tabs = [
  {
    name: 'Upload Items',
    value: 'Items',
    content: (
      <>
        <ItemForms/>
      </>
    )
  },
  {
    name: 'Upload Image',
    value: 'image',
    content: (
      <>
        <ImageUpload/>
      </>
    )
  },
  {
    name:'Withdraw',
    value:'withdraw',
    content:(
      <div className='flex flex-col flex-1 justify-center items-center bg-card h-full'>
      <Button className='w-1/2 cursor-pointer' onClick={getEths} > WithDraw ETHs </Button>
      </div>
    )
  }
]

  return (
    <div className='w-full min-h-screen bg-muted flex justify-center p-4'>
      <Tabs defaultValue='Items' className='w-full'>
        {/* <ScrollArea> */}

        <TabsList className='w-full bg-background'>
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className='px-10' >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* <ScrollBar orientation='horizontal'/> */}
        {/* </ScrollArea> */}

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className='flex flex-col px-20 max-sm:px-0'>
           {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

