import { getGraphqlClient } from "~/utils/shopify/getGraphqlClient";
export async function getCustomer(customerId: String) {
    //const firstName1 = "test"
      const gqlClient = await getGraphqlClient("helge-test.myshopify.com");
          const query = `query MyQuery {
            customer(id: "gid://shopify/Customer/7722562519319") {
              email
            }
          }`;
            console.log("query:", query)
            const draft = await gqlClient.request( query );
            return draft
    }