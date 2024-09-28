import { Client, Databases, Account } from "appwrite";

// Access environment variables using Vite's syntax
const APPWRITE_URL = import.meta.env.VITE_APPWRITE_URL;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID_MESSAGES = import.meta.env.VITE_APPWRITE_COLLECTION_ID_MESSAGES;

if (!APPWRITE_URL || !PROJECT_ID || !DATABASE_ID || !COLLECTION_ID_MESSAGES) {
  console.error('Missing environment variables!');
}

const client = new Client();

client
  .setEndpoint(APPWRITE_URL)  // Use the environment variable for the endpoint
  .setProject(PROJECT_ID);    // Use the environment variable for the project ID

export const databases = new Databases(client);
export const account = new Account(client);

export { PROJECT_ID, DATABASE_ID, COLLECTION_ID_MESSAGES };

export default client;
