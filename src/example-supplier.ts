import 'dotenv/config';
import {Supplier} from "sixpack-sdk";
import {invoiceGenerator} from "./example-generator.js";
import {userGenerator} from "./example-generator-2.js";
import {invoiceOrchestrator} from "./example-orchestrator.js";

async function main() {
    const {
        SIXPACK_URL,
        SIXPACK_ACCOUNT,
        SIXPACK_ENVIRONMENT,
        SIXPACK_AUTH_TOKEN,
        SIXPACK_CLIENT_KEY_PATH,
        SIXPACK_CLIENT_CERT_PATH,
    } = process.env;

    const supplier = new Supplier({
        name: "BillingSupplier",
        reportIssueEmail: "developer@sixpack.dev",
    })
    .withGenerators(invoiceGenerator, userGenerator)
    .withOrchestrators(invoiceOrchestrator)
    .withSixpackUrl(SIXPACK_URL)
    .withAccount(SIXPACK_ACCOUNT)
    .withEnvironment(SIXPACK_ENVIRONMENT)
    .withAuthToken(SIXPACK_AUTH_TOKEN)
    .withClientCertificatePath(SIXPACK_CLIENT_CERT_PATH)
    .withClientKeyPath(SIXPACK_CLIENT_KEY_PATH);

    await supplier.bootstrap();
}

main().catch(console.error);
