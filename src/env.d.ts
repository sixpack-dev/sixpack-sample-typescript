declare namespace NodeJS {
  interface ProcessEnv {
    SIXPACK_URL: string;
    SIXPACK_ORGANIZATION: string;
    SIXPACK_ENVIRONMENT: string;
    SIXPACK_AUTH_TOKEN: string;
    SIXPACK_CLIENT_KEY_PATH: string;
    SIXPACK_CLIENT_CERT_PATH: string;
  }
}
