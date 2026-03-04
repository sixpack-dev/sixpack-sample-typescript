declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DB_URL: string;
    SIXPACK_URL: string;
    SIXPACK_ACCOUNT: string;
    SIXPACK_ENVIRONMENT: string;
    SIXPACK_AUTH_TOKEN: string;
    SIXPACK_CLIENT_KEY_PATH: string;
    SIXPACK_CLIENT_CERT_PATH: string;
  }
}
