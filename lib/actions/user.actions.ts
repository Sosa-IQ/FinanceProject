import { CountryCode, Products } from "plaid";
import { plaidClient } from "@/lib/plaid";
import { parseStringify } from "../utils";

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: user.name,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }
    // console.log(tokenParams);
    // console.log(plaidClient);

    const response = await plaidClient.linkTokenCreate(tokenParams);
    console.log('Successfully created link token:');
    // console.log(response.data.link_token);
    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.log('Failed to create link token:');
    // console.log(error);
  }
}