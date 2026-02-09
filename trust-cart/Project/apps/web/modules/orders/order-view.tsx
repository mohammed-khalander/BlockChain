"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import jsPDF from 'jspdf'


import { useContext,useEffect, useState } from 'react';
import { AppContext } from '@/contexts/AppContext';
import { toast } from 'sonner';
import { getReadContract } from '@/lib/smart-contract';
import { LoadingState } from '@/components/loading-state';
import { EmptyDemo } from '@/components/empty-state';
import { ethers } from 'ethers';



// interface OrderItem {
//   name: string
//   image: string
//   color: string
//   size: string
//   quantity: number
//   price: number
//   orderDate: string
// }

export interface UIOrder {
  orderId: number
  itemId: number
  itemName: string
  image: string
  category: string
  price: string
  date: string
}


// const orders: OrderItem[] = [
//   {
//     name: 'Mist Black Triblend',
//     image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&dpr=2&q=80',
//     color: 'White',
//     size: 'Medium',
//     quantity: 1,
//     price: 120,
//     orderDate: 'March 18, 2025',
//   },
//   {
//     name: 'Trendy Black T-shirt',
//     image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&dpr=2&q=80',
//     color: 'Black',
//     size: 'Medium',
//     quantity: 1,
//     price: 90,
//     orderDate: 'March 13, 2025',
//   },
// ]

export const OrderView = () => {
  // const totalOrders = orders.length
  // const totalAmount = orders.reduce((sum, order) => sum + order.price, 0)

  // const lastOrder = orders.reduce((latest, order) => {
  //   const currentDate = new Date(order.orderDate)
  //   const latestDate = new Date(latest)
  //   return currentDate > latestDate ? order.orderDate : latest
  // }, orders[0].orderDate)




  const imageUrlToBase64 = async (url: string): Promise<string> => {
  const res = await fetch(url)
  const blob = await res.blob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
  }
  
    const downloadInvoice = async () => {
      const doc = new jsPDF()
      
      doc.setFontSize(18)
      doc.text('Invoice', 14, 20)
      
      doc.setFontSize(12)
      doc.text(`Total Orders: ${totalOrders}`, 14, 30)
      // doc.text(`Last Order: ${lastOrder}`, 14, 38)
      
      let y = 50
      
    for (let i = 0; i < myOrders.length; i++) {
      const order = myOrders[i]
  
      const imageBase64 = await imageUrlToBase64(order.image)
      doc.addImage(imageBase64, 'JPEG', 14, y, 30, 30)
  
      doc.text(`Item: ${order.itemName}`, 50, y + 8)
      doc.text(`Date: ${order.date}`, 50, y + 16)
      doc.text(`Qty: 1`, 50, y + 24)
      doc.text(`Price: ${order.price} ETH`, 50, y + 32)
  
      y += 45
    }
    
      doc.text(`Total Amount: ${totalAmount} ETH`, 14, y + 10)
    
      doc.save('invoice.pdf')
    }

    const context = useContext(AppContext);

    const [loading,setLoading] = useState(false);
    const [myOrders,setMyOrders] = useState<UIOrder[] | []>([]);
    const [totalOrders,setTotalOrders] = useState<number>(0);



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

            const trust_cart_contract = getReadContract(provider);
            const orderCountBn = await trust_cart_contract.orderCount(account);
            const orderCount = Number(orderCountBn);
            const orders = [];
            console.log(orderCount);
            setTotalOrders(orderCount);

            if(orderCount==0){
              setMyOrders([]);
              setLoading(false);
              return;
            }
                 
            for(let i=1;i<=orderCount;i++){
                const order = await trust_cart_contract.orders(account,i);
                const item = await trust_cart_contract.items(order.itemId);
                
                console.log(item);
                orders.push({
                  orderId:i,
                  itemId:Number(order.itemId),
                  itemName:item.name,
                  image:item.image,
                  category:item.category,
                  price:ethers.formatEther(item.price),
                  date: new Date(Number(order.timeStamp)*1000).toLocaleDateString(),
                });
            }

            setMyOrders(orders);           

            setLoading(false);

            // const contractAddress = process.env.NEXT_PUBLIC_TRUST_CART_CONTRACT_ADDRESS
            // console.log(contractAddress);
            // const code = await provider.getCode(contractAddress!);
            // console.log("Contract:- ",code);

        }catch(error:any){
            toast.error("Error Loading Orders");
            console.log("Error Loading Orders", error);
        }
    }
    
    useEffect(()=>{
        getProducts();
    },[context]);


    const totalAmount = myOrders.reduce((sum, order) => sum + Number(order.price),0);



  if(loading){
      return (
          <div className="bg-blue-950 h-[calc(100vh-250px)] flex flex-col justify-center align-center">
              <LoadingState />
          </div>
      ) ;
  }




  return (
    <div className='p-6'>
      <Card className='mx-auto my-6 max-w-(--breakpoint-xl)'>
        <CardHeader className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:space-y-0 md:gap-x-6'>
          <div>
            <CardTitle className='text-2xl'>Order History</CardTitle>
            <CardDescription className='text-balance'>View your past orders and their status</CardDescription>
          </div>
          <div className='text-muted-foreground text-end text-sm max-sm:text-start'>
            <p>Total Orders: {totalOrders}</p>
          </div>
        </CardHeader>

        {
          totalOrders!==0 ?
         <>
          <CardContent>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='font-semibold'>Item</TableHead>
                <TableHead className='text-end font-semibold'>Order Date</TableHead>
                <TableHead className='text-end font-semibold'>Quantity</TableHead>
                <TableHead className='text-end font-semibold'>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myOrders.map((order, i) => (
                <TableRow key={i}>
                  <TableCell className='flex items-center gap-3'>
                    <img src={order.image} alt={order.itemName} className='size-16 rounded-md object-cover' />
                    <div>
                      <p className='font-medium'>{order.itemName}</p>
                      <p className='text-muted-foreground text-sm capitalize'>{`Category: ${order.category}`}</p>
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{order.date}</TableCell>
                  <TableCell className='text-end'>1</TableCell>
                  <TableCell className='text-end'>{order.price} ETH</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className='bg-transparent'>
              <TableRow className='font-semibold hover:bg-transparent'>
                <TableCell colSpan={3}></TableCell>
                <TableCell className='text-end'>{`${totalAmount} ETH`}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
        <CardFooter className='flex flex-wrap gap-4'>
          <Button variant='default' className='cursor-pointer' onClick={downloadInvoice}>
            Download Invoice
          </Button>
        </CardFooter>
        
        </>:
        <EmptyDemo/>
      }


      </Card>
    </div>
  )
}

