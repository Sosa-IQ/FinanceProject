import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "@/lib/plaid";
import { encryptId, parseStringify } from "../utils";
import { createBankAccount } from "../appwrite";

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: 'BudgIt',
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

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // console.log("RESPONSE: ", response.data);

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    
    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    // console.log("ACCOUNTS: ", accountsResponse.data);

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    // const request: ProcessorTokenCreateRequest = {
    //   access_token: accessToken,
    //   account_id: accountData.account_id,
    //   processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    // };

    // const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    // const processorToken = processorTokenResponse.data.processor_token;

    // TODO: Implement stripe and uncomment the following code (replacing dwolla with stripe)

     // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    
     //  const fundingSourceUrl = await addFundingSource({
    //   dwollaCustomerId: user.dwollaCustomerId,
    //   processorToken,
    //   bankName: accountData.name,
    // });
    
    // If the funding source URL is not created, throw an error
    
    // if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID

    await createBankAccount({
      user_id: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl: '', // TODO: Replace with fundingSourceUrl
      shareableId: encryptId(accountData.account_id),
    });

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
}