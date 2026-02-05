"use client";

import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/file-upload";
import { useState, useEffect } from "react";

import { pinata } from "@/lib/pinata-ipfs";

import { toast } from "sonner"
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import Image from "next/image";




export const FileUpload = ()=>{

    const router = useRouter();

    const [files, setFiles] = useState<File[]>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [previewUrlIPFS, setPreviewUrlIPFS] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(()=>{ 
        if(!files)return;
        if (!files.length) return  
        const url = URL.createObjectURL(files[0])
        setPreviewUrl(url)
        return () => URL.revokeObjectURL(url)
    },[files]);



    const uploadFile = async () => {
        if (!files) {
          toast.error("No file selected");
          return;
        }

        try {
          setUploading(true);
          const urlRequest = await fetch("/api/url"); 
          const urlResponse = await urlRequest.json(); 
          const upload = await pinata.upload.public
            .file(files[0])
            .url(urlResponse.url); 
          console.log(upload);

          const fileUrl = await pinata.gateways.public.convert(upload.cid);
          setPreviewUrlIPFS(fileUrl);
          // URL:- https://${gatewayDomain}/ipfs/${cid}`
          // Example:- https://jade-top-kite-609.mypinata.cloud/ipfs/bafybeib5aimdflropyxah5oodm6q6yovfeyuyz7wk7sj77iqemwbtvmixe

          setUploading(false);
        } catch (e) {
          console.log(e);
          setUploading(false);
          toast.error("Trouble uploading file, IPFS Error");
        }
    };


    
    return(
      <div className="min-h-screen flex flex-col">
      <div className="bg-muted p-4 flex justify-center align-center">
        <Image src="/logo.svg" alt="Home" width={50} height={50} className="cursor-pointer" onClick={()=>router.push("/")} />
      </div>
        <div className="flex flex-1 flex-col items-center justify-center p-8 gap-3">
      <Dropzone
        src={files}
        onDrop={acceptedFiles => setFiles(acceptedFiles)}
        accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif"] }}
        maxSize={5 * 1024 * 1024}
        className="w-full max-w-md"
      >
        <DropzoneContent />
        <DropzoneEmptyState />
      </Dropzone>
      <div className="flex gap-2 flex-wrap">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full max-w-md rounded-lg  "
          />
      )}
      {
        previewUrlIPFS && (
          <img
          src={previewUrlIPFS}
          alt="Preview"
          className="w-full max-w-md rounded-lg  "
          />
        )
      }
      </div>
      <Button disabled={uploading || !previewUrl } onClick={uploadFile} >Upload</Button>
    </div>
    </div>
    )
}