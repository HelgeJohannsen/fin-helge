import db from "../db.server";
export async function createConfig(shop: string) {
    console.log("shop", shop)
    const data = {
      username: "1pstest",
      vendorId: "8403",
      clientId: "8403",
      laufzeiten: "12,24,6",
      zeroMonth: "12",
      zinsSaetze: "9.0,9.3,9.5",
      minBestellwert: 11000,
      shop,
      hash: "1234567890",
      apiKey: "e93c8c99-34ae-4f96-9a3b-8d761c99f013",
      passwort: "",
    };
  
    const Settings = await db.config.create({ data });
  
    if (!Settings) {
      return null;
    }
    console.log(Settings)
    return Settings;
  }

  export async function getConfig(shop: string) {
    // TODO: check typing
    const config = await db.config.findFirst({ where: { shop } });
    // console.log("shop", shop);
    if (!config) {
      console.log("no config found")
      return ""
    }
    return config;
  }

  export async function getOrCreateConfig(shop: string) {
    // TODO: check typing
    const config = await db.config.findFirst({ where: { shop } });
    // console.log("shop", shop);
    if (!config) {
      const entry = await createConfig(shop);
      return entry;
    }
    return config;
  }