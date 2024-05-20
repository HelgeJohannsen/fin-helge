import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { draftOrderCalculate, draftOrderComplete } from "~/graphQl/draft";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    await authenticate.admin(request);
    return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
  };

export const action = async ({ request, params }: ActionFunctionArgs) => {
    console.log("notify Request:", request.url);
        const shipping = await draftOrderCalculate()
        const error = shipping["data"]["draftOrderCalculate"]["userErrors"][0];
        const name = shipping["data"]["draftOrderCalculate"]
        const shippingPrice = shipping["data"]["draftOrderCalculate"]["calculatedDraftOrder"]["availableShippingRates"][0]["price"]["amount"]
        console.log("ship", shippingPrice)
        console.log("name", name)
        if(!error){
            const response = json({ "shippingPrice": shippingPrice });
            response.headers.append("Access-Control-Allow-Origin", "*");
            return response;
        }else{
            const response = json({ "error": error });
            response.headers.append("Access-Control-Allow-Origin", "*");
            return response;
        }

}