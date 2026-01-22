// Bootstrap the supplier
import { Supplier } from "sixpack-sdk";
import { invoiceGenerator } from "./example-generator.js";
import dotenv from "dotenv";

dotenv.config();

const {
    SIXPACK_URL,
    SIXPACK_ACCOUNT,
    SIXPACK_TOKEN,
    SIXPACK_PRIVATE_KEY_PATH,
    SIXPACK_CLIENT_CERT_PATH
} = process.env;

async function main() {
    const supplier = new Supplier({
        name: 'BillingSupplier',
        reportIssueEmail: 'developer@sixpack.dev',
    })
    .withGenerators(invoiceGenerator)
    .withSixpackUrl(SIXPACK_URL)
    .withAccount(SIXPACK_ACCOUNT)
    .withEnvironment('TEST')
    .withAuthToken(SIXPACK_TOKEN)
    .withClientCertificatePath(SIXPACK_CLIENT_CERT_PATH)
    .withClientKeyPath(SIXPACK_PRIVATE_KEY_PATH)

    await supplier.bootstrap()
}

main().catch(console.error)