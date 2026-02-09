"use client";

import React, { createContext, useEffect, useState } from "react";


import { ethers } from "ethers";

import { toast } from "sonner"


import { Dispatch, SetStateAction } from "react";



interface AppContextType {
    provider: ethers.BrowserProvider | null;
    network:ethers.Network | null;
    signer:ethers.Signer | null;
    account:string | null;
    setAccount: Dispatch<SetStateAction<string|null>>;
    connectWallet:()=>Promise<void>;
}

export const AppContext = createContext<AppContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const AppContextProvider = ({ children }: Props) => {

    const [provider,setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [network,setNetwork] = useState<ethers.Network | null>(null);
    const [signer,setSigner] = useState<ethers.Signer | null>(null);
    const [account,setAccount] = useState<string|null>(null);

    // const ConnectBlockChain = async ()=>{
    //     if(!window.ethereum){
    //         toast.error("Please Install Metamask!! ");
    //         return;
    //     }
    //     try{


    //         const browserProvider = new ethers.BrowserProvider(window.ethereum);
    //         const network = await browserProvider.getNetwork();

    //         /**
    //          *  * Wallet Connection
    //          *  * Do the Commented Things in Navbar Connect Button
    //          */

    //         // const signer = await browserProvider.getSigner();
    //         // const account = await signer.getAddress();

    //         console.log(browserProvider);
    //         console.log(network);
    //         // console.log(signer);
    //         // console.log(account);

    //         setProvider(browserProvider);
    //         setNetwork(network);
    //         // setSigner(signer);
    //         // setAccount(account);

    //     }catch(err:any){
    //         // if(err.code==4001){
    //         //     toast.error(err.data);
    //         // }else{
    //         //     toast.error("Metamask Connection Failed!..");
    //         // }
    //     }
    // }

    // useEffect(()=>{
    //     ConnectBlockChain();
    // },[]);
    

    const reconnectIfAuthorized = async ()=>{
      if(!window.ethereum)return;
      try{
        const accounts = await window.ethereum.request({method:"eth_accounts"});
        if(accounts.length==0)return;

        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const network = await browserProvider.getNetwork();
        
        setProvider(browserProvider);
        setSigner(signer);
        setNetwork(network);
        setAccount(accounts[0]);

      }catch(err:any){
        toast.error("Metamask Connection Failed!!..");
      }
    }

    
    const connectWallet = async ()=>{
      try{
        // if(!provider){
        //   toast.error("Provider Not Yet Ready");
        //   return;
        // }
        if(!window.ethereum){
          toast.error("Metamask Not Installed ..");
          return;
        }
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const _signer = await browserProvider.getSigner(); 
        const _account = await _signer.getAddress();
        if(!_account)return;
        console.log("Account ", _account);
        const balance = await browserProvider.getBalance(_account);
        console.log("Account Balance is ",ethers.formatEther(balance));
        setProvider(browserProvider);
        setSigner(_signer);
        setAccount(_account);
      }catch(err:any){
        if(err.code==4001){
            toast.error(err.message);
          }else{
            toast.error("Metamask Connection Failed!..");
          }
          console.log("Connection Failed");
      }
    }

    // const setProviderAndSigner = async ()=>{
    //   const ethereum = window.ethereum;
    //   if(!ethereum){
    //      toast.error("Metamask Is Not Configured...");
    //      return;
    //   }
    //   const provdier = new ethers.BrowserProvider(ethereum);
    //   const signer = await provdier.getSigner();
    //   setProvider(provider);
    //   setSigner(signer)
    // }

    useEffect(()=>{
      reconnectIfAuthorized();
      // setProviderAndSigner();
    },[]);

    useEffect(() => {
      if (!window.ethereum) return;

      const ethereum = window.ethereum as any;

      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          setAccount(null);
          setSigner(null);
        } 
        if(!window.ethereum){
          return toast.error("Metamask Not installed ");
        }
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        setAccount(accounts[0]);
        setSigner(signer);
      };
    
      ethereum.on("accountsChanged", handleAccountsChanged);
    
      return () => {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }, []);







  const value: AppContextType = {
    provider,
    network,
    signer,
    account, setAccount, connectWallet
  };

  return(
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
