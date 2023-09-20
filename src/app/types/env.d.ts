declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BACKEND_URL: string;
      NEXT_PUBLIC_MEILISEARCH_URL: string;
      USERS_API_TOKEN: string;
      API_TOKEN: string;
      UPLOAD_TOKEN: string;
      MEILISEARCH_KEY: string;
    }
  }
}
export {};
