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
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
const page=()=>{
  const trpc=useTRPC()
  const invoke=useMutation(trpc.invoke.mutationOptions({
    onSuccess:()=>{
      toast.success("Background job started")
    }
  }))
  return(
    <div>
      test
      <Button disabled={invoke.isPending} onClick={()=>invoke.mutate({text:"John"})}>
        invoke background job
      </Button>

    </div>
  )
}
export default page