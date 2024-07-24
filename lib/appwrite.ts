import { Account, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
import { parseStringify } from './utils';

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: 'com.ziro.budgit',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  bankCollectionId: process.env.EXPO_PUBLIC_APPWRITE_BANK_COLLECTION_ID!
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
;

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

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
        user_id: newUserAccount.$id,
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
      [Query.equal("user_id", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
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
  user_id,
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
        user_id,
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