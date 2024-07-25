import { Account, Client, Databases, Storage } from 'react-native-appwrite';

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

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);