import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageUpload } from './components/image-upload'
import { ItemForms } from './components/items-forms'

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
  }
]

export const AdminDash = () => {
  return (
    <div className='w-full min-h-screen bg-muted flex justify-center p-4'>
      <Tabs defaultValue='Items' className='w-full'>
        <TabsList className='w-full bg-background'>
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className='flex flex-col px-20 max-sm:px-0'>
           {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

