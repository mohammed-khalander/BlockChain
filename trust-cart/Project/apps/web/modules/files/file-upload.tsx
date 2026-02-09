import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageUpload } from './components/image-upload'
import { ItemForms } from './components/items-forms'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"



export const AdminDash = () => {









  
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
      <Button className='w-1/2 cursor-pointer'> WithDraw ETHs </Button>
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

