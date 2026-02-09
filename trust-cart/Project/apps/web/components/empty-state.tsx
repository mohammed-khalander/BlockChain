import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ShoppingBagIcon } from "lucide-react"

import { useRouter } from "next/navigation"

export function EmptyDemo() {
    const router = useRouter();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingBagIcon />
        </EmptyMedia>
        <EmptyTitle>No Orders Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t Purchased any Items yet. Get started by Shopping your first Item.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
           <Button onClick={()=>router.push("/shop")}>  Shop Now </Button>
      </EmptyContent>
    </Empty>
  )
}
