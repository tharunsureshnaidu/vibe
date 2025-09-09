// import { getQueryClient,trpc } from "@/trpc/server";  
// import { dehydrate,HydrationBoundary } from "@tanstack/react-query";
// import { Client } from "./client";
// import { Suspense } from "react";

// const page = async () =>{
//   const queryClient = getQueryClient()
//   void queryClient.prefetchQuery(trpc.hello.queryOptions({text:"Tharun"}))
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Suspense fallback={<p>loading...</p>}>
//         <Client />
//       </Suspense>
      
//     </HydrationBoundary>
//   )
// }
// export default page

"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
const page=()=>{
  const [value,setValue] = useState("")
  const trpc=useTRPC()
  const invoke=useMutation(trpc.invoke.mutationOptions({
    onSuccess:()=>{
      toast.success("Background job started")
    }
  }))
  return(
    <div>
      <Input value={value} onChange={(e) =>setValue(e.target.value)}/>
      <Button disabled={invoke.isPending} onClick={()=>invoke.mutate({value:value})}>
        invoke background job
      </Button>

    </div>
  )
}
export default page