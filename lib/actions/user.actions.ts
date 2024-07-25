import { CountryCode, Products } from "plaid";
import { plaidClient } from "@/lib/plaid";
import { encryptId, parseStringify } from "../utils";
import { account, config, databases } from "../appwrite";
import { ID, Query } from "react-native-appwrite";


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
  let newBankAccount;

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

    newBankAccount = await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl: '', // TODO: Replace with fundingSourceUrl
      shareableId: encryptId(accountData.account_id),
    });

    if (!newBankAccount) throw new Error("Failed to create bank account");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
}

// Register user (Sign Up)
export async function createUser(firstName: string, lastName: string, email: string, password: string) {
  let newUserAccount;

  try {
    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error('Error creating new user account');

    // TODO: Implement Stripe, creating a stripe customer here and add to database

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        userId: newUserAccount.$id,
        email: email,
        first_name: firstName,
        last_name: lastName,
      }
    );

    return parseStringify(newUser);
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error as string);
  }
}

// Get Current User
export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();

    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("userId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log("No active session:", error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
}

// Create Bank Account
export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {

    const bankAccount = await databases.createDocument(
      config.databaseId,
      config.bankCollectionId,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    )

    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
}

export const getBanks = async ({ userId }: getBanksProps) => {
  try {

    const banks = await databases.listDocuments(
      config.databaseId,
      config.bankCollectionId,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(banks.documents);
  } catch (error) {
    console.log(error)
  }
}

export const getBank = async ({ documentId }: getBankProps) => {
  try {

    const bank = await databases.listDocuments(
      config.databaseId,
      config.bankCollectionId,
      [Query.equal('userId', [documentId])]
    )

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error)
  }
}