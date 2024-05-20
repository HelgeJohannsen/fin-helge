import { useState } from "react";
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";

import { createDraftOrder, createDraftOrderLogged } from "~/graphQl/draft";
import { authenticate } from "~/shopify.server";
import { getCustomer } from "~/graphQl/customer";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  console.log("request:", request)
     const requestedURL = new URL(request.url);
     const lastName = requestedURL.searchParams.get("lastName");
     const address1 = requestedURL.searchParams.get("address1");
     const city = requestedURL.searchParams.get("city");
     const zip = requestedURL.searchParams.get("zip");
     const email = requestedURL.searchParams.get("email");
     const variantId = await requestedURL.searchParams.get("variantId");
     const body = await request.formData();

     console.log("body", body)
     if(address1 && variantId){
     // const customer = await getCustomer(customerId)
      console.log("request",variantId)
      const graphQlResponse = await createDraftOrderLogged(String(lastName),String(address1),String(city),String(zip),String(email),String(variantId))
      const error = graphQlResponse["data"]["draftOrderCreate"]["userErrors"][0];
      const name = graphQlResponse["data"]["draftOrderCreate"]["draftOrder"]["name"];
      const id = graphQlResponse["data"]["draftOrderCreate"]["draftOrder"]["id"];

      console.log("draft:",graphQlResponse["data"]["draftOrderCreate"]["draftOrder"])
      console.log("error:",error)
      console.log("name:",name)
      if(error){
       const response = json({ "error": error });
       response.headers.append("Access-Control-Allow-Origin", "*");
      }
 
   const response = json({ "name": name,"id": id});
   response.headers.append("Access-Control-Allow-Origin", "*");
   return response;
     }


/*      console.log("request.headers", request.headers)
     console.log("requestname:", name)
  */

}





