import { Client, Databases, Account } from "appwrite";

export const PROJECT_ID='66f40a450039be727c5b'
export const DATABASE_ID="66f41005001e2037b8b1";
export const COLLECTION_ID_MESSAGES="66f4101300091cb2bb97";

const client= new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66f40a450039be727c5b");

export const databases = new Databases(client);
export const account = new Account(client); 

export default client;