"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import jsPDF from 'jspdf'


interface OrderItem {
  name: string
  image: string
  color: string
  size: string
  quantity: number
  price: number
  orderDate: string
}

const orders: OrderItem[] = [
  {
    name: 'Mist Black Triblend',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&dpr=2&q=80',
    color: 'White',
    size: 'Medium',
    quantity: 1,
    price: 120,
    orderDate: 'March 18, 2025',
  },
  {
    name: 'Trendy Black T-shirt',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&dpr=2&q=80',
    color: 'Black',
    size: 'Medium',
    quantity: 1,
    price: 90,
    orderDate: 'March 13, 2025',
  },
]

export const OrderView = () => {
  const totalOrders = orders.length
  const totalAmount = orders.reduce((sum, order) => sum + order.price, 0)
  const lastOrder = orders.reduce((latest, order) => {
    const currentDate = new Date(order.orderDate)
    const latestDate = new Date(latest)
    return currentDate > latestDate ? order.orderDate : latest
  }, orders[0].orderDate)




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
    doc.text(`Last Order: ${lastOrder}`, 14, 38)
    
    let y = 50
    
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i]

    const imageBase64 = await imageUrlToBase64(order.image)
    doc.addImage(imageBase64, 'JPEG', 14, y, 30, 30)

    doc.text(`Item: ${order.name}`, 50, y + 8)
    doc.text(`Date: ${order.orderDate}`, 50, y + 16)
    doc.text(`Qty: ${order.quantity}`, 50, y + 24)
    doc.text(`Price: $${order.price.toFixed(2)}`, 50, y + 32)

    y += 45
  }
  
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, y + 10)
  
    doc.save('invoice.pdf')
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
            <p>Last Order: {lastOrder}</p>
          </div>
        </CardHeader>
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
              {orders.map((order, i) => (
                <TableRow key={i}>
                  <TableCell className='flex items-center gap-3'>
                    <img src={order.image} alt={order.name} className='size-16 rounded-md object-cover' />
                    <div>
                      <p className='font-medium'>{order.name}</p>
                      <p className='text-muted-foreground text-sm'>{`Category: ${"Men's Wear"}`}</p>
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{order.orderDate}</TableCell>
                  <TableCell className='text-end'>{order.quantity}</TableCell>
                  <TableCell className='text-end'>${order.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className='bg-transparent'>
              <TableRow className='font-semibold hover:bg-transparent'>
                <TableCell colSpan={3}></TableCell>
                <TableCell className='text-end'>{`$${totalAmount.toFixed(2)}`}</TableCell>
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
      </Card>
    </div>
  )
}

