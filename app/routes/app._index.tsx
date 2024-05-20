import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Divider } from "./components/divider";
import { ModulAktiv } from "./components/modulAktiv";
import { useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import styles from "./styles/appStyles.module.css";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { getConfig } from "~/models/config.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  const Settings = await getConfig("test12");
  console.log("success", Settings)

  if(Settings){
    return Settings
  }
  return {isLive: false}
};

export const action = async ({ request }: ActionFunctionArgs) => {

  return null
  
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  console.log("loaderData", loaderData)
  const nav = useNavigation();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  return (
    <div className={styles.container}>
      <div className={styles.formTitle}>
        <h1>Albis Leasing</h1>
        <p>Konfiguration</p>
      </div>
      <Divider type="main" />
      <ModulAktiv initialValue={loaderData.isLive} />
    </div>
  );
}
