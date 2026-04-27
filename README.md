# Sixpack Typescript Generator Example

## How to get started with this project:

1. Signup at https://app.sixpack.dev/
2. Go to [settings](https://app.sixpack.dev/account/config) and download private key and certificate to `./config`
3. Provide the following environment variables:
    - `SIXPACK_ORGANIZATION` - your organization name (available in the [settings](https://app.sixpack.dev/account/config))
    - `SIXPACK_AUTH_TOKEN` - token from the [settings](https://app.sixpack.dev/account/config) page
    - `SIXPACK_CLIENT_CERT_PATH=config/generator.pem` - path to the certificate,
    - `SIXPACK_CLIENT_KEY_PATH=config/generator.key` - path to the private key
    - `SIXPACK_ENVIRONMENT` - you can set this to anything. It determines what environment should this be visible under
    - `SIXPACK_URL=gen.sixpack.dev:443` - URL of the Sixpack server
    - `SIXPACK_VERBOSE=true` (optional) - disables default SDK log filtering and shows full debug logs
   
   You can do that either by exporting them in your shell, or by creating a `.env` file in the repository root.

   This sample loads `.env` in the application entrypoint via `dotenv/config`, so `.env` support comes from the sample app, not from the `sixpack-sdk` library itself.
4. run `npm install`
5. run `npm run build`
6. run `npm run start`
