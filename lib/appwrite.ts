import { Account, Client, Databases, ID, Storage } from 'react-native-appwrite';

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || '',
  platform: 'com.ziro.budgit',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT || '',
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || '',
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID || ''
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
  try {
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw Error;

    await signIn(email, password);

    // TODO: Add dwolla details to user account

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        user_id: newUserAccount.$id,
        email: email,
        first_name: firstName,
        last_name: lastName,
        dwollaCustomerUrl: '',
        dwollaCustomerId: '',
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error as string);
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error as string);
  }
}