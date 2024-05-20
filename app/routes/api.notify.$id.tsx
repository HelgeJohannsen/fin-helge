import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { draftOrderComplete } from "~/graphQl/draft";


export const action = async ({ request, params }: ActionFunctionArgs) => {
    console.log("notify Request:", request.url);
    console.log("id:", params.id)
    if(params.id){
        const draftOrderCompleteResponse = await draftOrderComplete(params.id)
        const error = draftOrderCompleteResponse["data"]["draftOrderComplete"]["userErrors"][0];
        const name = draftOrderCompleteResponse["data"]["draftOrderComplete"]
        if(!error){
            const response = json({ "error": name });
            response.headers.append("Access-Control-Allow-Origin", "*");
            return response;
        }else{
            const response = json({ "error": error });
            response.headers.append("Access-Control-Allow-Origin", "*");
            return response;
        }
    }{
        const response = json({ "error": "id undfined" });
        response.headers.append("Access-Control-Allow-Origin", "*");
    }

}