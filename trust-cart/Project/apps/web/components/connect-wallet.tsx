import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { AppContext } from "@/contexts/AppContext";

import { WalletCardsIcon } from "lucide-react";
import { useContext } from "react";
import { toast } from "sonner";

export function ConnectWallet() {
    const context  = useContext(AppContext);  

    if(!context){
      toast.error("Context Is Not loaded in Navbar!!");
      toast.error("You Can't Continue With The Web ");
      return <h1>Loading...</h1>
    }

    const {connectWallet} = context;



  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WalletCardsIcon />
        </EmptyMedia>
        <EmptyTitle>Wallet Not Connected</EmptyTitle>
        <EmptyDescription>
          Please Connect the Wallet for Seamless Shopping..
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={connectWallet} className="cursor-pointer" >
          Connect
        </Button>
      </EmptyContent>
    </Empty>
  )
}
